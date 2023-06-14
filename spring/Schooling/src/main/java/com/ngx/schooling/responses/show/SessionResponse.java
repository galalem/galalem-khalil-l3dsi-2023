package com.ngx.schooling.responses.show;

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
    private String label;
    private String place;
    private Long teacherId;
    private Long classId;
    private String color;
    private Integer start;
    private Integer end;
    private Integer group;
    private Boolean fortnight;


    public static SessionResponse fromEntity(Session s) {
        if (s == null)
            return null;
        return SessionResponse.builder()
            .id(s.getId())
            .label(s.getSubject().getLabel())
            .place(s.getPlace())
            .teacherId(s.getSubject().getTeacherId())
            .classId(s.getSubject().getClassId())
            .color(s.getSubject().getColor())
            .start(s.getStart())
            .end(s.getEnd())
            .group(s.getGroup())
            .fortnight(s.getFortnight())
            .build();
    }

}
