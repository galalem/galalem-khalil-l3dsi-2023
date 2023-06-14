package com.ngx.admin.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Department implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String acronym;

    private String about;

    private String email;
    private String phone;

    private boolean deleted;
    @CreationTimestamp
    private Calendar createdAt;
    @UpdateTimestamp
    private Calendar updatedAt;


    @OneToMany(mappedBy = "department", fetch=FetchType.LAZY)
    private Collection<Level> levels;
}
