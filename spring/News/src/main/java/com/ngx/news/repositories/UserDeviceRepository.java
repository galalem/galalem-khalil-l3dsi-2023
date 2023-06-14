package com.ngx.news.repositories;

import com.ngx.news.entities.UserDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDeviceRepository extends JpaRepository<UserDevice, String> {

    @Query("SELECT e FROM UserDevice e WHERE e.uid IN :ids")
    List<UserDevice> findAllByUid(List<String> ids);
}
