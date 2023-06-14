package com.ngx.rh.requests;

import com.ngx.rh.entities.Parent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class ParentRequest extends PersonRequest {
    @NotNull(message = "le champ \"Profession\" est obligatoire")
    private String profession;
    private String organisation;
    @NotNull(message = "le champ \"État civil\" est obligatoire")
    private Parent.MaritalStatus maritalStatus;

    public ParentRequest(PersonRequest copy) {
        super(copy);
    }
}
