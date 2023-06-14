package com.ngx.schooling.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Collection;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Evaluation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private Long periodId;

    @Temporal(TemporalType.DATE)
    @Column(name = "starts_at")
    private LocalDate start;
    @Temporal(TemporalType.DATE)
    @Column(name = "ends_at")
    private LocalDate end;
    @Temporal(TemporalType.DATE)
    private LocalDate deadline;

    private boolean deleted;

    @OneToMany(mappedBy = "evaluation", fetch=FetchType.LAZY)
    private Collection<Grade> grades;

}
