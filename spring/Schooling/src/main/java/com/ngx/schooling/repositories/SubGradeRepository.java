package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Evaluation;
import com.ngx.schooling.entities.SubGrade;
import com.ngx.schooling.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubGradeRepository extends JpaRepository<SubGrade, Long> {

    @Modifying
    @Query(value = "DELETE FROM `sub_grade` " +
        "WHERE `grade_id` IN (SELECT `id` FROM `grade` WHERE `evaluation_id` = :evaluationId AND `subject_id` = :subjectId)", nativeQuery = true)
    void deleteByEvaluationIdAndSubjectId(@Param("evaluationId") Long evaluationId, @Param("subjectId") Long subjectId);
}
