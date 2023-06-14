package com.ngx.news.services;

import com.ngx.news.responses.AuthorResponse;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    private static final String DEFAULT_PROFILE_PICTURE = "assets/img/default-avatar-male.png";
    private static final String DEFAULT_PROFILE_PICTURE_FEMALE = "assets/img/default-avatar-female.png";

    @Autowired
    private Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;

    public List<UserRepresentation> list() {
        return keycloak.realm(realm).users().list(0, -1);
    }
    public List<UserRepresentation> withRole(String role) {
        return keycloak.realm(realm).roles().get(role).getRoleUserMembers(0, -1).stream().toList();
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

    public AuthorResponse getAuthor(String id) {
        UserResource resource = keycloak.realm(realm).users().get(id);
        UserRepresentation user = resource.toRepresentation();

        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String suffix = token.getClaims().get("sub").toString().equals(id) ? " (Vous)" : "";

        return AuthorResponse.builder()
            .uid(id)
            .name(user.getFirstName() + " " + user.getLastName() + suffix)
            .picture(getUserPicture(user))
            .role(resource.roles().realmLevel().listEffective().stream()
                .filter(roleRepresentation -> Arrays.stream(Role.values()).anyMatch(role -> role.name().equals(roleRepresentation.getName())))
                .map(this::roleFromLocale).findFirst().orElse(null))
            .build();
    }


    private String getUserPicture(UserRepresentation user){
        java.util.Map<String, List<String>> attributes = user.getAttributes();
        if (attributes == null)
            return DEFAULT_PROFILE_PICTURE;
        List<String> picture = attributes.get("picture");
        if (picture != null && picture.size() == 1)
            return picture.get(0);
        List<String> gender = attributes.get("gender");
        if (gender != null && gender.size() == 1)
            return gender.get(0).equals("FEMALE") ? DEFAULT_PROFILE_PICTURE_FEMALE : DEFAULT_PROFILE_PICTURE;
        return DEFAULT_PROFILE_PICTURE;
    }

    private String roleFromLocale(RoleRepresentation roleRepresentation) {
        Role role = Role.valueOf(roleRepresentation.getName());
        switch (role) {
            case ADMIN -> {
                return "Administrateur";
            }
            case TEACHER -> {
                return "Enseignant";
            }
            case PARENT -> {
                return "Parent";
            }
            case STUDENT -> {
                return "Élève";
            }
        }
        return "";
    }

    private enum Role {
        ADMIN,
        TEACHER,
        PARENT,
        STUDENT
    }

}
