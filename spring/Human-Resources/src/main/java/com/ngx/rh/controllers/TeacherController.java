package com.ngx.rh.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngx.rh.entities.Teacher;
import com.ngx.rh.exceptions.BadRequestException;
import com.ngx.rh.exceptions.RestErrorException;
import com.ngx.rh.repositories.TeacherRepository;
import com.ngx.rh.requests.TeacherRequest;
import com.ngx.rh.services.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController extends PersonController<Teacher, TeacherRepository, TeacherRequest,
    com.ngx.rh.responses.browse.TeacherResponse, com.ngx.rh.responses.show.TeacherResponse, TeacherService>{

    public TeacherController(TeacherService service) {
        super(service);
    }

//    private final TeacherService teacherService;
//
//    /**
//     * <h2>BREAD Basic Method - BROWSE</h2>
//     * <p>Get the list of teachers as a BrowseResponse list.
//     * To use in index/listing page</p>
//     * @return The list of teachers
//     */
//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public List<com.ngx.rh.responses.browse.TeacherResponse> index() {
//        return teacherService.index();
//    }
//
//    /**
//     * <h2>BREAD Basic Method - ADD</h2>
//     * <p>Create a new teacher. To use in forms page</p>
//     * @param teacherRequest the new data
//     * @param token the authorization token to forward for storage service
//     */
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public void create(@Valid @ModelAttribute TeacherRequest teacherRequest,
//                       @RequestHeader("authorization") String token) {
//        teacherService.create(teacherRequest, token);
//    }
//
//    /**
//     * <h2>BREAD Basic Method - READ</h2>
//     * <p>Get the details of a specific teacher as a ShowResponse.
//     * To use in details page</p>
//     * @param id the ID of the teacher in question
//     * @return the teacher data
//     */
//    @GetMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public com.ngx.rh.responses.show.TeacherResponse show(@PathVariable Long id) {
//        return teacherService.show(id);
//    }
//
//    /**
//     * <h2>BREAD Basic Method - EDIT</h2>
//     * <p>Update teacher data. To use in forms page</p>
//     * @param teacherRequest the new data
//     * @param id the ID of the teacher in question
//     * @param token the authorization token to forward for storage service
//     */
//    @PutMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public void update(@Valid @ModelAttribute TeacherRequest teacherRequest,
//                       @PathVariable Long id, @RequestHeader("authorization") String token) {
//        teacherService.update(teacherRequest, id, token);
//    }
//
//    /**
//     * <h2>BREAD Basic Method - DELETE</h2>
//     * <p>Partially delete a teacher and move it to trash bin</p>
//     * @param id the ID of the teacher in question
//     */
//    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public void delete(@PathVariable Long id) {
//        teacherService.delete(id);
//    }
//
//
//
//    /* ========== Entity Special Status Management ========== */
//
//    /**
//     * Mark a teacher as active
//     * @param id the ID of the teacher in question
//     */
//    @PatchMapping("/{id}/activate")
//    @ResponseStatus(HttpStatus.OK)
//    public void activate(@PathVariable Long id) {
//        teacherService.setActive(id, true);
//    }
//    /**
//     * Mark a teacher as inactive
//     * @param id the ID of the teacher in question
//     */
//    @PatchMapping("/{id}/deactivate")
//    @ResponseStatus(HttpStatus.OK)
//    public void deactivate(@PathVariable Long id) {
//        teacherService.setActive(id, false);
//    }
//    /**
//     * Mark a teacher as archived
//     * @param id the ID of the teacher in question
//     */
//    @PatchMapping("/{id}/archive")
//    @ResponseStatus(HttpStatus.OK)
//    public void archive(@PathVariable Long id) {
//        teacherService.setArchived(id, true);
//    }
//    /**
//     * Mark a teacher as unarchived
//     * @param id the ID of the teacher in question
//     */
//    @PatchMapping("/{id}/unarchive")
//    @ResponseStatus(HttpStatus.OK)
//    public void unarchive(@PathVariable Long id) {
//        teacherService.setArchived(id, false);
//    }
//    /**
//     * Restore a teacher from trash bin
//     * @param id the ID of the teacher in question
//     */
//    @PatchMapping("/{id}/restore")
//    @ResponseStatus(HttpStatus.OK)
//    public void restore(@PathVariable Long id) {
//        teacherService.restore(id);
//    }
//    /**
//     * Permanently delete a teacher from trash bin
//     * @param id the ID of the teacher in question
//     */
//    @DeleteMapping("/{id}/permanently")
//    @ResponseStatus(HttpStatus.OK)
//    public void deletePermanently(@PathVariable Long id) {
//        teacherService.deletePermanently(id);
//    }
//
//
//
//    /* ========== Mass Entity Handling ========== */
//
//    /**
//     * <h2>BREAD Basic Method - BROWSE</h2>
//     * <p>Get the list of teachers as a ShowResponse list.
//     * To use when exporting data</p>
//     * @return The list of detailed teachers
//     */
//    @GetMapping("/export")
//    @ResponseStatus(HttpStatus.OK)
//    public List<com.ngx.rh.responses.show.TeacherResponse> showAll(@RequestParam("ids") List<Long> ids) {
//        return teacherService.showAll(ids);
//    }
//
//    /**
//     * <h2>BREAD Basic Method - ADD</h2>
//     * <p>Import new teachers</p>
//     * @param teacherRequests the list of new data to import
//     * @param token the authorization token to forward for storage service
//     */
//    @GetMapping("/import")
//    @ResponseStatus(HttpStatus.CREATED)
//    public void createAll(@Valid @ModelAttribute List<TeacherRequest> teacherRequests,
//                       @RequestHeader("authorization") String token) {
//        teacherService.createAll(teacherRequests, token);
//    }
//    /**
//     * Mark teachers as active
//     * @param ids the list of IDs of the teachers in question
//     */
//    @PatchMapping("/activate")
//    @ResponseStatus(HttpStatus.OK)
//    public void activateAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.setAllActive(ids, true);
//    }
//    /**
//     * Mark teachers as inactive
//     * @param ids the list of IDs of the teachers in question
//     */
//    @PatchMapping("/deactivate")
//    @ResponseStatus(HttpStatus.OK)
//    public void deactivateAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.setAllActive(ids, false);
//    }
//    /**
//     * Mark teachers as archived
//     * @param ids the list of IDs of the teachers in question
//     */
//    @PatchMapping("/archive")
//    @ResponseStatus(HttpStatus.OK)
//    public void archiveAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.setAllArchived(ids, true);
//    }
//    /**
//     * Mark teachers as unarchived
//     * @param ids the list of IDs of the teachers in question
//     */
//    @PatchMapping("/unarchive")
//    @ResponseStatus(HttpStatus.OK)
//    public void unarchiveAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.setAllArchived(ids, false);
//    }
//    /**
//     * Restore teachers from trash bin
//     * @param ids the list of IDs of the teachers in question
//     */
//    @PatchMapping("/restore")
//    @ResponseStatus(HttpStatus.OK)
//    public void restoreAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.restoreAll(ids);
//    }
//    /**
//     * Permanently delete teachers from trash bin
//     * @param ids the list of IDs of the teachers in question
//     */
//    @DeleteMapping("/permanently")
//    @ResponseStatus(HttpStatus.OK)
//    public void deletePermanentlyAll(@RequestParam("ids") List<Long> ids) {
//        teacherService.deletePermanentlyAll(ids);
//    }
//
//    /* ========== Error Handling ========== */
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(
//        MethodArgumentNotValidException ex) {
//        ex.printStackTrace();
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(BadRequestException.class)
//    public Map<String, String> handleBadRequestExceptions (
//        BadRequestException ex) {
//        ex.printStackTrace();
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, String> map = null;
//        try { map = mapper.readValue(ex.getMessage(), Map.class); }
//        catch (Exception e) { e.printStackTrace(); throw new RestErrorException(500, "Internal Server Error", e.getMessage()); }
//        return map;
//    }
//
//    @ExceptionHandler(RestErrorException.class)
//    public ResponseEntity<String> handleRestErrorExceptions(
//        RestErrorException ex) {
//        ex.printStackTrace();
//        return ResponseEntity.status(ex.getStatus()).body(ex.getMessage());
//    }
}
