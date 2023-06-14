package com.ngx.admin.controllers;

import com.ngx.admin.exceptions.RestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public abstract class Controller<Entity, Id, BrowseResponse, ShowResponse, Request,
    Repository extends com.ngx.admin.repositories.Repository<Entity, Id>,
    Service extends com.ngx.admin.services.Service<Entity, Id, BrowseResponse, ShowResponse, Request, Repository>> {

    protected final Service service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BrowseResponse> index() {
        return service.index();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@Valid @ModelAttribute Request request) {
        service.create(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ShowResponse show(@PathVariable Id id) {
        return service.show(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @ModelAttribute Request request, @PathVariable Id id) {
        service.update(request, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Id id) {
        service.delete(id);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
        MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestException.class)
    public ResponseEntity<String> handleRestExceptions(
        RestException ex) {
        return ResponseEntity
            .status(HttpStatusCode.valueOf(ex.getStatus()))
            .body(ex.getMessage());
    }
}
