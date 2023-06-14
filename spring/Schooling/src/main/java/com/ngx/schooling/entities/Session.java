package com.ngx.schooling.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Session implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private Integer start;
    @Column(name = "end_time")
    private Integer end;
    private String place;
    @Column(name = "team")
    private Integer group;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    private Boolean fortnight;

}
