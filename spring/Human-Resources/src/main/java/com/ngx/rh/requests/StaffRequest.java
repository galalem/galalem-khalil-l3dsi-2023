package com.ngx.rh.requests;

import com.ngx.rh.entities.Staff.Contract;
import com.ngx.rh.entities.Staff.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Calendar;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class StaffRequest extends PersonRequest {
    @NotNull(message = "le champ \"Date de Recrutement\" est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfRecruitment;
    @NotNull(message = "le champ \"Type de Contrat\" est obligatoire")
    private Contract typeOfContract;
    private Role role;
    private String function;
    private String mailer;

    public StaffRequest(PersonRequest copy) {
        super(copy);
    }
}
