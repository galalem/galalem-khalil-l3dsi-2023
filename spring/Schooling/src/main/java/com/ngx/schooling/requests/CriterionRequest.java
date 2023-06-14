package com.ngx.schooling.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CriterionRequest {

    @NotNull
    private String name;
    @NotNull
    private String reference;
    @NotNull
    private Long subjectId;

}
