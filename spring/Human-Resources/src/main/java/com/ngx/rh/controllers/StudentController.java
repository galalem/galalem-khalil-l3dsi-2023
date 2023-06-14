package com.ngx.rh.controllers;

import com.ngx.rh.entities.Student;
import com.ngx.rh.repositories.StudentRepository;
import com.ngx.rh.requests.StudentRequest;
import com.ngx.rh.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController extends PersonController<Student, StudentRepository, StudentRequest,
    com.ngx.rh.responses.browse.StudentResponse, com.ngx.rh.responses.show.StudentResponse, StudentService>{
    public StudentController(StudentService service) {
        super(service);
    }

//    /**
//     * <h2>BREAD Basic Method - ADD</h2>
//     * <p>Create a new person. To use in forms page</p>
//     * @param request the new data
//     * @param token the authorization token to forward for storage service
//     */
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    @Override
//    public void create(@Valid @ModelAttribute StudentRequest request,
//                       @RequestHeader("authorization") String token) {
//        service.create(request, token);
//    }

//    /**
//     * <h2>BREAD Basic Method - EDIT</h2>
//     * <p>Update person data. To use in forms page</p>
//     * @param request the new data
//     * @param id the ID of the person in question
//     * @param token the authorization token to forward for storage service
//     */
//    @PutMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    @Override
//    public void update(@Valid @ModelAttribute StudentRequest request,
//                       @PathVariable Long id, @RequestHeader("authorization") String token) {
//        System.out.println("UPDATING");
//        service.update(request, id, token);
//    }

//    /**
//     * <h2>BREAD Basic Method - ADD</h2>
//     * <p>Import new people</p>
//     * @param requests the list of new data to import
//     * @param token the authorization token to forward for storage service
//     */
//    @PostMapping("/import")
//    @ResponseStatus(HttpStatus.CREATED)
//    @Override
//    public void createAll(List<@Valid StudentRequest> requests,
//                          @RequestHeader("authorization") String token) {
//        service.createAll(requests, token);
//    }
}
