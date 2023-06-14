package com.ngx.schooling.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngx.schooling.exceptions.RestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@org.springframework.stereotype.Service
@Transactional
public abstract class Service<Entity, Id, BrowseResponse, ShowResponse, Request,
    Repository extends com.ngx.schooling.repositories.Repository<Entity, Id>> {

    @Autowired
    protected Repository repository;

    public long count() {
        return repository.countByDeletedFalse();
    }

    public List<BrowseResponse> index() {
        return repository.findAllByDeleted(false).stream().map(this::toBrowseResponse).toList();
    }

    public List<BrowseResponse> index(List<Id> ids) {
        List<Entity> entities = repository.findAllById(ids);
        if (entities.size() < ids.size())
            throw new RestException(400, "Some resources could not be found");
        return entities.stream().map(this::toBrowseResponse).toList();
    }

    public void create(Request request) throws RestException {
        validateRequest(request);
        Entity entity = this.fromRequest(request);
        repository.save(entity);
    }

    public void create(List<Request> requestList) throws RestException {
        for (Request request: requestList)
            this.create(request);
    }

    public ShowResponse show(Id id) throws RestException {
        validateId(id);
        return repository.findById(id).map(this::toShowResponse).orElse(null);
    }

    public List<ShowResponse> show(List<Id> ids) throws RestException {
        validateIds(ids);
        return repository.findAllById(ids).stream().map(this::toShowResponse).toList();
    }

    public void update(Request request, Id id) throws RestException {
        validateId(id);
        validateRequest(request, id);
        Entity entity = this.fromRequest(repository.findById(id).get(), request);
        repository.save(entity);
    }

    public void delete(Id id) throws RestException {
        validateId(id);
        repository.removeById(id);
    }

    public void delete(List<Id> ids) throws RestException {
        validateIds(ids);
        repository.removeAllById(ids);
    }

    public void restore(Id id) throws RestException {
        validateId(id);
        repository.restoreById(id);
    }

    public void destroy(Id id) throws RestException {
        validateId(id);
        repository.deleteById(id);
    }


    protected void validateId(Id id) throws RestException {
        if (!repository.existsById(id))
            throw new RestException(404, "No element with id '"+id+"' is found");
    }
    protected void validateIds(List<Id> ids) throws RestException {
        if (repository.countAllByIdIn(ids) < ids.size())
            throw new RestException(400, "Some resources could not be found");
    }
    protected void validateRequest(Request request) throws RestException {
        validateRequest(request, null);
    }
    protected void validateRequest(Request request, Id id) throws RestException {
        Map<String, String> errors = id == null ? extractErrors(request) : extractErrors(request, id);
        if (errors == null)
            return;
        String json = "Bad Request";
        try {
            json = new ObjectMapper().writeValueAsString(errors);
        } catch (JsonProcessingException ignored) { }
        throw new RestException(400, json);
    }
    protected Map<String, String> extractErrors(Request request) { return null; }
    protected Map<String, String> extractErrors(Request request, Id id) { return null; }
    protected abstract Entity fromRequest(Request request);
    protected abstract Entity fromRequest(Entity old, Request request);
    protected abstract BrowseResponse toBrowseResponse(Entity entity);
    protected abstract ShowResponse toShowResponse(Entity entity);
}
