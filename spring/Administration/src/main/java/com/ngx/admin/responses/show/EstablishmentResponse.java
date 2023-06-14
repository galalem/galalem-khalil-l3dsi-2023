package com.ngx.admin.responses.show;

import com.ngx.admin.entities.Address;
import com.ngx.admin.entities.GPSCoordinates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EstablishmentResponse {

    private Long id;

    private String logo;

    private String name;
    private String acronym;

    private String about;

    private String email;
    private String phone;
    private String phone2;
    private Address address;
    private GPSCoordinates gpsCoordinates;

    private Calendar createdAt;
    private Calendar updatedAt;
}
