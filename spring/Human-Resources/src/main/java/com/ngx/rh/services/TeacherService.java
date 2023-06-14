package com.ngx.rh.services;

import com.ngx.rh.entities.Teacher;
import com.ngx.rh.repositories.AddressRepository;
import com.ngx.rh.repositories.GPSCoordinatesRepository;
import com.ngx.rh.repositories.PersonRepository;
import com.ngx.rh.repositories.TeacherRepository;
import com.ngx.rh.requests.TeacherRequest;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service("TeacherService")
@Transactional
public class TeacherService extends PersonService<Teacher, TeacherRepository, TeacherRequest,
    com.ngx.rh.responses.browse.TeacherResponse, com.ngx.rh.responses.show.TeacherResponse> {

    @Override
    protected String getRole(Teacher person) {
        return "TEACHER";
    }
    @Override
    protected void createRelations(Teacher person) {

    }
    @Override
    protected void updateRelations(Teacher person, Teacher original) {

    }

    public List<String> birthdays() {
        return this.personRepository.findAllBirthdays().stream()
            .map(teacher -> stringifyCivility(teacher.getCivility(), true) + " " + teacher.getFirstName() + " " + teacher.getLastName()).toList();
    }

    @Override
    protected Teacher fromRequest(TeacherRequest teacherRequest) {
        Teacher teacher = new Teacher(super.getParentFromRequest(teacherRequest));
        teacher.setDateOfRecruitment(teacherRequest.getDateOfRecruitment());
        teacher.setTypeOfContract(teacherRequest.getTypeOfContract());
        teacher.setRank(teacherRequest.getRank());
        teacher.setTitle(teacherRequest.getTitle());
        return teacher;
    }
    @Override
    protected com.ngx.rh.responses.browse.TeacherResponse toBrowseResponse(Teacher teacher) {
        com.ngx.rh.responses.browse.TeacherResponse response =
            new com.ngx.rh.responses.browse.TeacherResponse(super.getParentBrowseResponse(teacher));
        response.setDateOfRecruitment(teacher.getDateOfRecruitment());
        response.setRank(teacher.getRank());
        return response;
    }
    @Override
    protected com.ngx.rh.responses.show.TeacherResponse toShowResponse(Teacher teacher) {
        com.ngx.rh.responses.show.TeacherResponse response =
            new com.ngx.rh.responses.show.TeacherResponse(super.getParentShowResponse(teacher));
        response.setDateOfRecruitment(teacher.getDateOfRecruitment());
        response.setTypeOfContract(teacher.getTypeOfContract());
        response.setRank(teacher.getRank());
        response.setTitle(teacher.getTitle());
        return response;
    }
}
