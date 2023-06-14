package com.ngx.schooling.responses.show;

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
    private SubjectInfo subject;
    private String comment;
    private List<SubGradeResponse> subGrades;


    public static GradeResponse fromEntity(Grade g) {
        if (g == null)
            return null;
        return GradeResponse.builder()
            .id(g.getId())
            .studentId(g.getStudentId())
            .value(g.getValue())
            .comment(g.getComment())
            .subGrades(g.getSubGrades().stream().map(SubGradeResponse::fromEntity).toList())
            .subject(SubjectInfo.builder()
                .id(g.getSubject().getId())
                .label(g.getSubject().getLabel())
                .classId(g.getSubject().getClassId())
                .teacherId(g.getSubject().getTeacherId())
                .build())
            .build();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class SubjectInfo {
        private Long id;
        private String label;
        private Long teacherId;
        private Long classId;
    }

}
