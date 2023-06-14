package com.ngx.schooling.responses.browse;

import com.ngx.schooling.entities.Grade;
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
public class GradeResponse implements Serializable {

    private Long id;
    private BigDecimal value;
    private Long studentId;
    private String comment;
    private List<SubGradeResponse> subGrades;

    public static com.ngx.schooling.responses.browse.GradeResponse fromEntity(Grade g) {
        if (g == null)
            return null;
        return com.ngx.schooling.responses.browse.GradeResponse.builder()
            .id(g.getId())
            .studentId(g.getStudentId())
            .value(g.getValue())
            .comment(g.getComment())
            .subGrades(g.getSubGrades().stream().map(SubGradeResponse::fromEntity).toList())
            .build();
    }

}
