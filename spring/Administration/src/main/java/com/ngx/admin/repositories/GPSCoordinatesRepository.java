package com.ngx.admin.repositories;

import com.ngx.admin.entities.GPSCoordinates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GPSCoordinatesRepository extends JpaRepository<GPSCoordinates, Long> {
}
