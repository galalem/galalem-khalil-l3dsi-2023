package com.ngx.news.requests;

import com.ngx.news.entities.Reaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReactionRequest {
    private Reaction.ReactionType reaction;
}
