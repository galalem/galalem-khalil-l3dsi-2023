package com.ngx.news.seeders;

import com.ngx.news.entities.Attachment;
import com.ngx.news.entities.Post;
import com.ngx.news.repositories.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@Transactional
public class AttachmentSeeder {

    private static final String[] EXTENSIONS = {".xls", ".pdf", ".doc", ".txt", ".pdf", ".zip", ".csv", ".html"};

    @Autowired
    private AttachmentRepository repository;
    private final Random random = new Random();

    public void seed(Long postId, int count, boolean images) {
        for (int i = 0; i < count; i++)
            seed(postId, images);
    }

    public void seed(Long postId, boolean image) {
        Attachment attachment = Attachment.builder().post(Post.builder().id(postId).build()).build();
        repository.save(attachment);
        attachment.setPath(image ? "assets/img/pixabay/img-" + (random.nextInt(21) + 1) + ".jpg" : "storage/post/"+postId+"/attachments/"+attachment.getId()+"/attachment"+EXTENSIONS[random.nextInt(EXTENSIONS.length)]);
        repository.save(attachment);
    }
}
