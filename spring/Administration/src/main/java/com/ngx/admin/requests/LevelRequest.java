package com.ngx.admin.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LevelRequest {
    @NotBlank(message = "le champ «Nom» est obligatoire")
    private String name;
    @NotBlank(message = "le champ «Acronyme» est obligatoire")
    private String acronym;
    private Long parent;
}
