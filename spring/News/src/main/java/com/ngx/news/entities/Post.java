package com.ngx.news.entities;

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
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;
    @Enumerated(EnumType.STRING)
    private Target target;

    private String title;
    @Column(columnDefinition="TEXT")
    private String content;


    private boolean pinned = false;
    private boolean deleted = false;

    private boolean reactionsEnabled = true;
    private boolean commentsEnabled = true;


    @Temporal(TemporalType.TIMESTAMP)
    private Calendar createdAt;
    @UpdateTimestamp
    private Calendar updatedAt;

    @OneToMany(mappedBy = "post", fetch=FetchType.LAZY)
    private Collection<Comment> comments;

    @OneToMany(mappedBy = "post", fetch=FetchType.LAZY)
    private Collection<Reaction> reactions;

    @OneToMany(mappedBy = "post", fetch=FetchType.LAZY)
    private Collection<Attachment> attachments;


    @ManyToMany(fetch=FetchType.LAZY)
    private Collection<Person> person;


    public enum Target {
        PUBLIC,
        TEACHER,
        STUDENT,
        PARENT,
        STAFF
    }

}
