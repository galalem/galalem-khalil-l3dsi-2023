package com.ngx.schooling.services;

import com.ngx.schooling.entities.Session;
import com.ngx.schooling.entities.Subject;
import com.ngx.schooling.exceptions.RestException;
import com.ngx.schooling.repositories.SessionRepository;
import com.ngx.schooling.requests.SessionRequest;
import com.ngx.schooling.responses.show.SessionResponse;
import com.ngx.schooling.responses.show.StudentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SessionService {

    @Autowired
    protected SessionRepository repository;
    @Autowired
    protected StudentService studentService;

    public void create(SessionRequest request, Subject subject) {
        request.setPlace(request.getPlace().trim().toLowerCase());
        List<Session> overlappingSessions = repository.overlaps(request.getStart(), request.getEnd(), 1L);
        for(Session session : overlappingSessions) {

            // if place is taken
            if (session.getPlace().equals(request.getPlace()))
                throw new SessionCreationException(request.getStart(), request.getEnd(), "la salle est «" + request.getPlace() + "» occupée");

            // skip if fortnight does not collide
            if (session.getFortnight() != null && request.getFortnight() != null && !session.getFortnight().equals(request.getFortnight()))
                continue;

            Subject sessionSubject = session.getSubject();

            // check if teacher is busy
            Long teacherId = sessionSubject.getTeacherId();
            if (teacherId != null && teacherId.equals(subject.getTeacherId()))
                throw new SessionCreationException(request.getStart(), request.getEnd(), "l'enseignant aura un conflit avec une autre séance");

            // check if students are busy
            List<StudentResponse> students1 = studentService
                .findAllByClassId(subject.getClassId()).stream()
                .filter(s -> (subject.isShared() || subject.getStudents().contains(s.getId())) && (request.getGroup() == null || request.getGroup().equals(s.getGroup())))
                .toList(); // List of students concerned with the target session
            List<StudentResponse> students2 = studentService
                .findAllByClassId(sessionSubject.getClassId()).stream()
                .filter(s -> (sessionSubject.isShared() || sessionSubject.getStudents().contains(s.getId())) && (session.getGroup() == null || session.getGroup().equals(s.getGroup())))
                .toList(); // List of students concerned with the comparing session

            if (students1.stream().anyMatch(studentResponse ->
                    students2.stream().anyMatch(sr -> studentResponse.getId().equals(sr.getId()))))
                throw new SessionCreationException(request.getStart(), request.getEnd(), "un ou plusieurs élèves auront un conflit avec une autre séance");
        }

        repository.save(Session.builder()
            .place(request.getPlace())
            .start(request.getStart())
            .end(request.getEnd())
            .fortnight(request.getFortnight())
            .group(request.getGroup())
            .subject(subject)
            .build());
    }

    /**
     * Get rid of all sessions related to subject
     * @param subjectId the id of the subject
     */
    public void purge(Long subjectId) {
        repository.deleteBySubjectId(subjectId);
    }

    public boolean isGroupAndFortnightCollide(Session session, SessionRequest request) {
        if (session.getGroup() != null && request.getGroup() != null && !session.getGroup().equals(request.getGroup()))
            return false;

        // Check if fortnights are different or null
        if (session.getFortnight() != null && request.getFortnight() != null && !session.getFortnight().equals(request.getFortnight()))
            return false;

        return true;
    }

    public List<SessionResponse> getForClass(Long id) {
        return repository.findAllByClass(id).stream().map(SessionResponse::fromEntity).toList();
    }
    public List<SessionResponse> getForStudent(Long id, Long period) {
        return repository.findAllByStudent(period, id).stream().map(SessionResponse::fromEntity).toList();
    }
    public List<SessionResponse> getForTeacher(Long id, Long period) {
        return repository.findAllByTeacher(period, id).stream().map(SessionResponse::fromEntity).toList();
    }
    public List<SessionResponse> getForPlace(String place, Long period) {
        return repository.findAllByPlace(period, place).stream().map(SessionResponse::fromEntity).toList();
    }
    public List<Long> getDistinctClasses(Long period) {
        return repository.findAllDistinctClasses(period);
    }
    public List<Long> getDistinctStudents(Long period) {
        return repository.findAllDistinctStudents(period);
    }
    public List<Long> getDistinctTeachers(Long period) {
        return repository.findAllDistinctTeachers(period);
    }
    public List<String> getDistinctPlaces(Long period) {
        return repository.findAllDistinctPlaces(period);
    }

    public static class SessionCreationException extends RestException {

        private static String stringify(Integer start, Integer end, String reason){
            final String[] days = {"Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"};
            return String.format("Impossible de créer la séance du %s de %02d:%02d à %02d:%02d pour la raison suivante: %s", days[start / 1440],
                (start % 1440) / 60, start % 60,
                (end % 1440) / 60, end % 60,
                reason);
        }

        public SessionCreationException(Integer start, Integer end, String reason) {
            super(400, stringify(start, end, reason));
        }

        public SessionCreationException(Integer start, Integer end, String reason, Throwable cause) {
            super(400, stringify(start, end, reason), cause);
        }
    }
}
