package com.ngx.schooling.controllers;

import com.ngx.schooling.entities.Criterion;
import com.ngx.schooling.entities.Subject;
import com.ngx.schooling.repositories.CriterionRepository;
import com.ngx.schooling.repositories.SubjectRepository;
import com.ngx.schooling.requests.CriterionRequest;
import com.ngx.schooling.requests.SubjectRequest;
import com.ngx.schooling.responses.browse.SubjectResponse;
import com.ngx.schooling.responses.show.CriterionResponse;
import com.ngx.schooling.services.CriterionService;
import com.ngx.schooling.services.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/criteria")
public class CriterionController extends Controller<Criterion, Long,
    CriterionResponse,
    CriterionResponse,
    CriterionRequest, CriterionRepository, CriterionService> {
}
