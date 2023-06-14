package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Registration, Long> {

    @Query("SELECT entity FROM #{#entityName} AS entity WHERE entity.classId = :id")
    List<Registration> findAllByClassId(@Param("id") Long id);
    @Query("SELECT COUNT(entity) FROM #{#entityName} AS entity WHERE entity.classId = :id")
    long countByClassId(@Param("id") Long id);

    @Query("SELECT CASE WHEN COUNT(entity) > 0 THEN true ELSE false END FROM #{#entityName} AS entity WHERE entity.classId = :classId AND entity.studentId = :studentId")
    boolean existsByClassIdAndStudentId(@Param("classId") Long classId, @Param("studentId") Long studentId);
    @Query("SELECT entity FROM #{#entityName} AS entity WHERE entity.classId = :classId AND entity.studentId = :studentId")
    Optional<Registration> findByClassIdAndStudentId(@Param("classId") Long classId, @Param("studentId") Long studentId);

    @Modifying
    @Query("DELETE FROM #{#entityName} AS entity WHERE entity.classId = :classId AND entity.studentId in(:studentIds)")
    void deleteAllByClassIdAndStudentIdIn(@Param("classId") Long classId, @Param("studentIds") Iterable<Long> studentIds);
    @Modifying
    @Query("UPDATE #{#entityName} entity SET entity.group = null WHERE entity.classId = :classId AND entity.group = :group AND entity.studentId in(:studentIds)")
    void ungroupAllByClassIdAndStudentIdIn(@Param("classId") Long classId, @Param("group") Integer group, @Param("studentIds") Iterable<Long> studentIds);
}
