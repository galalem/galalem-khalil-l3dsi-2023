package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.Class;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ClassResponse {

    private Long id;
    private Long levelId;
    private Long periodId;
    private String name;
    private String acronym;
    private String about;

    private Collection<StudentResponse> students;


    public static ClassResponse fromEntity(Class c) {
        if (c == null)
            return null;
        return ClassResponse.builder()
            .id(c.getId())
            .levelId(c.getLevelId())
            .periodId(c.getPeriodId())
            .name(c.getName())
            .acronym(c.getAcronym())
            .about(c.getAbout())
            .students(c.getStudents().stream().map(StudentResponse::fromEntity).toList())
            .build();
    }
}
