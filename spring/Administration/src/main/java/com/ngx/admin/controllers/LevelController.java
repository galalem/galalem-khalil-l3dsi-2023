package com.ngx.admin.controllers;

import com.ngx.admin.entities.Level;
import com.ngx.admin.repositories.LevelRepository;
import com.ngx.admin.requests.LevelRequest;
import com.ngx.admin.responses.show.LevelResponse;
import com.ngx.admin.services.LevelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/levels/{departmentId}")
public class LevelController extends Controller<Level, Long, LevelResponse, LevelResponse, LevelRequest,
    LevelRepository, LevelService> {


    public LevelController(LevelService service) {
        super(service);
    }

    @Deprecated
    @GetMapping(params = {"deprecated"})
    @ResponseStatus(HttpStatus.OK)
    @Override
    public List<LevelResponse> index() {
        return super.index();
    }
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<LevelResponse> index(@PathVariable Long departmentId) {
        return service.index(departmentId);
    }

    @Deprecated
    @PostMapping(params = {"deprecated"})
    @ResponseStatus(HttpStatus.OK)
    @Override
    public void create(@Valid @ModelAttribute LevelRequest levelRequest) {
        super.create(levelRequest);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@Valid @ModelAttribute LevelRequest request, @PathVariable Long departmentId) {
        service.create(request, departmentId);
    }
}
