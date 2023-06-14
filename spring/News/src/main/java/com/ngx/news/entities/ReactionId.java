package com.ngx.news.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class ReactionId implements Serializable {
    private Post post;
    private String uid;
}
