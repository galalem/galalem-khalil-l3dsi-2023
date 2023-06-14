package com.ngx.rh.services;

import com.ngx.rh.entities.Staff;
import com.ngx.rh.repositories.StaffRepository;
import com.ngx.rh.requests.StaffRequest;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("StaffService")
@Transactional
public class StaffService extends PersonService<Staff, StaffRepository, StaffRequest,
    com.ngx.rh.responses.browse.StaffResponse, com.ngx.rh.responses.show.StaffResponse> {

    @Override
    protected String getRole(Staff person) {
        return "STAFF";
    }
    @Override
    protected void createRelations(Staff person) {

    }
    @Override
    protected void updateRelations(Staff person, Staff original) {

    }

    @Override
    protected Staff fromRequest(StaffRequest staffRequest) {
        Staff staff = new Staff(super.getParentFromRequest(staffRequest));
        staff.setDateOfRecruitment(staffRequest.getDateOfRecruitment());
        staff.setTypeOfContract(staffRequest.getTypeOfContract());
        staff.setRole(staffRequest.getRole());
        staff.setFunction(staffRequest.getFunction());
        staff.setMailer(staffRequest.getMailer());
        return staff;
    }
    @Override
    protected com.ngx.rh.responses.browse.StaffResponse toBrowseResponse(Staff staff) {
        com.ngx.rh.responses.browse.StaffResponse response =
            new com.ngx.rh.responses.browse.StaffResponse(super.getParentBrowseResponse(staff));
        response.setDateOfRecruitment(staff.getDateOfRecruitment());
        response.setRole(staff.getRole());
        response.setFunction(staff.getFunction());
        return response;
    }
    @Override
    protected com.ngx.rh.responses.show.StaffResponse toShowResponse(Staff staff) {
        com.ngx.rh.responses.show.StaffResponse response =
            new com.ngx.rh.responses.show.StaffResponse(super.getParentShowResponse(staff));
        response.setDateOfRecruitment(staff.getDateOfRecruitment());
        response.setTypeOfContract(staff.getTypeOfContract());
        response.setRole(staff.getRole());
        response.setFunction(staff.getFunction());
        response.setMailer(staff.getMailer());
        return response;
    }
}
