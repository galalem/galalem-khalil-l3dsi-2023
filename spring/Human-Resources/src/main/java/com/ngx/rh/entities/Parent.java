package com.ngx.rh.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Collection;

@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Parent extends Person {


    private String profession;
    private String organisation;
    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;

    @OneToMany(mappedBy = "father", fetch= FetchType.LAZY)
    private Collection<Student> childrenAsFather;
    @OneToMany(mappedBy = "mother", fetch=FetchType.LAZY)
    private Collection<Student> childrenAsMother;
    @OneToMany(mappedBy = "tutor", fetch=FetchType.LAZY)
    private Collection<Student> childrenAsTutor;

    public Parent(Long id, String code, String username, String uid, String firstName, String lastName, Gender gender, Civility civility, String about, LocalDate dateOfBirth, String placeOfBirth, String nationality, IDType idType, String idNumber, LocalDate idDateOfIssue, String idPlaceOfIssue, String email, String phone, String phone2, Address address, GPSCoordinates gpsCoordinates, String photo, boolean active, boolean archived, boolean deleted, Calendar createdAt, Calendar updatedAt, String profession, String organisation, MaritalStatus maritalStatus, Collection<Student> childrenAsFather, Collection<Student> childrenAsMother, Collection<Student> childrenAsTutor) {
        super(id, code, username, uid, firstName, lastName, gender, civility, about, dateOfBirth, placeOfBirth, nationality, idType, idNumber, idDateOfIssue, idPlaceOfIssue, email, phone, phone2, address, gpsCoordinates, photo, active, archived, deleted, createdAt, updatedAt);
        this.profession = profession;
        this.organisation = organisation;
        this.maritalStatus = maritalStatus;
        this.childrenAsFather = childrenAsFather;
        this.childrenAsMother = childrenAsMother;
        this.childrenAsTutor = childrenAsTutor;
    }

    public Parent(Person person) {
        super(person);
    }
    public Parent(Parent copy) {
        super(copy);
        this.profession = copy.profession;
        this.organisation = copy.organisation;
        this.maritalStatus = copy.maritalStatus;
        this.childrenAsFather = copy.childrenAsFather;
        this.childrenAsMother = copy.childrenAsMother;
        this.childrenAsTutor = copy.childrenAsTutor;
    }

    public enum MaritalStatus {
        SINGLE,
        MARRIED,
        DIVORCED,
        WIDOWED,
    }
}
