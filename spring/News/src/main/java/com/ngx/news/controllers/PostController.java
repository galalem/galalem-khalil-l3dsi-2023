package com.ngx.news.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngx.news.exceptions.BadRequestException;
import com.ngx.news.exceptions.RestErrorException;
import com.ngx.news.requests.CommentRequest;
import com.ngx.news.requests.PostRequest;
import com.ngx.news.requests.ReactionRequest;
import com.ngx.news.responses.CommentResponse;
import com.ngx.news.responses.PostResponse;
import com.ngx.news.responses.ReactionResponse;
import com.ngx.news.services.CommentService;
import com.ngx.news.services.PostService;
import com.ngx.news.services.ReactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private static final String[] REDACTORS = {"ADMIN", "TEACHER"};
    private final PostService service;
    private final CommentService commentService;
    private final ReactionService reactionService;

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a BrowseResponse list.
     * To use in index/listing page</p>
     * @return The list of people
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PostResponse> browse(@RequestParam(required = false, defaultValue = "0") Integer page) {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<?> roles = (List<?>) token.getClaimAsMap("realm_access").get("roles");

        return service.browse(page == null ? 0 : page, getUid(), roles.stream().anyMatch(role -> role.equals("ADMIN")));
    }

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of people as a BrowseResponse list.
     * To use in index/listing page</p>
     * @return The list of people
     */
    @GetMapping("/notifications")
    @ResponseStatus(HttpStatus.OK)
    public long browse() {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<?> roles = (List<?>) token.getClaimAsMap("realm_access").get("roles");
        return service.notifications(getUid(), roles.stream().anyMatch(role -> role.equals("ADMIN")));
    }

    /**
     * <h2>BREAD Basic Method - ADD</h2>
     * <p>Create a new person. To use in forms page</p>
     * @param request the new data
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @ModelAttribute PostRequest request) {

        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<?> roles = (List<?>) token.getClaimAsMap("realm_access").get("roles");

        boolean isRedactor = roles.stream()
            .anyMatch(role -> Arrays.asList(REDACTORS).contains((String) role));

        if (!isRedactor)
            throw new RestErrorException(403, "Forbidden", "User does NOT have permission to write posts");

        service.create(request, getUid(), token.getTokenValue());
    }

    /**
     * <h2>BREAD Basic Method - ADD</h2>
     * <p>Create a new person. To use in forms page</p>
     * @param request the new data
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void update(@Valid @ModelAttribute PostRequest request, @PathVariable Long id) {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (hasPermissionToEdit(id))
            service.update(id, request, getUid(), token.getTokenValue());
    }

    /**
     * <h2>BREAD Basic Method - DELETE</h2>
     * <p>Partially delete a person and move it to trash bin</p>
     * @param id the ID of the person in question
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        if (hasPermissionToEdit(id))
            service.delete(id);
    }


    @PatchMapping("/{id}/restore")
    @ResponseStatus(HttpStatus.OK)
    public void restore(@PathVariable Long id) {
        if (hasPermissionToEdit(id))
            service.restore(id);
    }
    /**
     * Permanently delete a person from trash bin
     * @param id the ID of the person in question
     */
    @DeleteMapping("/{id}/permanently")
    @ResponseStatus(HttpStatus.OK)
    public void deletePermanently(@PathVariable Long id) {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (hasPermissionToEdit(id))
            service.deletePermanently(id, token.getTokenValue());
    }

    /**
     * Check if the user can edit the post with the given id
     * @return true if user has permission
     * @throws BadRequestException if context can't be extracted from request
     * @throws RestErrorException if user does NOT have the permission
     */
    private boolean hasPermissionToEdit(Long id) throws BadRequestException, RestErrorException {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<?> roles = (List<?>) token.getClaimAsMap("realm_access").get("roles");

        boolean isAdmin = roles.stream().anyMatch(role -> role.equals("ADMIN"));

        if (!service.isOwner(getUid(), id) && !isAdmin)
            throw new RestErrorException(403, "Forbidden", "User is not the owner of the post");

        return true;
    }


    /* ========== Comments Handling ========== */

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of comments as a CommentResponse list.
     * To use when loading comments for a post</p>
     * @return The list of people
     */
    @GetMapping("/{id}/comments")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentResponse> browse(@PathVariable Long id) {
        return commentService.browse(id);
    }

    /**
     * <h2>BREAD Basic Method - ADD</h2>
     * <p>Create a new comment. To use when write new comment or answering other</p>
     * @param request the new data
     */
    @PostMapping(value = {"/{id}/comments", "/{id}/comments/{answering}"})
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @ModelAttribute CommentRequest request, @PathVariable(name = "id") Long postId,
                       @PathVariable(required = false, name = "answering") Long commentId) {
        commentService.create(request, postId, commentId, getUid());
    }


    @PutMapping("/{id}/comments/{comment}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@Valid @ModelAttribute CommentRequest request, @PathVariable(name = "id") Long postId,
                       @PathVariable(name = "comment") Long commentId) {

        if (!service.isOwner(getUid(), commentId))
            throw new RestErrorException(403, "Forbidden", "User is not the owner of the comment");

        commentService.update(commentId, request);
    }


    /**
     * Permanently delete a comment
     * @param commentId the ID of the comment in question
     */
    @DeleteMapping("/{id}/comments/{comment}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id") Long postId, @PathVariable(name = "comment") Long commentId) {
        if (hasPermissionToEditComment(commentId))
            commentService.delete(commentId);
    }

    /**
     * Check if the user can edit the comment with the given id
     * @return true if user has permission
     * @throws RestErrorException if user does NOT have the permission
     */
    private boolean hasPermissionToEditComment(Long id) throws RestErrorException {
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<?> roles = (List<?>) token.getClaimAsMap("realm_access").get("roles");

        boolean isAdmin = roles.stream().anyMatch(role -> role.equals("ADMIN"));

        if (!service.isOwner(getUid(), id) && !isAdmin)
            throw new RestErrorException(403, "Forbidden", "User is not the owner of the post");

        return true;
    }

    private String getUid(){
        Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return token.getClaims().get("sub").toString();
    }


    /* ========== Reactions Handling ========== */

    /**
     * <h2>BREAD Basic Method - BROWSE</h2>
     * <p>Get the list of reactions as a ReactionResponse list.
     * To use when loading reaction for a post</p>
     * @return The list of reactions
     */
    @GetMapping("/{id}/reactions")
    @ResponseStatus(HttpStatus.OK)
    public List<ReactionResponse> reactions(@PathVariable Long id) {
        return reactionService.browse(id);
    }


    @PutMapping("/{id}/reactions")
    @ResponseStatus(HttpStatus.OK)
    public void react(@Valid @ModelAttribute ReactionRequest request, @PathVariable(name = "id") Long postId) {
        reactionService.update(postId, getUid(), request);
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
