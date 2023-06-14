package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.SubGrade;
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
public class SubGradeResponse implements Serializable {

    private Long id;
    private BigDecimal value;
    private CriterionResponse criterion;


    public static SubGradeResponse fromEntity(SubGrade subGrade) {
        if (subGrade == null)
            return null;
        return SubGradeResponse.builder()
            .id(subGrade.getId())
            .value(subGrade.getValue())
            .criterion(CriterionResponse.fromEntity(subGrade.getCriterion()))
            .build();
    }

}
