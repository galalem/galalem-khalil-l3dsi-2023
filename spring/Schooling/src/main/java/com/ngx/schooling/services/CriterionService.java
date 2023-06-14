package com.ngx.schooling.services;

import com.ngx.schooling.entities.Criterion;
import com.ngx.schooling.entities.Subject;
import com.ngx.schooling.repositories.CriterionRepository;
import com.ngx.schooling.requests.CriterionRequest;
import com.ngx.schooling.responses.show.CriterionResponse;
import org.springframework.transaction.annotation.Transactional;

@org.springframework.stereotype.Service
@Transactional
public class CriterionService extends Service<
    Criterion,
    Long,
    CriterionResponse,
    CriterionResponse,
    CriterionRequest,
    CriterionRepository> {

    @Override
    protected Criterion fromRequest(CriterionRequest request) {
        return fromRequest(new Criterion(), request);
    }
    @Override
    protected Criterion fromRequest(Criterion criterion, CriterionRequest request) {
        criterion.setName(request.getName());
        criterion.setReference(request.getReference());
        criterion.setSubject(Subject.builder().id(request.getSubjectId()).build());
        return criterion;
    }

    @Override
    protected CriterionResponse toBrowseResponse(Criterion criterion) {
        return CriterionResponse.fromEntity(criterion);
    }

    @Override
    protected CriterionResponse toShowResponse(Criterion criterion) {
        return CriterionResponse.fromEntity(criterion);
    }
}
