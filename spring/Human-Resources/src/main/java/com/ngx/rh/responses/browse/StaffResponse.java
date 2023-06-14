package com.ngx.rh.responses.browse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ngx.rh.entities.Staff.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Calendar;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class StaffResponse extends PersonResponse {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfRecruitment;
    private Role role;
    private String function;

    public StaffResponse(PersonResponse response) {
        super(response);
    }
}
