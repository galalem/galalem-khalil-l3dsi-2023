package com.ngx.schooling.repositories;

import com.ngx.schooling.entities.Class;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassRepository extends Repository<Class, Long> {
    @Query("SELECT entity FROM Class AS entity WHERE entity.periodId = :periodId AND entity.deleted = false")
    List<Class> findAllByPeriodId(@Param("periodId") Long periodId);
}
