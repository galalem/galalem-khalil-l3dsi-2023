package com.ngx.schooling.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GradeRequest implements Serializable {

    private Long id;
    private BigDecimal value;
    @NotNull
    private Long studentId;
    private String comment;

    private List<@Valid SubGradeRequest> subGrades;

}
