package com.ngx.news.services;

import com.ngx.news.entities.*;
import com.ngx.news.exceptions.RestErrorException;
import com.ngx.news.repositories.PostRepository;
import com.ngx.news.repositories.UserDeviceRepository;
import com.ngx.news.requests.PostRequest;
import com.ngx.news.responses.PostReactionsResponse;
import com.ngx.news.responses.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {

    private static final int PAGE_SIZE = 20;
    private static final int MAX_DAYS_NOTIFICATIONS_LAST = 15;


    @Autowired
    private UserService userService;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ReactionService reactionService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserDeviceRepository userDeviceRepository;

    public List<PostResponse> browse(int page, String uid, boolean isAdmin) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "created_at"));
        List<Post> posts = postRepository.browse(pageable, uid, isAdmin);
        return posts.stream().map(post -> toResponse(post, uid)).toList();
    }
    public long notifications(String uid, boolean isAdmin) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, - MAX_DAYS_NOTIFICATIONS_LAST);
        return postRepository.notifications(uid, calendar.getTime(), isAdmin);
    }

    public boolean isOwner(String uid, Long id){
        return postRepository.isOwner(uid, id);
    }

    public void create(PostRequest request, String uid, String token) throws RestErrorException {
        Post post = fromRequest(request, uid);
        if (post.getCreatedAt() == null) post.setCreatedAt(Calendar.getInstance());
        postRepository.save(post);
        if (request.getAttachments() != null) attachmentService.upload(request.getAttachments(), post.getId(), token);
        System.out.println("Title: "+post.getTitle());
        notificationService.push(post.getTitle(), "Vous avez une nouvelle actualité", post.getTarget() == Post.Target.PUBLIC ? null :
            userDeviceRepository.findAllByUid(post.getPerson().stream().map(Person::getUid).toList())
                .stream().map(UserDevice::getDevice).toList());
    }

    public void update(Long id, PostRequest request, String uid, String token) throws RestErrorException {
        Optional<Post> original = postRepository.findById(id);
        if (original.isEmpty())
            throw new RestErrorException(404, "Not Found", "Post not found");
        Post post = fromRequest(request, uid);
        post.setId(id);
        if (post.getCreatedAt() == null) post.setCreatedAt(original.get().getCreatedAt());

        postRepository.save(post);
        if (request.getAttachments() != null) attachmentService.upload(request.getAttachments(), post.getId(), token);
    }

    public void delete(Long id) {
        postRepository.markAsDeleted(id, true);
    }

    public void restore(Long id) {
        postRepository.markAsDeleted(id, false);
    }

    public void deletePermanently(Long id, String token) {
        attachmentService.delete(id, token);
        postRepository.deleteById(id);
    }

    private Post fromRequest(PostRequest request, String uid) {
        Post post = Post.builder()
            .target(request.getTarget())
            .title(request.getTitle())
            .content(request.getContent())
            .uid(uid)
            .pinned(request.isPinned())
            .reactionsEnabled(request.isReactionsEnabled())
            .commentsEnabled(request.isCommentsEnabled())
            .deleted(false)
            .createdAt(request.getCreatedAt())
            .build();

        if (request.getTargetIds() != null)
            post.setPerson(request.getTargetIds().stream().map(id -> Person.builder().id(id).build()).toList());
        System.out.println(request.getTargetIds());
        return post;
    }
    private PostResponse toResponse(Post post, String uid) {
        PostReactionsResponse reactions = post.isReactionsEnabled() ?
            reactionService.stats(post.getId()) : reactionService.viewsOnly(post.getId());
        if (post.isCommentsEnabled())
            reactions.setComment(commentService.countByPost(post.getId()));
        Optional<Reaction> userReaction = reactionService.findById(post.getId(), uid);
        return PostResponse.builder()
            .id(post.getId())
            .target(post.getTarget())
            .author(userService.getAuthor(post.getUid()))
            .title(post.getTitle())
            .content(post.getContent())
            .userReaction(userReaction.orElse(new Reaction()).getReaction())
            .userHasSeen(userReaction.isPresent())
            .pinned(post.isPinned())
            .commentsEnabled(post.isCommentsEnabled())
            .reactionsEnabled(post.isReactionsEnabled())
            .createdAt(post.getCreatedAt())
            .updatedAt(post.getUpdatedAt())
            .attachments(post.getAttachments().stream().map(Attachment::getPath).toList())
            .reactions(reactions)
            .build();
    }
}
