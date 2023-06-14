package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Evaluation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EvaluationRepository extends Repository<Evaluation, Long> {
    List<Evaluation> findByPeriodIdAndDeleted(Long periodId, boolean deleted);

    @Query("SELECT e FROM Evaluation e WHERE e.deleted = false AND e.start <= CURRENT_DATE AND e.deadline >= CURRENT_DATE ORDER BY e.start DESC")
    Optional<Evaluation> findCurrent();


    @Query("SELECT DISTINCT s.id FROM Subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "JOIN Evaluation e ON e.periodId = c.periodId " +
        "WHERE e.id = :evaluationId AND s.teacherId = :teacherId ")
    List<Long> findSubjectsForTeacher(@Param("evaluationId") Long evaluationId, @Param("teacherId") Long teacherId);
}
