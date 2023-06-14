package com.ngx.news.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@IdClass(ReactionId.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Reaction implements Serializable {

    @Enumerated(EnumType.STRING)
    private ReactionType reaction;
    @Id
    private String uid;

    @ManyToOne
    @Id
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    public enum ReactionType {
        LIKE,
        HATE,
        HAHA,
        WOW,
        SAD,
        ANGRY,
        DISINTERESTED
    }

}
