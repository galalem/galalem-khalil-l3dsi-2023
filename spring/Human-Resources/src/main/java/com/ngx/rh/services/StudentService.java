package com.ngx.rh.services;

import com.ngx.rh.entities.Parent;
import com.ngx.rh.entities.Student;
import com.ngx.rh.repositories.StudentRepository;
import com.ngx.rh.requests.StudentRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("StudentService")
@Transactional
public class StudentService extends PersonService<Student, StudentRepository, StudentRequest,
    com.ngx.rh.responses.browse.StudentResponse, com.ngx.rh.responses.show.StudentResponse> {

    @Override
    protected String getRole(Student person) {
        return "STUDENT";
    }
    @Override
    protected void createRelations(Student person) {

    }
    @Override
    protected void updateRelations(Student person, Student original) {

    }

    public List<String> birthdays() {
        return this.personRepository.findAllBirthdays().stream()
            .map(student -> student.getFirstName() + " " + student.getLastName()).toList();
    }

    @Override
    protected Student fromRequest(StudentRequest studentRequest) {
        Student student = new Student(super.getParentFromRequest(studentRequest));
        student.setUseParentAddress(studentRequest.isUseParentAddress());
        student.setMainParent(studentRequest.getMainParent());
        student.setFather(newParentWithId(studentRequest.getFatherId()));
        student.setMother(newParentWithId(studentRequest.getMotherId()));
        student.setTutor(newParentWithId(studentRequest.getTutorId()));
        return student;
    }
    private Parent newParentWithId(Long id) {
        if (id == null)
            return null;
        Parent parent = new Parent();
        parent.setId(id);
        return parent;
    }
    @Override
    protected com.ngx.rh.responses.browse.StudentResponse toBrowseResponse(Student student) {
        return new com.ngx.rh.responses.browse.StudentResponse(super.getParentBrowseResponse(student));
    }
    @Override
    protected com.ngx.rh.responses.show.StudentResponse toShowResponse(Student student) {
        com.ngx.rh.responses.show.StudentResponse response =
            new com.ngx.rh.responses.show.StudentResponse(super.getParentShowResponse(student));
        response.setUseParentAddress(student.isUseParentAddress());
        response.setMainParent(student.getMainParent());

        if ((student.getMainParent() == Student.ParentType.FATHER || student.getMainParent() == null) && student.getFather() != null) {
            response.setParentAddress(student.getFather().getAddress());
            response.setParentGPSCoordinates(student.getFather().getGpsCoordinates());
        }
        else if ((student.getMainParent() == Student.ParentType.MOTHER || student.getMainParent() == null) && student.getMother() != null) {
            response.setParentAddress(student.getMother().getAddress());
            response.setParentGPSCoordinates(student.getMother().getGpsCoordinates());
        }
        else if ((student.getMainParent() == Student.ParentType.TUTOR || student.getMainParent() == null) && student.getTutor() != null) {
            response.setParentAddress(student.getTutor().getAddress());
            response.setParentGPSCoordinates(student.getTutor().getGpsCoordinates());
        }

        ParentService parentService = new ParentService();

        if (student.getFather() != null) response.setFather(parentService.toBrowseResponse(student.getFather()));
        if (student.getMother() != null) response.setMother(parentService.toBrowseResponse(student.getMother()));
        if (student.getTutor() != null) response.setTutor(parentService.toBrowseResponse(student.getTutor()));

        return response;
    }
}
