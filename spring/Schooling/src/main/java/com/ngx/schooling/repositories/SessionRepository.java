package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Calendar;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    void deleteBySubjectId(Long subjectId);

    @Query("SELECT e FROM Session e " +
        "JOIN e.subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "JOIN Registration stu ON stu.classId = c.id " +
        "WHERE c.periodId = :periodId AND stu.studentId = :studentId AND s.deleted = false " +
        "AND (s.shared = true) " + // TODO add query "OR EXISTS subject_student ss where ss.student_id = stu.id AND ss.subject-id = s.id"
        "AND (e.group = null OR e.group = stu.group) ")
    List<Session> findAllByStudent(@Param("periodId") Long periodId, @Param("studentId") Long studentId);
    @Query("SELECT e FROM Session e " +
        "JOIN e.subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "WHERE c.periodId = :periodId AND s.teacherId = :teacherId AND s.deleted = false ")
    List<Session> findAllByTeacher(@Param("periodId") Long periodId, @Param("teacherId") Long teacherId);
    @Query("SELECT e FROM Session e " +
        "JOIN e.subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "WHERE c.periodId = :periodId AND lower(e.place) = lower(:place) AND s.deleted = false ")
    List<Session> findAllByPlace(@Param("periodId") Long periodId, @Param("place") String place);
    @Query("SELECT e FROM Session e WHERE e.subject.classId = :classId AND e.subject.deleted = false ")
    List<Session> findAllByClass(@Param("classId") Long classId);



    @Query("SELECT DISTINCT s.studentId FROM Registration s " +
        "JOIN Class c ON s.classId = c.id " +
        "WHERE c.periodId = :periodId")
    List<Long> findAllDistinctStudents(@Param("periodId") Long periodId);
    @Query("SELECT DISTINCT s.teacherId FROM Subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "WHERE c.periodId = :periodId")
    List<Long> findAllDistinctTeachers(@Param("periodId") Long periodId);
    @Query("SELECT DISTINCT lower(e.place) FROM Session e " +
        "JOIN e.subject s " +
        "JOIN Class c ON s.classId = c.id " +
        "WHERE c.periodId = :periodId")
    List<String> findAllDistinctPlaces(@Param("periodId") Long periodId);
    @Query("SELECT c.id FROM Class c " +
        "WHERE c.periodId = :periodId")
    List<Long> findAllDistinctClasses(@Param("periodId") Long periodId);


    @Query("SELECT e FROM Session e " +
        "INNER JOIN Class c ON c.id = e.subject.classId " +
        "WHERE e.start <= :endsAt AND e.end >= :startsAt " +
        "AND c.periodId = :periodId ")
    List<Session> overlaps(@Param("startsAt") Integer startsAt, @Param("endsAt") Integer endsAt, @Param("periodId") Long periodId);

}
