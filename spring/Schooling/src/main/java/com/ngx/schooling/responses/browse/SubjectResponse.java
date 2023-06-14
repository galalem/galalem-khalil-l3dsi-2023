package com.ngx.schooling.responses.browse;

import com.ngx.schooling.entities.Subject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
    private Integer students;


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
            .students(s.isShared() ? 0 : s.getStudents().size())
            .build();
    }
}
