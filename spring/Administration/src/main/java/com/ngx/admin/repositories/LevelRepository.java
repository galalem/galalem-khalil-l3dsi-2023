package com.ngx.admin.repositories;

import com.ngx.admin.entities.Level;

import java.util.List;

public interface LevelRepository extends Repository<Level, Long> {

    List<Level> findAllByDepartmentIdAndDeleted(Long departmentId, boolean deleted);
}
