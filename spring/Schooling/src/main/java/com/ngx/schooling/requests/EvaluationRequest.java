package com.ngx.schooling.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EvaluationRequest implements Serializable {

    @NotNull
    private String label;
    @NotNull
    private Long period;

    @NotNull(message = "le champ «Date début» est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate start;
    @NotNull(message = "le champ «Date fin» est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate end;
    @NotNull(message = "le champ «Date limite» est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

}
