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
public class Student extends Person {

    private boolean useParentAddress;
    private ParentType mainParent;

    @ManyToOne
    @JoinColumn(name = "father_id", referencedColumnName = "id")
    private Parent father;
    @ManyToOne
    @JoinColumn(name = "mother_id", referencedColumnName = "id")
    private Parent mother;
    @ManyToOne
    @JoinColumn(name = "tutor_id", referencedColumnName = "id")
    private Parent tutor;

    public Student(Long id, String code, String username, String uid, String firstName, String lastName, Gender gender, Civility civility, String about, LocalDate dateOfBirth, String placeOfBirth, String nationality, IDType idType, String idNumber, LocalDate idDateOfIssue, String idPlaceOfIssue, String email, String phone, String phone2, Address address, GPSCoordinates gpsCoordinates, String photo, boolean active, boolean archived, boolean deleted, Calendar createdAt, Calendar updatedAt, boolean useParentAddress, ParentType mainParent, Parent father, Parent mother, Parent tutor) {
        super(id, code, username, uid, firstName, lastName, gender, civility, about, dateOfBirth, placeOfBirth, nationality, idType, idNumber, idDateOfIssue, idPlaceOfIssue, email, phone, phone2, address, gpsCoordinates, photo, active, archived, deleted, createdAt, updatedAt);
        this.useParentAddress = useParentAddress;
        this.mainParent = mainParent;
        this.father = father;
        this.mother = mother;
        this.tutor = tutor;
    }

    public Student(Person person) {
        super(person);
    }
    public Student(Student copy) {
        super(copy);
        this.useParentAddress = copy.useParentAddress;
        this.mainParent = copy.mainParent;
        this.father = copy.father;
        this.mother = copy.mother;
        this.tutor = copy.tutor;
    }


    public enum ParentType {
        FATHER,
        MOTHER,
        TUTOR
    }
}
