package com.ngx.admin.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngx.admin.exceptions.RestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@org.springframework.stereotype.Service
@Transactional
public abstract class Service<Entity, Id, BrowseResponse, ShowResponse, Request,
    Repository extends com.ngx.admin.repositories.Repository<Entity, Id>> {

    @Autowired
    protected Repository repository;

    public List<BrowseResponse> index() {
        return repository.findAllByDeleted(false).stream().map(this::toBrowseResponse).toList();
    }

    public void create(Request request) throws RestException {
        validateRequest(request);
        Entity entity = this.fromRequest(request);
        repository.save(entity);
    }

    public ShowResponse show(Id id) throws RestException {
        validateId(id);
        return repository.findById(id).map(this::toShowResponse).orElse(null);
    }

    public void update(Request request, Id id) throws RestException {
        Optional<Entity> fetch = repository.findById(id);
        if (fetch.isEmpty())
            throw new RestException(404, "No element with id '"+id+"' is found");
        validateRequest(request, id);
        Entity entity = this.fromRequest(fetch.get(), request);
        repository.save(entity);
    }

    public void delete(Id id) throws RestException {
        validateId(id);
        repository.removeById(id);
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
    protected final void validateRequest(Request request) throws RestException {
        validateRequest(request, null);
    }
    protected final void validateRequest(Request request, Id id) throws RestException {
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
