package com.ngx.schooling.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GradingRequest {

    @NotNull
    private String label;
    @NotNull
    private boolean numeric;
    @NotNull
    private String grades;

}
