package com.ngx.rh.repositories;

import com.ngx.rh.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.util.List;

@NoRepositoryBean
public interface PersonRepository<T extends Person> extends JpaRepository<T, Long> {

    boolean existsByCode(String code);

    @Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.deleted = false")
    long countByDeletedFalse();

    @Query("SELECT p FROM #{#entityName} AS p WHERE p.deleted = 0 ORDER BY p.id DESC")
    List<T> findAllOfType();
    @Query("SELECT p FROM #{#entityName} AS p WHERE p.id in(:ids) ORDER BY p.id DESC")
    List<T> findAllOfTypeIn(@Param("ids") Iterable<Long> ids);
    @Query(value = "SELECT p.uid FROM Person p WHERE p.uid IS NOT NULL", nativeQuery = true)
    List<String> findAllUsers();
    @Query("SELECT p FROM #{#entityName} AS p WHERE p.active = true AND p.archived = false AND p.deleted = false AND DAY(p.dateOfBirth) = DAY(CURRENT_DATE) AND MONTH(p.dateOfBirth) = MONTH(CURRENT_DATE)")
    List<T> findAllBirthdays();

    @Query("SELECT new com.ngx.rh.responses.stats.PersonResponse(p.id, CAST(FLOOR(DATEDIFF(current_date, p.dateOfBirth)/365.25) AS Integer), p.gender, p.nationality, p.active, p.archived) FROM #{#entityName} AS p WHERE p.deleted = 0 ORDER BY p.id DESC")
    List<com.ngx.rh.responses.stats.PersonResponse> stats();

    @Modifying
    @Query("UPDATE Person p SET p.active = :active WHERE p.id in(:ids)")
    void markAllPeopleAsActive(@Param("ids") Iterable<Long> ids, @Param("active") boolean active);
    @Modifying
    @Query("UPDATE Person p SET p.archived = :archived WHERE p.id in(:ids)")
    void markAllPeopleAsArchived(@Param("ids") Iterable<Long> ids, @Param("archived") boolean archived);
    @Modifying
    @Query("UPDATE Person p SET p.deleted = :deleted WHERE p.id in(:ids)")
    void markAllPeopleAsDeleted(@Param("ids") Iterable<Long> ids, @Param("deleted") boolean deleted);
}
