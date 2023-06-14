package com.ngx.schooling.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.util.List;

@NoRepositoryBean
public interface Repository<Entity, ID> extends JpaRepository<Entity, ID> {

    List<Entity> findAllByDeleted(boolean deleted);
    long countAllByIdIn(List<ID> ids);

    @Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.deleted = false")
    long countByDeletedFalse();

    @Modifying
    @Query("UPDATE #{#entityName} entity SET entity.deleted = true WHERE entity.id = :id")
    void removeById(@Param("id") ID id);
    @Modifying
    @Query("UPDATE #{#entityName} entity SET entity.deleted = true WHERE entity.id in(:ids)")
    void removeAllById(@Param("ids") Iterable<ID> ids);

    @Modifying
    @Query("UPDATE #{#entityName} entity SET entity.deleted = false WHERE entity.id = :id")
    void restoreById(@Param("id") ID id);
    @Modifying
    @Query("UPDATE #{#entityName} entity SET entity.deleted = false WHERE entity.id in(:ids)")
    void restoreAllById(@Param("ids") Iterable<ID> ids);
}
