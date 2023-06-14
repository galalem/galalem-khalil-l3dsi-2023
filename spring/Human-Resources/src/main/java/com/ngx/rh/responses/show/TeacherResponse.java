package com.ngx.rh.responses.show;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ngx.rh.entities.Teacher.Contract;
import com.ngx.rh.entities.Teacher.Rank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Calendar;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class TeacherResponse extends PersonResponse {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfRecruitment;
    private Contract typeOfContract;
    private Rank rank;
    private String title;

    public TeacherResponse(PersonResponse person) {
        super(person);
    }
}
