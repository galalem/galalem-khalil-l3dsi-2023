package com.ngx.schooling.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ClassRequest {

    @NotNull(message = "le champ «Niveau» est obligatoire")
    private Long levelId;
    @NotNull(message = "le champ «Période» est obligatoire")
    private Long periodId;
    private String name;
    private String acronym;

    private String about;
}
