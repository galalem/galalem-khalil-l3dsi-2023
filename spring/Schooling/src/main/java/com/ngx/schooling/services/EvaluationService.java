package com.ngx.schooling.services;

import com.ngx.schooling.entities.Evaluation;
import com.ngx.schooling.repositories.EvaluationRepository;
import com.ngx.schooling.requests.EvaluationRequest;
import com.ngx.schooling.responses.show.EvaluationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class EvaluationService extends Service<
    Evaluation,
    Long,
    EvaluationResponse,
    EvaluationResponse,
    EvaluationRequest,
    EvaluationRepository> {

    @Autowired
    private GradeService gradeService;

    @Autowired
    private SessionService sessionService;

    public List<EvaluationResponse> index(Long periodId) {
        return repository.findByPeriodIdAndDeleted(periodId, false)
            .stream().map(EvaluationResponse::fromEntity).toList();
    }

    public EvaluationResponse current() {
        return repository.findCurrent().map(EvaluationResponse::fromEntity).orElse(null);
    }

    public com.ngx.schooling.responses.stats.GradeResponse progress(Long id){
        return this.progressByStudents(id).stream()
            .reduce((a, b) -> new com.ngx.schooling.responses.stats.GradeResponse(null,
                a.getDone() + b.getDone(),
                a.getTotal() + b.getTotal()
            )).orElse(null);
    }
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressByStudents(Long id){
        validateId(id);
        Evaluation evaluation = repository.findById(id).orElse(new Evaluation());
        List<Long> students = sessionService.getDistinctStudents(evaluation.getPeriodId());
        List<com.ngx.schooling.responses.stats.GradeResponse> responses = new ArrayList<>(students.size());
        for(Long sid: students)
            responses.add(gradeService.findProgressByEvaluationAndStudentId(id, sid));
        return responses;
    }
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressByTeachers(Long id){
        validateId(id);
        Evaluation evaluation = repository.findById(id).orElse(new Evaluation());
        List<Long> teachers = sessionService.getDistinctTeachers(evaluation.getPeriodId());
        List<com.ngx.schooling.responses.stats.GradeResponse> responses = new ArrayList<>(teachers.size());
        for(Long tid: teachers)
            responses.add(gradeService.findProgressByEvaluationAndTeacherId(id, tid));
        return responses;
    }
    public List<com.ngx.schooling.responses.stats.GradeResponse> progressBySubjectsForTeacher(Long id, Long teacherId){
        validateId(id);
        List<Long> subjects = repository.findSubjectsForTeacher(id, teacherId);
        List<com.ngx.schooling.responses.stats.GradeResponse> responses = new ArrayList<>(subjects.size());
        for(Long sid: subjects)
            responses.add(gradeService.findProgressByEvaluationAndSubjectId(id, sid));
        return responses;
    }

    @Override
    protected Evaluation fromRequest(EvaluationRequest request) {
        return fromRequest(new Evaluation(), request);
    }
    @Override
    protected Evaluation fromRequest(Evaluation e, EvaluationRequest request) {
        e.setLabel(request.getLabel());
        e.setPeriodId(request.getPeriod());
        e.setStart(request.getStart());
        e.setEnd(request.getEnd());
        e.setDeadline(request.getDeadline());
        return e;
    }

    @Override
    protected EvaluationResponse toBrowseResponse(Evaluation e) {
        return EvaluationResponse.fromEntity(e);
    }

    @Override
    protected EvaluationResponse toShowResponse(Evaluation e) {
        return EvaluationResponse.fromEntity(e);
    }

}
