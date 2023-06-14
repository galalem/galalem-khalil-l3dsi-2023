package com.ngx.schooling.controllers;

import com.ngx.schooling.entities.Evaluation;
import com.ngx.schooling.repositories.EvaluationRepository;
import com.ngx.schooling.requests.EvaluationRequest;
import com.ngx.schooling.requests.GradeRequest;
import com.ngx.schooling.responses.browse.ClassResponse;
import com.ngx.schooling.responses.show.EvaluationResponse;
import com.ngx.schooling.services.EvaluationService;
import com.ngx.schooling.services.GradeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController extends Controller<Evaluation, Long,
    EvaluationResponse,
    EvaluationResponse,
    EvaluationRequest, EvaluationRepository, EvaluationService> {

    @Autowired
    private GradeService gradeService;

    @GetMapping(params = {"period"})
    public List<EvaluationResponse> index(@RequestParam("period") Long period) {
        return service.index(period);
    }

    @GetMapping("/current")
    @ResponseStatus(HttpStatus.OK)
    public EvaluationResponse current(){
        return service.current();
    }

    @GetMapping("/{id}/progress")
    @ResponseStatus(HttpStatus.OK)
    public com.ngx.schooling.responses.stats.GradeResponse progress(@PathVariable("id") Long id){
        return service.progress(id);
    }

    @GetMapping("/{id}/progress/students")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressByStudents(@PathVariable("id") Long id){
        return service.progressByStudents(id);
    }
    @GetMapping("/{id}/progress/teachers")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressByTeachers(@PathVariable("id") Long id){
        return service.progressByTeachers(id);
    }
    @GetMapping("/{id}/progress/teachers/{teacherId}")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressByTeachers(@PathVariable("id") Long id, @PathVariable("teacherId") Long teacherId){
        return service.progressBySubjectsForTeacher(id, teacherId);
    }

    @GetMapping("/{evaluation}/subjects/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.schooling.responses.browse.GradeResponse> findBySubjectId(@PathVariable("evaluation") Long evaluation, @PathVariable("id") Long id){
        return gradeService.findByEvaluationAndSubject(evaluation, id);
    }

    @GetMapping("/{evaluation}/students/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.schooling.responses.show.GradeResponse> findByStudentId(@PathVariable("evaluation") Long evaluation, @PathVariable("id") Long id){
        return gradeService.findByEvaluationAndStudent(evaluation, id);
    }

    @PostMapping("/{evaluation}/subjects/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void findByStudentId(@PathVariable("evaluation") Long evaluation, @PathVariable("id") Long id, @RequestBody List<@Valid GradeRequest> request){
        gradeService.saveAll(evaluation, id, request);
    }
}
