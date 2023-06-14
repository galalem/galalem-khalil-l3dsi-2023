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
public class Subject implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    @Column(name = "teacher_id")
    private Long teacherId;
    @Column(name = "class_id")
    private Long classId;
    private boolean shared = true;
    private String color;

    @ManyToOne
    @JoinColumn(name = "grading_id")
    private Grading grading;

    @OneToMany(mappedBy = "subject", fetch=FetchType.LAZY)
    private Collection<Session> sessions;

    @OneToMany(mappedBy = "subject", fetch=FetchType.LAZY)
    private Collection<Criterion> criteria;

    @ElementCollection
    private Collection<Long> students;

    private boolean deleted;

}
