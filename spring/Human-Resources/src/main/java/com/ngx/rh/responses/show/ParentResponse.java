package com.ngx.rh.responses.show;

import com.ngx.rh.entities.Parent;
import com.ngx.rh.responses.browse.StudentResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class ParentResponse extends PersonResponse {
    private String profession;
    private String organisation;
    private Parent.MaritalStatus maritalStatus;

    private List<StudentResponse> children;

    public ParentResponse(PersonResponse person) {
        super(person);
    }
}
