package com.ngx.admin.responses.show;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LevelResponse {

    private Long id;
    private String name;
    private String acronym;
    private Long parent;


}
