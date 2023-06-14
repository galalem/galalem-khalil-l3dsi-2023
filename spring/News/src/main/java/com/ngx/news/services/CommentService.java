package com.ngx.news.services;

import com.ngx.news.entities.Comment;
import com.ngx.news.entities.Post;
import com.ngx.news.exceptions.RestErrorException;
import com.ngx.news.repositories.CommentRepository;
import com.ngx.news.requests.CommentRequest;
import com.ngx.news.responses.CommentResponse;
import com.ngx.news.responses.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    private UserService userService;
    @Autowired
    private CommentRepository repository;


    /**
     * Count the number of each type of reaction of a given post
     * @param postId the post ID
     * @return the number of reactions
     */
    public Integer countByPost(Long postId) {
        return (int) repository.countForPost(postId);
    }

    public List<CommentResponse> browse(Long postId) {
        return repository.findAllByPost(postId).stream().map(this::toResponse).toList();
    }

//    public boolean isOwner(String uid, Long id){
//        return postRepository.isOwner(uid, id);
//    }

    public void create(CommentRequest request, Long postId, Long commentId, String uid) {
        Comment comment = Comment.builder()
            .content(request.getContent())
            .uid(uid)
            .post(Post.builder().id(postId).build())
            .comment(commentId == null ? null : Comment.builder().id(commentId).build())
            .build();
        repository.save(comment);
    }

    public void update(Long id, CommentRequest request) throws RestErrorException {
        Comment comment = repository.findById(id).orElse(null);
        if (comment == null)
            throw new RestErrorException(404, "Not Found", "Could not find comment with id = "+id);
        comment.setContent(request.getContent());
        repository.save(comment);
    }

    public void delete(Long id) {
        repository.pruneChildren(id);
        repository.deleteById(id);
    }

    private CommentResponse toResponse(Comment comment) {
        return CommentResponse.builder()
            .id(comment.getId())
            .author(userService.getAuthor(comment.getUid()))
            .content(comment.getContent())
            .createdAt(comment.getCreatedAt())
            .updatedAt(comment.getUpdatedAt())
            .responses(comment.getResponses().stream().map(this::toResponse).toList())
            .build();
    }
}
