package com.ngx.admin.requests;

import com.ngx.admin.entities.Address;
import com.ngx.admin.entities.GPSCoordinates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EstablishmentRequest {

    private MultipartFile logo;

    private String name;
    private String acronym;
    private String about;
    private String email;
    private String phone;
    private String phone2;
    private Address address;
    private GPSCoordinates gpsCoordinates;
}
