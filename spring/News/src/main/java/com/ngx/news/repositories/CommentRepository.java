package com.ngx.news.repositories;

import com.ngx.news.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT COUNT(c.id) FROM Comment AS c WHERE c.post.id = :postId")
    long countForPost(@Param("postId") Long postId);
    @Query("SELECT c FROM Comment AS c WHERE c.post.id = :postId AND c.comment.id IS NULL")
    List<Comment> findAllByPost(@Param("postId") Long postId);

    @Modifying
    @Query("UPDATE Comment c SET c.comment.id = null WHERE c.comment.id = :commentId")
    void pruneChildren(@Param("commentId") Long commentId);
}
