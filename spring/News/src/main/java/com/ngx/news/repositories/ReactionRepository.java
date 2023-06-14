package com.ngx.news.repositories;

import com.ngx.news.entities.Reaction;
import com.ngx.news.entities.ReactionId;
import com.ngx.news.entities.ReactionTypeCountEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReactionRepository extends JpaRepository<Reaction, ReactionId> {

    @Query("SELECT r FROM Reaction AS r WHERE r.post.id = :postId")
    List<Reaction> findAllByPost(@Param("postId") Long postId);
    @Query("SELECT r.uid FROM Reaction AS r WHERE r.post.id = :id")
    List<String> getUidForPost(@Param("id") Long id);
    @Query("SELECT new com.ngx.news.entities.ReactionTypeCountEntry(r.reaction, COUNT(r.uid)) FROM Reaction AS r WHERE r.post.id = :id GROUP BY r.reaction")
    List<ReactionTypeCountEntry> countPerTypeForPost(@Param("id") Long id);
    @Query("SELECT COUNT(r.uid) FROM Reaction AS r WHERE r.post.id = :id")
    long countAllForPost(@Param("id") Long id);

}
