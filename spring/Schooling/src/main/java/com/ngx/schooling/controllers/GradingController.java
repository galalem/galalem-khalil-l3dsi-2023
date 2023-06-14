package com.ngx.schooling.controllers;

import com.ngx.schooling.entities.Grading;
import com.ngx.schooling.repositories.GradingRepository;
import com.ngx.schooling.requests.GradingRequest;
import com.ngx.schooling.responses.show.GradingResponse;
import com.ngx.schooling.services.GradingService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gradings")
public class GradingController extends Controller<Grading, Long,
    GradingResponse,
    GradingResponse,
    GradingRequest, GradingRepository, GradingService> {

}
