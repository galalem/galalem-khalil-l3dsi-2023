package com.ngx.news.responses;

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
public class ReactionResponse {
    private Reaction.ReactionType reaction;
    private AuthorResponse user;
}
