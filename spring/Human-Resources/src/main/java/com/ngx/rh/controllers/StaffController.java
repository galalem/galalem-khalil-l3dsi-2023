package com.ngx.rh.controllers;

import com.ngx.rh.entities.Staff;
import com.ngx.rh.repositories.StaffRepository;
import com.ngx.rh.requests.StaffRequest;
import com.ngx.rh.services.StaffService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/staff")
public class StaffController extends PersonController<Staff, StaffRepository, StaffRequest,
    com.ngx.rh.responses.browse.StaffResponse, com.ngx.rh.responses.show.StaffResponse, StaffService>{
    public StaffController(StaffService service) {
        super(service);
    }
}
