package com.ngx.news.requests;

import com.ngx.news.entities.Post;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Calendar;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostRequest {

    private List<Long> targetIds;
    private List<MultipartFile> attachments;
    private Post.Target target;
    @NotBlank(message = "le champ \"Titre\" est obligatoire")
    private String title;
    @NotBlank(message = "le champ \"Contenu\" est obligatoire")
    private String content;
    private boolean pinned;
    private boolean reactionsEnabled = true;
    private boolean commentsEnabled = true;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Calendar createdAt;
}
