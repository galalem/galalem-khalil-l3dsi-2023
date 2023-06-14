package com.ngx.schooling.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Class implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level_id")
    private Long levelId;
    @Column(name = "period_id")
    private Long periodId;

    private String name;
    private String acronym;
    private String about;

    private boolean deleted;

    @OneToMany(fetch=FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Collection<Registration> students;

}
