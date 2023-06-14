package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.Registration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentResponse {

    private Long id;
    private Integer group;


    public static StudentResponse fromEntity(Registration r) {
        if (r == null)
            return null;
        return StudentResponse.builder()
            .id(r.getStudentId())
            .group(r.getGroup())
            .build();
    }
}
