package com.ngx.schooling.responses.show;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ngx.schooling.entities.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EvaluationResponse implements Serializable {

    private Long id;

    private String label;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate start;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate end;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;


    public static EvaluationResponse fromEntity(Evaluation e) {
        if (e == null)
            return null;
        return EvaluationResponse.builder()
            .id(e.getId())
            .label(e.getLabel())
            .start(e.getStart())
            .end(e.getEnd())
            .deadline(e.getDeadline())
            .build();
    }

}
