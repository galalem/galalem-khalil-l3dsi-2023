package com.ngx.rh.repositories;

import com.ngx.rh.entities.GPSCoordinates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GPSCoordinatesRepository extends JpaRepository<GPSCoordinates, Long> {
}
