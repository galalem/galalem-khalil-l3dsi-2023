package com.ngx.admin.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Calendar;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Establishment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logo;


    private String name;
    private String acronym;

    private String about;

    private String email;
    private String phone;
    private String phone2;
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
    @ManyToOne
    @JoinColumn(name = "coordinates_id", referencedColumnName = "id")
    private GPSCoordinates gpsCoordinates;

    @CreationTimestamp
    private Calendar createdAt;
    @UpdateTimestamp
    private Calendar updatedAt;
}
