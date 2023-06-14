package com.ngx.schooling.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubGradeRequest implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal value;

    @NotNull
    private Long criterion;

}
