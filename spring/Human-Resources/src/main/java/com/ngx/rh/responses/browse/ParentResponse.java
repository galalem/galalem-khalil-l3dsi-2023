package com.ngx.rh.responses.browse;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class ParentResponse extends PersonResponse {
    private String profession;
    private int children;
    public ParentResponse(PersonResponse response) {
        super(response);
    }
}
