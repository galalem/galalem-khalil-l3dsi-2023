package com.ngx.rh.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Person implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(unique=true)
    private String code;

    private String username;
    private String uid;

    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Civility civility;

    @Column(columnDefinition="TEXT")
    private String about;

    @Temporal(TemporalType.DATE)
    private LocalDate dateOfBirth;
    private String placeOfBirth;
    private String nationality;

    @Enumerated(EnumType.STRING)
    private IDType idType;
    private String idNumber;
    @Temporal(TemporalType.DATE)
    private LocalDate idDateOfIssue;
    private String idPlaceOfIssue;

    private String email;
    private String phone;
    private String phone2;
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
    @ManyToOne
    @JoinColumn(name = "coordinates_id", referencedColumnName = "id")
    private GPSCoordinates gpsCoordinates;


    private String photo;


    private boolean active = true;
    private boolean archived = false;
    private boolean deleted = false;


    @CreationTimestamp
    private Calendar createdAt;
    @UpdateTimestamp
    private Calendar updatedAt;

    public Person(Person origin) {
        this.id = origin.id;
        this.code = origin.code;
        this.uid = origin.uid;
        this.username = origin.username;
        this.firstName = origin.firstName;
        this.lastName = origin.lastName;
        this.gender = origin.gender;
        this.civility = origin.civility;
        this.about = origin.about;
        this.dateOfBirth = origin.dateOfBirth;
        this.placeOfBirth = origin.placeOfBirth;
        this.nationality = origin.nationality;
        this.idType = origin.idType;
        this.idNumber = origin.idNumber;
        this.idDateOfIssue = origin.idDateOfIssue;
        this.idPlaceOfIssue = origin.idPlaceOfIssue;
        this.email = origin.email;
        this.phone = origin.phone;
        this.phone2 = origin.phone2;
        this.address = origin.address;
        this.photo = origin.photo;
        this.active = origin.active;
        this.archived = origin.archived;
        this.deleted = origin.deleted;
        this.gpsCoordinates = origin.gpsCoordinates;
        this.createdAt = origin.createdAt;
        this.updatedAt = origin.updatedAt;
    }


    public enum Gender {
        MALE,
        FEMALE
    }

    public enum Civility {
        MR, // MAN | Unknown martial status
        MRS, // WOMAN | Married
        MISS, // WOMAN | Unmarried
        MS // WOMAN | Unknown martial status
    }

    public enum IDType {
        NIC, // National Identity Card
        PASSPORT, // Passport
        RP // Residence Permit
    }
}
