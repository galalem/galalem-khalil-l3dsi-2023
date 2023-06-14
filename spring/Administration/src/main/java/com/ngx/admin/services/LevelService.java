package com.ngx.admin.services;

import com.ngx.admin.entities.Department;
import com.ngx.admin.entities.Level;
import com.ngx.admin.exceptions.RestException;
import com.ngx.admin.repositories.LevelRepository;
import com.ngx.admin.requests.LevelRequest;
import com.ngx.admin.responses.show.LevelResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class LevelService extends Service<
    Level,
    Long,
    LevelResponse,
    LevelResponse,
    LevelRequest,
    LevelRepository> {

    /**
     * List all entities
     * @deprecated
     * This method is no longer used to list entities.
     * <p> Use {@link LevelService#index(Long)} instead.
     *
     * @return list of all entities
     */
    @Override
    @Deprecated
    public List<LevelResponse> index() {
        return super.index();
    }

    public List<LevelResponse> index(Long departmentId) {
        return repository.findAllByDepartmentIdAndDeleted(departmentId, false)
            .stream().map(this::toResponse).toList();
    }

    /**
     * Create new entity
     * @deprecated
     * This method is no longer used to create new entity.
     * <p> Use {@link LevelService#create(LevelRequest, Long)} instead.
     */
    @Deprecated
    @Override
    public void create(LevelRequest levelRequest) throws RestException {
        super.create(levelRequest);
    }

    public void create(LevelRequest request, Long departmentId) throws RestException {
        validateRequest(request);
        Level entity = this.fromRequest(request);
        entity.setDepartment(Department.builder().id(departmentId).build());
        repository.save(entity);
    }

    @Override
    protected Level fromRequest(LevelRequest request) {
        return this.fromRequest(new Level(), request);
    }

    @Override
    protected Level fromRequest(Level level, LevelRequest request) {
        level.setName(request.getName());
        level.setAcronym(request.getAcronym());
        level.setParent(request.getParent() == null ? null :Level.builder().id(request.getParent()).build());
        return level;
    }

    /**
     * Extract browse response from entity
     * @deprecated
     * This method is no longer used to extract browse responses.
     * <p> Use {@link LevelService#toResponse(Level)} instead.
     */
    @Deprecated
    @Override
    protected LevelResponse toBrowseResponse(Level level) {
        return this.toResponse(level);
    }

    /**
     * Extract show response from entity
     * @deprecated
     * This method is no longer used to extract show responses.
     * <p> Use {@link LevelService#toResponse(Level)} instead.
     */
    @Deprecated
    @Override
    protected LevelResponse toShowResponse(Level level) {
        return this.toResponse(level);
    }

    protected LevelResponse toResponse(Level level) {
        return LevelResponse.builder()
            .id(level.getId())
            .name(level.getName())
            .acronym(level.getAcronym())
            .parent(level.getParent() == null ? null : level.getParent().getId())
            .build();
    }
}
