package com.ngx.rh.services;

import com.ngx.rh.entities.Person;
import com.ngx.rh.exceptions.BadRequestException;
import com.ngx.rh.exceptions.RestErrorException;
import com.ngx.rh.exceptions.UniqueFieldTakenException;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.models.UserModel;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;

    public List<UserRepresentation> index() {
        return keycloak.realm(realm).users().list();
    }

    public String createFromPerson(Person person) throws BadRequestException, RestErrorException {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEnabled(true);
        userRepresentation.setUsername(person.getUsername());
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(true);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue("NGX"+person.getCode());
        userRepresentation.setCredentials(List.of(credentialRepresentation));
        userRepresentation.setFirstName(person.getFirstName());
        userRepresentation.setLastName(person.getLastName());
        userRepresentation.setEmail(person.getEmail());
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("ngx_id", List.of(person.getId().toString()));
        attributes.put("ngx_code", List.of(person.getCode()));
        attributes.put("gender", List.of(person.getGender().name()));
        if (person.getPhoto() != null)
            attributes.put("picture", List.of(person.getPhoto()));
        userRepresentation.setAttributes(attributes);
        userRepresentation.setRequiredActions(
            List.of(
                UserModel.RequiredAction.VERIFY_EMAIL.name(),
                UserModel.RequiredAction.UPDATE_PASSWORD.name()
            ));
        return create(userRepresentation);
    }
    public String create(UserRepresentation userRepresentation) throws BadRequestException, RestErrorException {
        if (this.findByUsername(userRepresentation.getUsername()).size() > 0)
            throw new UniqueFieldTakenException("username", "Nom d'utilisateur");
        if (this.findByEmail(userRepresentation.getEmail()).size() > 0)
            throw new UniqueFieldTakenException("email", "E-mail");
        Response response = keycloak
            .realm(realm)
            .users()
            .create(userRepresentation);
        if (response.getStatusInfo().getFamily() == Response.Status.Family.SUCCESSFUL)
            return CreatedResponseUtil.getCreatedId(response);
        if (response.getStatus() == 400) // BAD_REQUEST
            throw new BadRequestException(response.readEntity(String.class));
        throw new RestErrorException(response.getStatus(), response.getStatusInfo().getReasonPhrase(), response.readEntity(String.class));
    }
    public void updateFromPerson(Person person) throws BadRequestException, RestErrorException {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(person.getUsername());
        userRepresentation.setFirstName(person.getFirstName());
        userRepresentation.setLastName(person.getLastName());
        userRepresentation.setEmail(person.getEmail());
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("ngx_id", List.of(person.getId().toString()));
        attributes.put("ngx_code", List.of(person.getCode()));
        attributes.put("gender", List.of(person.getGender().name()));
        if (person.getPhoto() != null)
            attributes.put("picture", List.of(person.getPhoto()));
        userRepresentation.setAttributes(attributes);
        update(person.getUid(), userRepresentation);
    }
    public void update(String id, UserRepresentation userRepresentation) throws BadRequestException, RestErrorException {
        UserRepresentation old = this.show(id);
        userRepresentation.setId(id);
        userRepresentation.setEnabled(old.isEnabled());
        userRepresentation.setCredentials(old.getCredentials());
        userRepresentation.setRequiredActions(old.getRequiredActions());
        if (this.findByUsername(userRepresentation.getUsername()).size() > 0 &&
            !userRepresentation.getUsername().equals(old.getUsername()))
            throw new UniqueFieldTakenException("username", "Nom d'utilisateur");
        if (this.findByEmail(userRepresentation.getEmail()).size() > 0 &&
            !userRepresentation.getEmail().equals(old.getEmail()))
            throw new UniqueFieldTakenException("email", "E-mail");
        keycloak
            .realm(realm)
            .users()
            .get(id)
            .update(userRepresentation);
    }

    public List<UserRepresentation> findByUsername(String username) {
        return keycloak.realm(realm).users().search(username, true);
    }
    public List<UserRepresentation> findByEmail(String email) {
        return keycloak.realm(realm).users().searchByEmail(email, true);
    }
    public UserRepresentation show(String id) {
        return keycloak.realm(realm).users().get(id).toRepresentation();
    }
    public void setEnabled(String id, boolean enabled) {
        UserRepresentation userRepresentation = this.show(id);
        userRepresentation.setEnabled(enabled);
        this.update(id, userRepresentation);
    }

    public void assignRole(String id, String role) {
        RoleRepresentation representation = keycloak
            .realm(realm)
            .roles()
            .get(role)
            .toRepresentation();
        this.assignRole(id, representation);
    }

    public void assignRole(String id, RoleRepresentation roleRepresentation) {
        keycloak
            .realm(realm)
            .users()
            .get(id)
            .roles()
            .realmLevel()
            .add(List.of(roleRepresentation));
    }

    public void delete(String id){
        keycloak
            .realm(realm)
            .users()
            .delete(id).close();
    }

    public void deleteWhereNotIn(List<String> keep){
        UsersResource usersResource =  keycloak.realm(realm).users();
        List<UserRepresentation> users = usersResource.list(0, -1);

        for(UserRepresentation user : users){
            if (usersResource.get(user.getId()).roles().realmLevel().listEffective().stream().anyMatch(role -> role.getName().equals("ADMIN")))
                continue;
            if (keep.stream().noneMatch(uid -> uid.equals(user.getId())))
                usersResource.delete(user.getId()).close();
        }
    }
}
