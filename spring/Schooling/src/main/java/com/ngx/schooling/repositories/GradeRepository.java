package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Evaluation;
import com.ngx.schooling.entities.Grade;
import com.ngx.schooling.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    void deleteByEvaluationAndSubject(Evaluation evaluation, Subject subject);

    List<Grade> findByEvaluationAndSubject(Evaluation evaluation, Subject subject);

    List<Grade> findByEvaluationAndStudentId(Evaluation evaluation, Long studentId);

    long countByEvaluationAndSubject(Evaluation evaluation, Subject subject);

    long countByEvaluationAndStudentId(Evaluation evaluation, Long studentId);

    @Query("SELECT COUNT(g) FROM Grade g WHERE g.evaluation.id = :evaluationId AND g.subject.teacherId = :teacherId AND g.subject.deleted = false")
    long countByEvaluationAndTeacherId(@Param("evaluationId") Long evaluationId, @Param("teacherId") Long teacherId);


    @Query("SELECT COUNT(stu) FROM Registration stu " +
        "JOIN Class c ON stu.classId = c.id " +
        "JOIN Evaluation e ON e.periodId = c.periodId " +
        "JOIN Subject s ON s.classId = c.id " +
        "WHERE e.id = :evaluationId AND s.id = :subjectId " +
        "AND s.deleted = false AND (s.shared = true OR stu.studentId MEMBER OF s.students) ")
    long countTotalByEvaluationIdAndSubjectId(@Param("evaluationId") Long evaluationId, @Param("subjectId") Long subjectId);

    @Query("SELECT COUNT(s) FROM Subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "JOIN Evaluation e ON e.periodId = c.periodId " +
        "JOIN Registration stu ON stu.classId = c.id " +
        "WHERE e.id = :evaluationId AND stu.studentId = :studentId " +
        "AND s.deleted = false AND (s.shared = true OR :studentId MEMBER OF s.students) ")
    long countTotalByEvaluationIdAndStudentId(@Param("evaluationId") Long evaluationId, @Param("studentId") Long studentId);

    @Query("SELECT COUNT(stu) FROM Registration stu " +
        "JOIN Class c ON stu.classId = c.id " +
        "JOIN Evaluation e ON e.periodId = c.periodId " +
        "JOIN Subject s ON s.classId = c.id " +
        "WHERE e.id = :evaluationId AND s.teacherId = :teacherId " +
        "AND s.deleted = false AND (s.shared = true OR stu.studentId MEMBER OF s.students) ")
    long countTotalByEvaluationIdAndTeacherId(@Param("evaluationId") Long evaluationId, @Param("teacherId") Long teacherId);
}
