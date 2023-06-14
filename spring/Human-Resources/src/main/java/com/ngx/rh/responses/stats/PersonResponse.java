package com.ngx.rh.responses.stats;

import com.ngx.rh.entities.Person;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PersonResponse {

    private Long id;
    private Integer age;
    private Person.Gender gender;
    private String nationality;

    private boolean active;
    private boolean archived;

    /*
   id, age, gender, nationality, active, archived
     */
}
