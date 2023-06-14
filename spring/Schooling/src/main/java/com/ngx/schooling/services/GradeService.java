package com.ngx.schooling.services;

import com.ngx.schooling.entities.*;
import com.ngx.schooling.repositories.GradeRepository;
import com.ngx.schooling.repositories.SubGradeRepository;
import com.ngx.schooling.requests.GradeRequest;
import com.ngx.schooling.requests.SubGradeRequest;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GradeService {

    @Autowired
    protected GradeRepository repository;
    @Autowired
    protected SubGradeRepository subGradeRepository;
    @Autowired
    private EntityManager entityManager;

    public void saveAll(Long evaluationId, Long subjectId, List<GradeRequest> requests) {

        Evaluation evaluation = Evaluation.builder().id(evaluationId).build();
        Subject subject = Subject.builder().id(subjectId).build();

        subGradeRepository.deleteByEvaluationIdAndSubjectId(evaluationId, subjectId);
        repository.deleteByEvaluationAndSubject(evaluation, subject);
        entityManager.flush();

        for(GradeRequest request : requests) {
            Grade grade = Grade.builder()
                .id(request.getId())
                .value(request.getValue())
                .comment(request.getComment())
                .evaluation(evaluation)
                .subject(subject)
                .studentId(request.getStudentId())
                .build();
            repository.save(grade);
            for (SubGradeRequest subGradeRequest : request.getSubGrades()) {
                if (grade.getId() == null)
                    System.out.println("GRADE ID IS NULL");
                SubGrade subGrade = SubGrade.builder()
                    .grade(grade)
                    .id(subGradeRequest.getId())
                    .criterion(Criterion.builder().id(subGradeRequest.getCriterion()).build())
                    .value(subGradeRequest.getValue())
                    .build();
                subGradeRepository.save(subGrade);
            }
        }
    }

    public List<com.ngx.schooling.responses.browse.GradeResponse> findByEvaluationAndSubject(Long evaluationId, Long subjectId) {
        return repository.findByEvaluationAndSubject(
            Evaluation.builder().id(evaluationId).build(),
            Subject.builder().id(subjectId).build()
        ).stream().map(com.ngx.schooling.responses.browse.GradeResponse::fromEntity).toList();
    }

    public List<com.ngx.schooling.responses.show.GradeResponse> findByEvaluationAndStudent(Long evaluationId, Long studentId) {
        return repository.findByEvaluationAndStudentId(Evaluation.builder().id(evaluationId).build(), studentId)
            .stream().map(com.ngx.schooling.responses.show.GradeResponse::fromEntity).toList();
    }

    public com.ngx.schooling.responses.stats.GradeResponse findProgressByEvaluationAndStudentId(Long evaluationId, Long studentId) {
        long done = repository.countByEvaluationAndStudentId(Evaluation.builder().id(evaluationId).build(), studentId);
        long total = repository.countTotalByEvaluationIdAndStudentId(evaluationId, studentId);
        return com.ngx.schooling.responses.stats.GradeResponse.builder()
            .done(done)
            .total(total)
            .id(studentId).build();
    }

    public com.ngx.schooling.responses.stats.GradeResponse findProgressByEvaluationAndTeacherId(Long evaluationId, Long teacherId) {
        long done = repository.countByEvaluationAndTeacherId(evaluationId, teacherId);
        long total = repository.countTotalByEvaluationIdAndTeacherId(evaluationId, teacherId);
        return com.ngx.schooling.responses.stats.GradeResponse.builder()
            .done(done)
            .total(total)
            .id(teacherId).build();
    }

    public com.ngx.schooling.responses.stats.GradeResponse findProgressByEvaluationAndSubjectId(Long evaluationId, Long subjectId) {
        long done = repository.countByEvaluationAndSubject(Evaluation.builder().id(evaluationId).build(), Subject.builder().id(subjectId).build());
        long total = repository.countTotalByEvaluationIdAndSubjectId(evaluationId, subjectId);
        return com.ngx.schooling.responses.stats.GradeResponse.builder()
            .done(done)
            .total(total)
            .id(subjectId).build();
    }
}
