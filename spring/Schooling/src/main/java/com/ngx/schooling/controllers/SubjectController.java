package com.ngx.schooling.controllers;

import com.ngx.schooling.entities.Subject;
import com.ngx.schooling.repositories.SubjectRepository;
import com.ngx.schooling.requests.SubjectRequest;
import com.ngx.schooling.responses.browse.SubjectResponse;
import com.ngx.schooling.services.CriterionService;
import com.ngx.schooling.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController extends Controller<Subject, Long,
    com.ngx.schooling.responses.browse.SubjectResponse,
    com.ngx.schooling.responses.show.SubjectResponse,
    SubjectRequest, SubjectRepository, SubjectService> {

    @GetMapping(params = {"class"})
    public List<SubjectResponse> index(@RequestParam("class") Long classId) {
        return service.index(classId);
    }

    @PatchMapping("/{id}/grading")
    @ResponseStatus(HttpStatus.OK)
    public void associateGrading(@PathVariable(name = "id") Long id, @RequestParam("id") Long grading) {
        service.setGrading(id, grading);
    }
}
