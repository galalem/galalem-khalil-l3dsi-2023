package com.ngx.admin.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Calendar;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Period implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String year;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @Temporal(TemporalType.DATE)
    private Calendar startsAt;
    @Temporal(TemporalType.DATE)
    private Calendar endsAt;

    private boolean deleted;
}
