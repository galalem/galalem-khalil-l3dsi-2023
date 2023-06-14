package com.ngx.rh.responses.show;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Person.Civility;
import com.ngx.rh.entities.Person.Gender;
import com.ngx.rh.entities.Person.IDType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PersonResponse {

    private Long id;
    private String code;
    private String photo;
    private String uid;
    private String username;
    private String firstName;
    private String lastName;
    private Gender gender;
    private Civility civility;
    private String about;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private String placeOfBirth;
    private String nationality;
    private IDType idType;
    private String idNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate idDateOfIssue;
    private String idPlaceOfIssue;
    private String email;
    private String phone;
    private String phone2;
    private Address address;
    private GPSCoordinates gpsCoordinates;


    private boolean active;
    private boolean archived;
    private boolean deleted;

    private Calendar createdAt;
    private Calendar updatedAt;

    public PersonResponse(PersonResponse copy) {
        this.id = copy.id;
        this.code = copy.code;
        this.photo = copy.photo;
        this.uid = copy.uid;
        this.username = copy.username;
        this.firstName = copy.firstName;
        this.lastName = copy.lastName;
        this.gender = copy.gender;
        this.civility = copy.civility;
        this.about = copy.about;
        this.dateOfBirth = copy.dateOfBirth;
        this.placeOfBirth = copy.placeOfBirth;
        this.nationality = copy.nationality;
        this.idType = copy.idType;
        this.idNumber = copy.idNumber;
        this.idDateOfIssue = copy.idDateOfIssue;
        this.idPlaceOfIssue = copy.idPlaceOfIssue;
        this.email = copy.email;
        this.phone = copy.phone;
        this.phone2 = copy.phone2;
        this.address = copy.address;
        this.gpsCoordinates = copy.gpsCoordinates;
        this.active = copy.active;
        this.archived = copy.archived;
        this.deleted = copy.deleted;
        this.createdAt = copy.createdAt;
        this.updatedAt = copy.updatedAt;
    }
}
