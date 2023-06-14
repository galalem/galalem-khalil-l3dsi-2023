package com.ngx.schooling.responses.stats;

import com.ngx.schooling.responses.browse.SubGradeResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GradeResponse implements Serializable {

    private Long id;
    private long done;
    private long total;

}
