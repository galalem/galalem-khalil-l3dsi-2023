package com.ngx.admin.services;

import com.ngx.admin.entities.Department;
import com.ngx.admin.repositories.DepartmentRepository;
import com.ngx.admin.requests.DepartmentRequest;
import org.springframework.transaction.annotation.Transactional;

@org.springframework.stereotype.Service
@Transactional
public class DepartmentService extends Service<
    Department,
    Long,
    com.ngx.admin.responses.browse.DepartmentResponse,
    com.ngx.admin.responses.show.DepartmentResponse,
    DepartmentRequest,
    DepartmentRepository> {

    @Override
    protected Department fromRequest(DepartmentRequest request) {
        return fromRequest(new Department(), request);
    }
    @Override
    protected Department fromRequest(Department department, DepartmentRequest request) {
        department.setName(request.getName());
        department.setAcronym(request.getAcronym());
        department.setAbout(request.getAbout());
        department.setEmail(request.getEmail());
        department.setPhone(request.getPhone());
        return department;
    }

    @Override
    protected com.ngx.admin.responses.browse.DepartmentResponse toBrowseResponse(Department department) {
        return com.ngx.admin.responses.browse.DepartmentResponse.builder()
            .id(department.getId())
            .name(department.getName())
            .acronym(department.getAcronym())
            .createdAt(department.getCreatedAt())
            .updatedAt(department.getUpdatedAt())
            .build();
    }

    @Override
    protected com.ngx.admin.responses.show.DepartmentResponse toShowResponse(Department department) {
        return com.ngx.admin.responses.show.DepartmentResponse.builder()
            .id(department.getId())
            .name(department.getName())
            .acronym(department.getAcronym())
            .about(department.getAbout())
            .email(department.getEmail())
            .phone(department.getPhone())
            .createdAt(department.getCreatedAt())
            .updatedAt(department.getUpdatedAt())
            .build();
    }
}
