package com.ngx.news.responses;

import com.ngx.news.entities.Post.Target;
import com.ngx.news.entities.Reaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostResponse {

    private Long id;
    private Target target;
    private AuthorResponse author;
    private String title;
    private String content;

    private List<String> attachments;

    private PostReactionsResponse reactions;

    private Reaction.ReactionType userReaction = null;
    private boolean userHasSeen = false;
    private boolean reactionsEnabled = true;
    private boolean commentsEnabled = true;
    private boolean pinned = false;
    private Calendar createdAt;
    private Calendar updatedAt;
}
