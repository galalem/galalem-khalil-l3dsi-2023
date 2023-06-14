package com.ngx.schooling.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubjectRequest implements Serializable {

    @NotNull(message = "le champ «Libelle» est obligatoire")
    private String label;
    private Long teacherId;
    @NotNull
    private Long classId;
    private Boolean shared;
    private String color;
    private List<@Valid SessionRequest> sessions;
    private List<Long> students;
}
