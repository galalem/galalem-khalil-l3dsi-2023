package com.ngx.admin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GPSCoordinates implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal latitude;
    private BigDecimal longitude;

    public boolean isBlank() {
        return ((latitude == null || latitude.doubleValue() == 0) &&
            (longitude == null || longitude.doubleValue() == 0));
    }

    public static boolean isBlank(GPSCoordinates coordinates) {
        if (coordinates == null)
            return true;
        return coordinates.isBlank();
    }
}
