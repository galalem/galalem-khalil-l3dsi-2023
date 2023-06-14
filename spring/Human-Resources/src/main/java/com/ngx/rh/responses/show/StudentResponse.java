package com.ngx.rh.responses.show;

import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Student.ParentType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class StudentResponse extends PersonResponse {
    private boolean useParentAddress;
    private Address parentAddress;
    private GPSCoordinates parentGPSCoordinates;

    private ParentType mainParent;

    private com.ngx.rh.responses.browse.ParentResponse father;
    private com.ngx.rh.responses.browse.ParentResponse mother;
    private com.ngx.rh.responses.browse.ParentResponse tutor;

    public StudentResponse(PersonResponse person) {
        super(person);
    }
}
