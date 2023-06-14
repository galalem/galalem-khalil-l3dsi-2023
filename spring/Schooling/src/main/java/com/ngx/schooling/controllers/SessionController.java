package com.ngx.schooling.controllers;

import com.ngx.schooling.responses.show.SessionResponse;
import com.ngx.schooling.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/{period}/sessions")
public class SessionController {

    @Autowired
    private SessionService service;


    @GetMapping("/classes")
    public List<Long> getDistinctClasses(@PathVariable("period") Long period) {
        return service.getDistinctClasses(period);
    }
    @GetMapping("/classes/{id}")
    public List<SessionResponse> getForClass(@PathVariable("id") Long id) {
        return service.getForClass(id);
    }

    @GetMapping("/students")
    public List<Long> getDistinctStudents(@PathVariable("period") Long period) {
        return service.getDistinctStudents(period);
    }
    @GetMapping("/students/{id}")
    public List<SessionResponse> getForStudent(@PathVariable("id") Long id, @PathVariable("period") Long period) {
        return service.getForStudent(id, period);
    }

    @GetMapping("/teachers")
    public List<Long> getDistinctTeachers(@PathVariable("period") Long period) {
        return service.getDistinctTeachers(period);
    }
    @GetMapping("/teachers/{id}")
    public List<SessionResponse> getForTeacher(@PathVariable("id") Long id, @PathVariable("period") Long period) {
        return service.getForTeacher(id, period);
    }

    @GetMapping("/places")
    public List<String> getDistinctPlaces(@PathVariable("period") Long period) {
        return service.getDistinctPlaces(period);
    }
    @GetMapping("/places/{id}")
    public List<SessionResponse> getForPlace(@PathVariable("id") String id, @PathVariable("period") Long period) {
        return service.getForPlace(id, period);
    }



}
