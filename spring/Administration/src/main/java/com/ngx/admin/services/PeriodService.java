package com.ngx.admin.services;

import com.ngx.admin.entities.Department;
import com.ngx.admin.entities.Period;
import com.ngx.admin.exceptions.RestException;
import com.ngx.admin.repositories.PeriodRepository;
import com.ngx.admin.requests.PeriodRequest;
import com.ngx.admin.responses.show.PeriodResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Service
@Transactional
public class PeriodService extends Service<
    Period,
    Long,
    PeriodResponse,
    PeriodResponse,
    PeriodRequest,
    PeriodRepository> {

    public void create(List<PeriodRequest> requests) throws RestException {
        for(PeriodRequest request : requests)
            this.create(request);
    }

    @Override
    protected Period fromRequest(PeriodRequest request) {
        return fromRequest(new Period(), request);
    }
    @Override
    protected Period fromRequest(Period entity, PeriodRequest request) {
        entity.setYear(request.getYear());
        entity.setDepartment(Department.builder().id(request.getDepartmentId()).build());
        entity.setStartsAt(request.getStartsAt());
        entity.setEndsAt(request.getEndsAt());
        return entity;
    }

    @Override
    protected Map<String, String> extractErrors(PeriodRequest request, Long id) {
        if (!repository.overlaps(request.getYear(), request.getDepartmentId(), request.getStartsAt(), request.getEndsAt(), id))
            return null;
        Map<String, String> errors = new HashMap<>();
        errors.put("error", "Une ou plusieurs periodes de l'année scolaire «" + request.getYear() + "» relativent au département N°"+request.getDepartmentId()+" se chevauchent. Veuillez assurer que toute");
        return errors;
    }

    protected PeriodResponse toResponse(Period entity) {
        return PeriodResponse.builder()
            .id(entity.getId())
            .year(entity.getYear())
            .departmentId(entity.getDepartment().getId())
            .startsAt(entity.getStartsAt())
            .endsAt(entity.getEndsAt())
            .build();
    }

    @Override
    @Deprecated
    protected PeriodResponse toBrowseResponse(Period entity) {
        return this.toResponse(entity);
    }

    @Override
    @Deprecated
    protected PeriodResponse toShowResponse(Period entity) {
        return this.toResponse(entity);
    }

}
