package com.ngx.schooling.services;

import com.ngx.schooling.entities.Registration;
import com.ngx.schooling.repositories.StudentRepository;
import com.ngx.schooling.responses.show.StudentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository repository;


    public void associate(Long classId, Iterable<Long> studentIds) {
        for(Long id : studentIds)
            if (!repository.existsByClassIdAndStudentId(classId, id))
                repository.save(Registration.builder().classId(classId).studentId(id).build());
    }
    public void dissociate(Long classId, Iterable<Long> studentIds) {
        repository.deleteAllByClassIdAndStudentIdIn(classId, studentIds);
    }

    public void associateGroup(Long classId, Integer group, Iterable<Long> studentIds) {
        for(Long id : studentIds) {
            Optional<Registration> entity = repository.findByClassIdAndStudentId(classId, id);
            Registration registration = entity.orElse(Registration.builder().classId(classId).studentId(id).build());
            registration.setGroup(group);
            repository.save(registration);
        }
    }
    public void dissociateGroup(Long classId, Integer group, Iterable<Long> studentIds) {
        repository.ungroupAllByClassIdAndStudentIdIn(classId, group, studentIds);
    }

    public List<StudentResponse> findAllByClassId(Long classId) {
        return repository.findAllByClassId(classId).stream().map(StudentResponse::fromEntity).toList();
    }
}
