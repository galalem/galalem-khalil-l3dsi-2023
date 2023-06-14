package com.ngx.news.seeders;


import com.ngx.news.entities.Post;
import com.ngx.news.entities.Reaction;
import com.ngx.news.repositories.ReactionRepository;
import com.ngx.news.services.UserService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@Transactional
public class ReactionSeeder {

    @Autowired
    private ReactionRepository repository;
    @Autowired
    private UserService users;

    private final Random random = new Random();

    public void seed(Long postId, int count) {
        for (int i = 0; i < count; i++)
            if (!seed(postId))
                break;
    }

    public boolean seed(Long id) {
        String uid = randomUser(id);
        if (uid == null)
            return false;

        Reaction reaction = Reaction.builder()
            .post(Post.builder().id(id).build())
            .reaction(randomReaction())
            .uid(uid)
            .build();

        try {
            repository.save(reaction);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return true;
    }

    private String randomUser(Long postId){
        final List<String> reactedUsers = repository.getUidForPost(postId);
        System.out.println("========================================================================================");
        System.out.println(reactedUsers);
        List<UserRepresentation> list = users.list().stream()
            .filter(user -> !existsInList(user.getId(), reactedUsers)).toList();
        if (list.size() == 0)
            return null;
        return list.get(random.nextInt(list.size())).getId();
    }
    private Reaction.ReactionType randomReaction(){
        if (random.nextInt(10) > 5)
            return Reaction.ReactionType.values()[random.nextInt(Reaction.ReactionType.values().length)];
        return null;
    }
    private boolean existsInList(final String value, List<String> list){
        return list.stream().anyMatch(item -> item.equals(value));
    }
}
