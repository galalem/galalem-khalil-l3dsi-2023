package com.ngx.schooling.responses.browse;

import com.ngx.schooling.entities.Session;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SessionResponse implements Serializable {

    private Long id;
    private String place;
    private Integer start;
    private Integer end;
    private Integer group;
    private Boolean fortnight;


    public static SessionResponse fromEntity(Session s) {
        if (s == null)
            return null;
        return SessionResponse.builder()
            .id(s.getId())
            .place(s.getPlace())
            .start(s.getStart())
            .end(s.getEnd())
            .group(s.getGroup())
            .fortnight(s.getFortnight())
            .build();
    }

}
