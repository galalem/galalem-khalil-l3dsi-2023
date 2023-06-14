package com.ngx.schooling.services;

import com.ngx.schooling.entities.Grading;
import com.ngx.schooling.repositories.GradingRepository;
import com.ngx.schooling.requests.GradingRequest;
import com.ngx.schooling.responses.show.GradingResponse;
import org.springframework.transaction.annotation.Transactional;

@org.springframework.stereotype.Service
@Transactional
public class GradingService extends Service<
    Grading,
    Long,
    GradingResponse,
    GradingResponse,
    GradingRequest,
    GradingRepository> {

    @Override
    protected Grading fromRequest(GradingRequest request) {
        return fromRequest(new Grading(), request);
    }
    @Override
    protected Grading fromRequest(Grading g, GradingRequest request) {
        g.setLabel(request.getLabel());
        g.setNumeric(request.isNumeric());
        g.setGrades(request.getGrades());
        return g;
    }

    @Override
    protected GradingResponse toBrowseResponse(Grading g) {
        return GradingResponse.fromEntity(g);
    }

    @Override
    protected GradingResponse toShowResponse(Grading g) {
        return GradingResponse.fromEntity(g);
    }

}
