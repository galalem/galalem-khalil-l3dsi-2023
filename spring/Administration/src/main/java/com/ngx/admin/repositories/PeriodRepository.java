package com.ngx.admin.repositories;

import com.ngx.admin.entities.Period;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Calendar;

public interface PeriodRepository extends Repository<Period, Long> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Period p WHERE p.year = :year AND p.department.id = :departmentId AND p.id <> :oldId AND p.startsAt <= :ends AND p.endsAt >= :starts AND p.deleted = false")
    boolean overlaps(@Param("year") String year, @Param("departmentId") Long departmentId, @Param("starts") Calendar startsAt, @Param("ends") Calendar endsAt, @Param("oldId") Long id);
}
