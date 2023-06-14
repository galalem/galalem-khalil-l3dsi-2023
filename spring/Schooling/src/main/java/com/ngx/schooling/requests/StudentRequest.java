package com.ngx.schooling.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentRequest implements Serializable {

    @NotNull(message = "le champ «Elève» est obligatoire")
    private Long studentId;
    private Integer group;
}
