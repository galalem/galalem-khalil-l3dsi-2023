package com.ngx.rh.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Calendar;

@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Teacher extends Person {
    @Temporal(TemporalType.DATE)
    private LocalDate dateOfRecruitment;
    @Enumerated(EnumType.STRING)
    private Contract typeOfContract;
    @Enumerated(EnumType.STRING)
    private Rank rank;
    private String title;

    public Teacher(Long id, String code, String username, String uid, String firstName, String lastName, Gender gender, Civility civility, String about, LocalDate dateOfBirth, String placeOfBirth, String nationality, IDType idType, String idNumber, LocalDate idDateOfIssue, String idPlaceOfIssue, String email, String phone, String phone2, Address address, GPSCoordinates gpsCoordinates, String photo, boolean active, boolean archived, boolean deleted, Calendar createdAt, Calendar updatedAt, LocalDate dateOfRecruitment, Contract typeOfContract, Rank rank, String title) {
        super(id, code, username, uid, firstName, lastName, gender, civility, about, dateOfBirth, placeOfBirth, nationality, idType, idNumber, idDateOfIssue, idPlaceOfIssue, email, phone, phone2, address, gpsCoordinates, photo, active, archived, deleted, createdAt, updatedAt);
        this.dateOfRecruitment = dateOfRecruitment;
        this.typeOfContract = typeOfContract;
        this.rank = rank;
        this.title = title;
    }

    public Teacher(Person person) {
        super(person);
    }
    public Teacher(Teacher copy) {
        super(copy);
        this.dateOfRecruitment = copy.dateOfRecruitment;
        this.typeOfContract = copy.typeOfContract;
        this.rank = copy.rank;
        this.title = copy.title;
    }

    public enum Contract {
        PERMANENT,
        CONTRACTOR
    }

    public enum Rank {
        RANK_1,
        RANK_2,
        RANK_3
    }
}
