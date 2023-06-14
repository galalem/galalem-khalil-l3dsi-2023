package com.ngx.admin.controllers;

import com.ngx.admin.requests.EstablishmentRequest;
import com.ngx.admin.services.EstablishmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/establishment")
@RequiredArgsConstructor
public class EstablishmentController {

    private final EstablishmentService establishmentService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public com.ngx.admin.responses.show.EstablishmentResponse show(@RequestHeader("authorization") String token) {
        return establishmentService.show(1L, token);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestHeader("authorization") String token, @ModelAttribute EstablishmentRequest establishmentRequest) {
        establishmentService.update(establishmentRequest, 1L, token);
    }
}
