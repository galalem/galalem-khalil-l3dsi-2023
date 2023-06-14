package com.ngx.news.responses;

import com.ngx.news.entities.Comment;
import com.ngx.news.entities.Post;
import com.ngx.news.entities.Post.Target;
import com.ngx.news.entities.Reaction;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Calendar;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentResponse {

    private Long id;

    private AuthorResponse author;
    private String content;

    private Calendar createdAt;
    private Calendar updatedAt;
    private List<CommentResponse> responses;
}
