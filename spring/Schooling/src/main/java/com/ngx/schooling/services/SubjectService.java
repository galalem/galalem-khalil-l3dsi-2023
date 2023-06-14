package com.ngx.schooling.services;

import com.ngx.schooling.entities.Grading;
import com.ngx.schooling.entities.Subject;
import com.ngx.schooling.exceptions.RestException;
import com.ngx.schooling.repositories.SubjectRepository;
import com.ngx.schooling.requests.SessionRequest;
import com.ngx.schooling.requests.SubjectRequest;
import com.ngx.schooling.responses.browse.SubjectResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class SubjectService extends Service<
    Subject,
    Long,
    com.ngx.schooling.responses.browse.SubjectResponse,
    com.ngx.schooling.responses.show.SubjectResponse,
    SubjectRequest,
    SubjectRepository> {

    @Autowired
    SessionService sessionService;

    public List<SubjectResponse> index(Long classId) {
        return repository.findAllByClassId(classId).stream().map(this::toBrowseResponse).toList();
    }

    @Override
    public void create(SubjectRequest request) throws RestException {
        validateRequest(request);
        Subject entity = this.fromRequest(request);
        repository.save(entity);
        for (SessionRequest sr : request.getSessions())
            sessionService.create(sr, entity);
    }

    @Override
    public void update(SubjectRequest request, Long id) throws RestException {
        validateId(id);
        validateRequest(request, id);
        Subject entity = this.fromRequest(repository.findById(id).orElse(new Subject()), request);
        repository.save(entity);
        sessionService.purge(id);
        for (SessionRequest sr : request.getSessions())
            sessionService.create(sr, entity);
    }

    public void setGrading(Long subjectId, Long gradingId) {
        validateId(subjectId);
        Subject entity = repository.findById(subjectId).orElse(new Subject());
        entity.setGrading(Grading.builder().id(gradingId).build());
        repository.save(entity);
    }

    @Override
    protected Subject fromRequest(SubjectRequest request) {
        return fromRequest(new Subject(), request);
    }
    @Override
    protected Subject fromRequest(Subject subject, SubjectRequest request) {
        subject.setClassId(request.getClassId());
        subject.setTeacherId(request.getTeacherId());
        subject.setLabel(request.getLabel());
        subject.setColor(request.getColor());
        subject.setShared(request.getShared() == null || request.getShared());
        subject.setStudents(request.getStudents());
        return subject;
    }

    @Override
    protected com.ngx.schooling.responses.browse.SubjectResponse toBrowseResponse(Subject subject) {
        return com.ngx.schooling.responses.browse.SubjectResponse.fromEntity(subject);
    }

    @Override
    protected com.ngx.schooling.responses.show.SubjectResponse toShowResponse(Subject subject) {
        return com.ngx.schooling.responses.show.SubjectResponse.fromEntity(subject);
    }
}
