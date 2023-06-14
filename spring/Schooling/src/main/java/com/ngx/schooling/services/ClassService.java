package com.ngx.schooling.services;

import com.ngx.schooling.entities.Class;
import com.ngx.schooling.repositories.ClassRepository;
import com.ngx.schooling.requests.ClassRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class ClassService extends Service<
    Class,
    Long,
    com.ngx.schooling.responses.browse.ClassResponse,
    com.ngx.schooling.responses.show.ClassResponse,
    ClassRequest,
    ClassRepository> {

    public List<com.ngx.schooling.responses.browse.ClassResponse> index(Long periodId) {
        return repository.findAllByPeriodId(periodId).stream().map(this::toBrowseResponse).toList();
    }

    @Override
    protected Class fromRequest(ClassRequest request) {
        return fromRequest(new Class(), request);
    }
    @Override
    protected Class fromRequest(Class c, ClassRequest request) {
        c.setLevelId(request.getLevelId());
        c.setPeriodId(request.getPeriodId());
        c.setName(request.getName());
        c.setAcronym(request.getAcronym());
        c.setAbout(request.getAbout());
        return c;
    }

    @Override
    protected com.ngx.schooling.responses.browse.ClassResponse toBrowseResponse(Class c) {
        return com.ngx.schooling.responses.browse.ClassResponse.fromEntity(c);
    }

    @Override
    protected com.ngx.schooling.responses.show.ClassResponse toShowResponse(Class c) {
        return com.ngx.schooling.responses.show.ClassResponse.fromEntity(c);
    }
}
