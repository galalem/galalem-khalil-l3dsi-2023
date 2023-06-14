package com.ngx.schooling.responses.show;

import com.ngx.schooling.entities.Grading;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GradingResponse implements Serializable {

    private Long id;
    private String label;
    private boolean numeric;
    private String grades;


    public static GradingResponse fromEntity(Grading g) {
        if (g == null)
            return null;
        return GradingResponse.builder()
            .id(g.getId())
            .label(g.getLabel())
            .numeric(g.isNumeric())
            .grades(g.getGrades())
            .build();
    }
}
