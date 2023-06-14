package com.ngx.rh.services;

import com.ngx.rh.entities.Parent;
import com.ngx.rh.repositories.ParentRepository;
import com.ngx.rh.requests.ParentRequest;
import com.ngx.rh.responses.browse.StudentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Service("ParentService")
@Transactional
public class ParentService extends PersonService<Parent, ParentRepository, ParentRequest,
    com.ngx.rh.responses.browse.ParentResponse, com.ngx.rh.responses.show.ParentResponse> {

    @Override
    protected String getRole(Parent person) {
        return "PARENT";
    }
    @Override
    protected void createRelations(Parent person) {
    }
    @Override
    protected void updateRelations(Parent person, Parent original) {
    }

    @Override
    protected Parent fromRequest(ParentRequest parentRequest) {
        Parent parent = new Parent(super.getParentFromRequest(parentRequest));
        parent.setProfession(parentRequest.getProfession());
        parent.setOrganisation(parentRequest.getOrganisation());
        parent.setMaritalStatus(parentRequest.getMaritalStatus());
        return parent;
    }
    @Override
    protected com.ngx.rh.responses.browse.ParentResponse toBrowseResponse(Parent parent) {
        com.ngx.rh.responses.browse.ParentResponse response =
            new com.ngx.rh.responses.browse.ParentResponse(super.getParentBrowseResponse(parent));
        response.setProfession(parent.getProfession());
        response.setChildren(getChildren(parent).size());
        return response;
    }
    @Override
    protected com.ngx.rh.responses.show.ParentResponse toShowResponse(Parent parent) {
        com.ngx.rh.responses.show.ParentResponse response =
            new com.ngx.rh.responses.show.ParentResponse(super.getParentShowResponse(parent));
        response.setProfession(parent.getProfession());
        response.setOrganisation(parent.getOrganisation());
        response.setMaritalStatus(parent.getMaritalStatus());
        response.setChildren(getChildren(parent));
        return response;
    }

    private List<StudentResponse> getChildren(Parent parent) {
        StudentService studentService = new StudentService();
        return Stream.concat(
            Stream.concat(
                parent.getChildrenAsFather().stream().map(studentService::toBrowseResponse),
                parent.getChildrenAsMother().stream().map(studentService::toBrowseResponse)),
            parent.getChildrenAsTutor().stream().map(studentService::toBrowseResponse)).toList();
    }
}
