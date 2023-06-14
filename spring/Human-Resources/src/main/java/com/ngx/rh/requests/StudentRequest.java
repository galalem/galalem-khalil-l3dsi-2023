package com.ngx.rh.requests;

import com.ngx.rh.entities.Student.ParentType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class StudentRequest extends PersonRequest {
    private boolean useParentAddress;
    private ParentType mainParent;

    private Long fatherId;
    private Long motherId;
    private Long tutorId;

    public StudentRequest(PersonRequest copy) {
        super(copy);
    }
}
