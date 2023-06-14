package com.ngx.admin.responses.browse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EstablishmentResponse {

    private Long id;
    private String name;
    private String acronym;

    private Calendar createdAt;
    private Calendar updatedAt;
}
