package com.ngx.admin.responses.show;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PeriodResponse implements Serializable {

    private Long id;
    private String year;
    private Long departmentId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Calendar startsAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Calendar endsAt;
}
