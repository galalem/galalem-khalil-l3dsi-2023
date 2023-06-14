package com.ngx.rh.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Calendar;

@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Staff extends Person {
    @Temporal(TemporalType.DATE)
    private LocalDate dateOfRecruitment;
    @Enumerated(EnumType.STRING)
    private Contract typeOfContract;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String function;
    private String mailer;

    public Staff(Long id, String code, String username, String uid, String firstName, String lastName, Gender gender, Civility civility, String about, LocalDate dateOfBirth, String placeOfBirth, String nationality, IDType idType, String idNumber, LocalDate idDateOfIssue, String idPlaceOfIssue, String email, String phone, String phone2, Address address, GPSCoordinates gpsCoordinates, String photo, boolean active, boolean archived, boolean deleted, Calendar createdAt, Calendar updatedAt, LocalDate dateOfRecruitment, Contract typeOfContract, Role role, String function, String mailer) {
        super(id, code, username, uid, firstName, lastName, gender, civility, about, dateOfBirth, placeOfBirth, nationality, idType, idNumber, idDateOfIssue, idPlaceOfIssue, email, phone, phone2, address, gpsCoordinates, photo, active, archived, deleted, createdAt, updatedAt);
        this.dateOfRecruitment = dateOfRecruitment;
        this.typeOfContract = typeOfContract;
        this.role = role;
        this.function = function;
        this.mailer = mailer;
    }

    public Staff(Person person) {
        super(person);
    }
    public Staff(Staff copy) {
        super(copy);
        this.dateOfRecruitment = copy.dateOfRecruitment;
        this.typeOfContract = copy.typeOfContract;
        this.role = copy.role;
        this.function = copy.function;
        this.mailer = copy.mailer;
    }

    public enum Contract {
        PERMANENT,
        CONTRACTOR
    }

    public enum Role {
        ROLE_1,
        ROLE_2,
        ROLE_3
    }
}
