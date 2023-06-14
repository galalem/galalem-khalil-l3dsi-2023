package com.ngx.rh.controllers;

import com.ngx.rh.services.StudentService;
import com.ngx.rh.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/users")
public class UserController{

    @Autowired
    private TeacherService teacherService;
    @Autowired
    private StudentService studentService;


    @GetMapping("/birthdays")
    @ResponseStatus(HttpStatus.OK)
    public List<String> birthdays() {
        return Stream.concat(teacherService.birthdays().stream(), studentService.birthdays().stream()).toList();
    }
}
