package com.ngx.news.repositories;

import com.ngx.news.entities.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    @Modifying
    @Query("DELETE FROM Attachment a WHERE a.post.id = :postId")
    void deleteWherePost(@Param("postId") Long postId);
}
