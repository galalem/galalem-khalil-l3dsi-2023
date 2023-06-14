package com.ngx.admin.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class PeriodRequest implements Serializable {

    private Long id;
    @NotBlank(message = "le champ «Année Scolaire» est obligatoire")
    @Pattern(regexp = "^20\\d{2}-20\\d{2}$", message = "le champ «Année Scolaire» doit respecter le format 20XX-20XX")
    private String year;
    @NotBlank(message = "le champ «Département» est obligatoire")
    private Long departmentId;
    @NotNull(message = "le champ «Date début» est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Calendar startsAt;
    @NotNull(message = "le champ «Date fin» est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Calendar endsAt;
}
