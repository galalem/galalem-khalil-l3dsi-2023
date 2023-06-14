package com.ngx.admin.controllers;

import com.ngx.admin.entities.Period;
import com.ngx.admin.repositories.PeriodRepository;
import com.ngx.admin.requests.PeriodRequest;
import com.ngx.admin.responses.show.PeriodResponse;
import com.ngx.admin.services.PeriodService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/periods")
public class PeriodController extends Controller<Period, Long, PeriodResponse, PeriodResponse, PeriodRequest,
    PeriodRepository, PeriodService> {

    public PeriodController(PeriodService service) {
        super(service);
    }

    @Override
    @PostMapping(params = {"single"})
    @ResponseStatus(HttpStatus.OK)
    public void create(@Valid @ModelAttribute PeriodRequest periodRequest) {
        super.create(periodRequest);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody List<@Valid PeriodRequest> requests) {
        service.create(requests);
    }
}
