package com.ngx.news.seeders;


import com.github.javafaker.Faker;
import com.ngx.news.entities.Post;
import com.ngx.news.repositories.PostRepository;
import com.ngx.news.services.UserService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
@Transactional
public class PostSeeder {
    private static final int COUNT = 150;

    @Autowired
    private PostRepository repository;
    @Autowired
    private UserService users;

    @Autowired
    private AttachmentSeeder attachmentSeeder;
    @Autowired
    private CommentSeeder commentSeeder;
    @Autowired
    private ReactionSeeder reactionSeeder;

    private final Faker faker = new Faker(Locale.FRENCH);
    private final Random random = new Random();

    public void seed() {
        for (int i = 0; i < COUNT; i++)
            seedSingle();
    }

    public void seedSingle() {
        Post post = Post.builder()
            .title(faker.lorem().sentence(3, 6))
            .content(faker.lorem().sentence(10, 50))
            .uid(randomUser())
            .target(Post.Target.PUBLIC)
            .pinned(random.nextInt(100) > 97)
            .reactionsEnabled(random.nextInt(100) < 92)
            .commentsEnabled(random.nextInt(100) < 92)
            .deleted(false)
            .build();
        repository.save(post);

        if (post.isCommentsEnabled())
            commentSeeder.seed(post.getId(), random.nextInt(20));
        if (post.isReactionsEnabled())
            reactionSeeder.seed(post.getId(), random.nextInt(80));
        if (random.nextBoolean())
            attachmentSeeder.seed(post.getId(), random.nextInt(5), random.nextBoolean());

    }

    private String randomUser(){
        List<UserRepresentation> list;
        if (random.nextInt(30) > 20)
            list = users.withRole("TEACHER");
        else
            list = users.withRole("ADMIN");
        return list.get(random.nextInt(list.size())).getId();
    }
}
