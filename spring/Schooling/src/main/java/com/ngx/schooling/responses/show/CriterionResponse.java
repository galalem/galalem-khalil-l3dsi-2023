package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.Criterion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CriterionResponse implements Serializable {

    private Long id;
    private String name;
    private String reference;


    public static CriterionResponse fromEntity(Criterion c) {
        if (c == null)
            return null;
        return CriterionResponse.builder()
            .id(c.getId())
            .name(c.getName())
            .reference(c.getReference())
            .build();
    }

}
