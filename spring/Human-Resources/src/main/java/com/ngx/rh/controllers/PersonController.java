package com.ngx.rh.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngx.rh.exceptions.BadRequestException;
import com.ngx.rh.exceptions.RestErrorException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public abstract class PersonController<
    T extends com.ngx.rh.entities.Person,
    REP extends com.ngx.rh.repositories.PersonRepository<T>,
    R extends com.ngx.rh.requests.PersonRequest,
    BR extends com.ngx.rh.responses.browse.PersonResponse, 
    SR extends com.ngx.rh.responses.show.PersonResponse, 
    S extends com.ngx.rh.services.PersonService<T, REP, R, BR, SR>> {

    protected final S service;

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a BrowseResponse list.
     * To use in index/listing page</p>
     * @return The list of people
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BR> index() {
        return service.index();
    }

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a StatsResponse list.
     * To use in dashboard/analytics page</p>
     * @return The list of people stats
     */
    @GetMapping("/stats")
    @ResponseStatus(HttpStatus.OK)
    public List<com.ngx.rh.responses.stats.PersonResponse> stats() {
        return service.stats();
    }

    /**
     * <h2>NON - BREAD Basic</h2>
     * <p>Get the total number of people.
     * To use in dashboard/analytics page</p>
     * @return The count of people
     */
    @GetMapping("/count")
    @ResponseStatus(HttpStatus.OK)
    public long count() {
        return service.count();
    }

    /**
     * <h2>BREAD Basic Method - ADD</h2>
     * <p>Create a new person. To use in forms page</p>
     * @param request the new data
     * @param token the authorization token to forward for storage service
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @ModelAttribute R request,
                       @RequestHeader("authorization") String token) {
        service.create(request, token);
    }

    /**
     * <h2>BREAD Basic Method - READ</h2>
     * <p>Get the details of a specific person as a ShowResponse.
     * To use in details page</p>
     * @param id the ID of the person in question
     * @return the person data
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public SR show(@PathVariable Long id) {
        return service.show(id);
    }

    /**
     * <h2>BREAD Basic Method - EDIT</h2>
     * <p>Update person data. To use in forms page</p>
     * @param request the new data
     * @param id the ID of the person in question
     * @param token the authorization token to forward for storage service
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@Valid @ModelAttribute R request,
                       @PathVariable Long id, @RequestHeader("authorization") String token) {
        System.out.println("UPDATING");
        service.update(request, id, token);
    }

    /**
     * <h2>BREAD Basic Method - DELETE</h2>
     * <p>Partially delete a person and move it to trash bin</p>
     * @param id the ID of the person in question
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }



    /* ========== Entity Special Status Management ========== */

    /**
     * Mark a person as active
     * @param id the ID of the person in question
     */
    @PatchMapping("/{id}/activate")
    @ResponseStatus(HttpStatus.OK)
    public void activate(@PathVariable Long id) {
        service.setActive(id, true);
    }
    /**
     * Mark a person as inactive
     * @param id the ID of the person in question
     */
    @PatchMapping("/{id}/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public void deactivate(@PathVariable Long id) {
        service.setActive(id, false);
    }
    /**
     * Mark a person as archived
     * @param id the ID of the person in question
     */
    @PatchMapping("/{id}/archive")
    @ResponseStatus(HttpStatus.OK)
    public void archive(@PathVariable Long id) {
        service.setArchived(id, true);
    }
    /**
     * Mark a person as unarchived
     * @param id the ID of the person in question
     */
    @PatchMapping("/{id}/unarchive")
    @ResponseStatus(HttpStatus.OK)
    public void unarchive(@PathVariable Long id) {
        service.setArchived(id, false);
    }
    /**
     * Restore a person from trash bin
     * @param id the ID of the person in question
     */
    @PatchMapping("/{id}/restore")
    @ResponseStatus(HttpStatus.OK)
    public void restore(@PathVariable Long id) {
        service.restore(id);
    }
    /**
     * Permanently delete a person from trash bin
     * @param id the ID of the person in question
     */
    @DeleteMapping("/{id}/permanently")
    @ResponseStatus(HttpStatus.OK)
    public void deletePermanently(@PathVariable Long id) {
        service.deletePermanently(id);
    }



    /* ========== Mass Entity Handling ========== */

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a BrowseResponse list.
     * To use when retrieving data</p>
     * @return The list of people from ids
     */
    @GetMapping(params = {"ids"})
    @ResponseStatus(HttpStatus.OK)
    public List<BR> index(@RequestParam("ids") List<Long> ids) {
        return service.index(ids);
    }

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a ShowResponse list.
     * To use when exporting data</p>
     * @return The list of detailed people
     */
    @GetMapping("/export")
    @ResponseStatus(HttpStatus.OK)
    public List<SR> showAll(@RequestParam("ids") List<Long> ids) {
        return service.showAll(ids);
    }

    /**
     * <h2>BREAD Basic Method - ADD</h2>
     * <p>Import new people</p>
     * @param requests the list of new data to import
     * @param token the authorization token to forward for storage service
     */
    @PostMapping("/import")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAll(List<@Valid R> requests,
                       @RequestHeader("authorization") String token) {
        service.createAll(requests, token);
    }
    /**
     * Mark people as active
     * @param ids the list of IDs of the people in question
     */
    @PatchMapping("/activate")
    @ResponseStatus(HttpStatus.OK)
    public void activateAll(@RequestParam("ids") List<Long> ids) {
        service.setAllActive(ids, true);
    }
    /**
     * Mark people as inactive
     * @param ids the list of IDs of the people in question
     */
    @PatchMapping("/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public void deactivateAll(@RequestParam("ids") List<Long> ids) {
        service.setAllActive(ids, false);
    }
    /**
     * Mark people as archived
     * @param ids the list of IDs of the people in question
     */
    @PatchMapping("/archive")
    @ResponseStatus(HttpStatus.OK)
    public void archiveAll(@RequestParam("ids") List<Long> ids) {
        service.setAllArchived(ids, true);
    }
    /**
     * Mark people as unarchived
     * @param ids the list of IDs of the people in question
     */
    @PatchMapping("/unarchive")
    @ResponseStatus(HttpStatus.OK)
    public void unarchiveAll(@RequestParam("ids") List<Long> ids) {
        service.setAllArchived(ids, false);
    }
    /**
     * Restore people from trash bin
     * @param ids the list of IDs of the people in question
     */
    @PatchMapping("/restore")
    @ResponseStatus(HttpStatus.OK)
    public void restoreAll(@RequestParam("ids") List<Long> ids) {
        service.restoreAll(ids);
    }
    /**
     * <h2>BREAD Basic Method - DELETE</h2>
     * <p>Partially delete people and move them to trash bin</p>
     * @param ids the list of IDs of the people in question
     */
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAll(@RequestParam("ids") List<Long> ids) {
        service.deleteAll(ids);
    }
    /**
     * Permanently delete people from trash bin
     * @param ids the list of IDs of the people in question
     */
    @DeleteMapping("/permanently")
    @ResponseStatus(HttpStatus.OK)
    public void deletePermanentlyAll(@RequestParam("ids") List<Long> ids) {
        service.deletePermanentlyAll(ids);
    }

    /* ========== Error Handling ========== */

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
        MethodArgumentNotValidException ex) {
        ex.printStackTrace();
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public Map<String, String> handleBadRequestExceptions (
        BadRequestException ex) {
        ex.printStackTrace();
        service.deleteHangingPersonAccount();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map = null;
        try { map = mapper.readValue(ex.getMessage(), Map.class); }
        catch (Exception e) { e.printStackTrace(); throw new RestErrorException(500, "Internal Server Error", e.getMessage()); }
        return map;
    }

    @ExceptionHandler(RestErrorException.class)
    public ResponseEntity<String> handleRestErrorExceptions(
        RestErrorException ex) {
        ex.printStackTrace();
        return ResponseEntity.status(ex.getStatus()).body(ex.getMessage());
    }
}
