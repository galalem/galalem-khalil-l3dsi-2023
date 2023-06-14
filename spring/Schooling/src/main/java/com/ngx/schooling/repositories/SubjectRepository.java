package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Subject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubjectRepository extends Repository<Subject, Long> {
    @Query("SELECT entity FROM Subject AS entity WHERE entity.classId = :classId AND entity.deleted = false")
    List<Subject> findAllByClassId(@Param("classId") Long classId);
}
