package com.ngx.schooling.responses.browse;

import com.ngx.schooling.entities.Class;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Integer students;


    public static ClassResponse fromEntity(Class c) {
        if (c == null)
            return null;
        return ClassResponse.builder()
            .id(c.getId())
            .levelId(c.getLevelId())
            .periodId(c.getPeriodId())
            .name(c.getName())
            .acronym(c.getAcronym())
            .students(c.getStudents().size())
            .build();
    }
}
