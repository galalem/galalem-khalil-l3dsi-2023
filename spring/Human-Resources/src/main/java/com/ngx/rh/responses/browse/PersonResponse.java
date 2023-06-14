package com.ngx.rh.responses.browse;

import com.ngx.rh.entities.Person;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PersonResponse {

    private Long id;
    private String photo;
    private String code;
    private String firstName;
    private String lastName;
    private Person.Gender gender;
    private Person.Civility civility;
    private String email;
    private String phone;

    private boolean active;
    private boolean archived;

    private Calendar createdAt;
    private Calendar updatedAt;

    public PersonResponse(PersonResponse copy) {
        this.id = copy.id;
        this.photo = copy.photo;
        this.code = copy.code;
        this.firstName = copy.firstName;
        this.lastName = copy.lastName;
        this.gender = copy.gender;
        this.civility = copy.civility;
        this.email = copy.email;
        this.phone = copy.phone;
        this.active = copy.active;
        this.archived = copy.archived;
        this.createdAt = copy.createdAt;
        this.updatedAt = copy.updatedAt;
    }
}
