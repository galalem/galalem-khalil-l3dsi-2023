package com.ngx.news.seeders;


import com.github.javafaker.Faker;
import com.ngx.news.entities.Comment;
import com.ngx.news.entities.Post;
import com.ngx.news.entities.Reaction;
import com.ngx.news.repositories.CommentRepository;
import com.ngx.news.services.UserService;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
@Transactional
public class CommentSeeder {

    private static final int MAX_COMMENT_RESPONSES = 4;

    @Autowired
    private CommentRepository repository;
    @Autowired
    private UserService users;

    private final Faker faker = new Faker(Locale.FRENCH);
    private final Random random = new Random();

    public void seed(Long postId, int count) {
        for (int i = 0; i < count; i++)
            seed(postId);
    }

    public void seed(Long id){
        this.seed(id, false);
    }
    public void seed(Long id, boolean isCommentId) {
        Comment comment = Comment.builder()
            .post(!isCommentId ? Post.builder().id(id).build() : null)
            .comment(isCommentId ? Comment.builder().id(id).build() : null)
            .content(faker.lorem().sentence(5, 10))
            .uid(randomUser())
            .build();
        repository.save(comment);

        if (random.nextInt(10) < 7)
            return;

        int responses = random.nextInt(MAX_COMMENT_RESPONSES);
        for (int i = 0; i < responses; i++)
            seed(comment.getId(), true);
    }

    private String randomUser(){
        List<UserRepresentation> list = users.list();
        return list.get(random.nextInt(list.size())).getId();
    }
}
