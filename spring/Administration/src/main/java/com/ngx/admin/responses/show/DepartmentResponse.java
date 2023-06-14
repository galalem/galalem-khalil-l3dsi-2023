package com.ngx.admin.responses.show;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DepartmentResponse {

    private Long id;

    private String name;
    private String acronym;

    private String about;

    private String email;
    private String phone;

    private Calendar createdAt;
    private Calendar updatedAt;
}
