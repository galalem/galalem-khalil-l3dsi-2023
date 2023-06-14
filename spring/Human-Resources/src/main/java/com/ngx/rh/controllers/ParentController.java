package com.ngx.rh.controllers;

import com.ngx.rh.entities.Parent;
import com.ngx.rh.repositories.ParentRepository;
import com.ngx.rh.requests.ParentRequest;
import com.ngx.rh.services.ParentService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parents")
public class ParentController extends PersonController<Parent, ParentRepository, ParentRequest,
    com.ngx.rh.responses.browse.ParentResponse, com.ngx.rh.responses.show.ParentResponse, ParentService>{
    public ParentController(ParentService service) {
        super(service);
    }
}
