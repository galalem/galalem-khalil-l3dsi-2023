package com.ngx.schooling.responses.browse;

import com.ngx.schooling.entities.SubGrade;
import com.ngx.schooling.responses.show.CriterionResponse;
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
    private Long criterion;


    public static com.ngx.schooling.responses.browse.SubGradeResponse fromEntity(SubGrade subGrade) {
        if (subGrade == null)
            return null;
        return com.ngx.schooling.responses.browse.SubGradeResponse.builder()
            .id(subGrade.getId())
            .value(subGrade.getValue())
            .criterion(subGrade.getCriterion().getId())
            .build();
    }

}
