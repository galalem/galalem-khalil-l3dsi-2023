package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.Grading;
import com.ngx.schooling.entities.Subject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubjectResponse implements Serializable {

    private Long id;
    private String label;
    private Long teacherId;
    private Long classId;
    private String color;
    private boolean shared;
    private GradingResponse grading;
    private Collection<Long> students;
    private Collection<com.ngx.schooling.responses.browse.SessionResponse> sessions;
    private Collection<CriterionResponse> criteria;


    public static SubjectResponse fromEntity(Subject s) {
        if (s == null)
            return null;
        return SubjectResponse.builder()
            .id(s.getId())
            .label(s.getLabel())
            .teacherId(s.getTeacherId())
            .classId(s.getClassId())
            .color(s.getColor())
            .shared(s.isShared())
            .grading(GradingResponse.fromEntity(s.getGrading()))
            .students(s.isShared() ? null : s.getStudents())
            .sessions(s.getSessions().stream().map(com.ngx.schooling.responses.browse.SessionResponse::fromEntity).toList())
            .criteria(s.getCriteria().stream().map(CriterionResponse::fromEntity).toList())
            .build();
    }
}
