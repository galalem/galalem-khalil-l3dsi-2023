package com.ngx.news.services;

import com.ngx.news.entities.Post;
import com.ngx.news.entities.Reaction;
import com.ngx.news.entities.Reaction.ReactionType;
import com.ngx.news.entities.ReactionId;
import com.ngx.news.entities.ReactionTypeCountEntry;
import com.ngx.news.repositories.ReactionRepository;
import com.ngx.news.requests.ReactionRequest;
import com.ngx.news.responses.PostReactionsResponse;
import com.ngx.news.responses.ReactionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReactionService {
    @Autowired
    private UserService userService;
    @Autowired
    private ReactionRepository repository;


    public List<ReactionResponse> browse(Long postId) {
        return repository.findAllByPost(postId).stream().map(this::toResponse).toList();
    }

    /**
     * Count the number of each type of reaction of a given post
     * @param postId the post ID
     * @return the number of reactions
     */
    public PostReactionsResponse stats(Long postId) {
        Map<ReactionType, Long> entries = repository.countPerTypeForPost(postId).stream()
            .collect(Collectors.toMap(ReactionTypeCountEntry::getEnumKey, ReactionTypeCountEntry::getValue));
        PostReactionsResponse response = PostReactionsResponse.builder()
            .like(entries.getOrDefault(ReactionType.LIKE, 0L).intValue())
            .hate(entries.getOrDefault(ReactionType.HATE, 0L).intValue())
            .haha(entries.getOrDefault(ReactionType.HAHA, 0L).intValue())
            .wow(entries.getOrDefault(ReactionType.WOW, 0L).intValue())
            .sad(entries.getOrDefault(ReactionType.SAD, 0L).intValue())
            .angry(entries.getOrDefault(ReactionType.ANGRY, 0L).intValue())
            .disinterested(entries.getOrDefault(ReactionType.DISINTERESTED, 0L).intValue())
            .build();
        response.setView(entries.getOrDefault(null, 0L).intValue()
            + response.getLike() + response.getHate() + response.getHaha() + response.getWow()
            + response.getSad() + response.getAngry() + response.getDisinterested());

        return response;
    }

    /**
     * Count the total number of views of a given post
     * @param postId the post ID
     * @return the number of views
     */
    public PostReactionsResponse viewsOnly(Long postId) {
        return PostReactionsResponse.builder()
            .view((int) repository.countAllForPost(postId))
            .build();
    }

    /**
     * Find the reaction by the given uid post_id
     * @param postId the post ID
     * @param uid the user ID
     * @return either the user has seen the post or not
     */
    public Optional<Reaction> findById(Long postId, String uid) {
        return repository.findById(new ReactionId(Post.builder().id(postId).build(), uid));
    }

    public void update(Long postId, String uid, ReactionRequest request) {
        ReactionId id = new ReactionId(Post.builder().id(postId).build(), uid);
        Reaction reaction = repository.findById(id).orElse(Reaction.builder()
            .post(Post.builder().id(postId).build()).uid(uid).build());
        reaction.setReaction(request.getReaction());
        repository.save(reaction);
    }


    private ReactionResponse toResponse(Reaction reaction) {
        return ReactionResponse.builder()
            .user(userService.getAuthor(reaction.getUid()))
            .reaction(reaction.getReaction())
            .build();
    }
}
