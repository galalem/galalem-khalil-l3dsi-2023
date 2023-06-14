package com.ngx.schooling.controllers;

import com.ngx.schooling.entities.Class;
import com.ngx.schooling.repositories.ClassRepository;
import com.ngx.schooling.requests.ClassRequest;
import com.ngx.schooling.responses.browse.ClassResponse;
import com.ngx.schooling.services.ClassService;
import com.ngx.schooling.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class ClassController extends Controller<Class, Long,
    com.ngx.schooling.responses.browse.ClassResponse,
    com.ngx.schooling.responses.show.ClassResponse,
    ClassRequest, ClassRepository, ClassService> {

    @Autowired
    private StudentService studentService;

    @GetMapping(params = {"period"})
    public List<ClassResponse> index(@RequestParam("period") Long period) {
        return service.index(period);
    }

    @PostMapping("/{id}/students")
    @ResponseStatus(HttpStatus.OK)
    public void associateStudents(@PathVariable(name = "id") Long id, @RequestParam("ids") List<Long> ids) {
        studentService.associate(id, ids);
    }
    @DeleteMapping("/{id}/students")
    @ResponseStatus(HttpStatus.OK)
    public void dissociateStudents(@PathVariable(name = "id") Long id, @RequestParam("ids") List<Long> ids) {
        studentService.dissociate(id, ids);
    }

    @PostMapping("/{id}/groups/{group}/students")
    @ResponseStatus(HttpStatus.OK)
    public void appendGroup(@PathVariable(name = "id") Long id, @PathVariable(name = "group") Integer group, @RequestParam("ids") List<Long> ids) {
        studentService.associateGroup(id, group, ids);
    }
    @DeleteMapping("/{id}/groups/{group}/students")
    @ResponseStatus(HttpStatus.OK)
    public void dissociateStudents(@PathVariable(name = "id") Long id, @PathVariable(name = "group") Integer group, @RequestParam("ids") List<Long> ids) {
        studentService.dissociateGroup(id, group, ids);
    }

}
