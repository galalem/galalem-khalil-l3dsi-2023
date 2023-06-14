package com.ngx.news.repositories;

import com.ngx.news.entities.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT * FROM Post AS p WHERE p.deleted = false AND p.created_at <= CURRENT_TIMESTAMP AND "+
        "(:isAdmin OR p.target = 'PUBLIC' OR p.uid = :uid OR EXISTS (select 1 from post_person AS pp INNER JOIN Person ON pp.person_id = Person.id WHERE pp.post_id = p.id AND Person.uid = :uid) )",
    nativeQuery = true)
    List<Post> browse(Pageable pageable, @Param("uid") String uid, @Param("isAdmin") boolean isAdmin);

    @Query("SELECT COUNT(p.id) = 1 FROM Post AS p WHERE p.id = :id AND p.uid = :uid")
    boolean isOwner(@Param("uid") String uid, @Param("id") Long id);

    @Modifying
    @Query("UPDATE Post p SET p.deleted = :deleted WHERE p.id = :id")
    void markAsDeleted(@Param("id") Long id, @Param("deleted") boolean deleted);

    @Query(value = "SELECT COUNT(p.id) FROM Post AS p "+
        "WHERE p.deleted = 0 AND p.uid <> :uid AND p.created_at >= :sinceDate AND "+
        "(:isAdmin OR p.target = 'PUBLIC' OR EXISTS (select 1 from post_person AS pp INNER JOIN Person ON pp.person_id = Person.id WHERE pp.post_id = p.id AND Person.uid = :uid) ) AND "+
        "NOT EXISTS (select 1 from Reaction AS r WHERE r.post_id = p.id AND r.uid = :uid)", nativeQuery = true)
    long notifications(@Param("uid") String uid, Date sinceDate, @Param("isAdmin") boolean isAdmin);

}
