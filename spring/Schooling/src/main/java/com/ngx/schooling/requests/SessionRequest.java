package com.ngx.schooling.requests;

import com.ngx.schooling.entities.Subject;
import jakarta.persistence.*;
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
public class SessionRequest implements Serializable {

    @NotNull
    private Integer start;
    @NotNull
    private Integer end;
    @NotNull
    private String place;

    private Integer group;
    private Boolean fortnight;

}
