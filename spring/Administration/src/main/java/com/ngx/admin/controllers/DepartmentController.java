package com.ngx.admin.controllers;

import com.ngx.admin.entities.Department;
import com.ngx.admin.repositories.DepartmentRepository;
import com.ngx.admin.requests.DepartmentRequest;
import com.ngx.admin.services.DepartmentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController extends Controller<Department, Long,
    com.ngx.admin.responses.browse.DepartmentResponse,
    com.ngx.admin.responses.show.DepartmentResponse,
    DepartmentRequest, DepartmentRepository, DepartmentService> {

    public DepartmentController(DepartmentService service) {
        super(service);
    }
}
