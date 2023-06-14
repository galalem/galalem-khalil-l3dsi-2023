package com.ngx.news.services;

import com.ngx.news.entities.Attachment;
import com.ngx.news.entities.Post;
import com.ngx.news.exceptions.RestErrorException;
import com.ngx.news.repositories.AttachmentRepository;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@Transactional
public class AttachmentService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private AttachmentRepository repository;

    public void delete(Long postId, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token.substring(7));
        restTemplate.delete("http://storage/upload/post/"+postId+"/attachments", headers);
        repository.deleteWherePost(postId);
    }


    public void upload(List<MultipartFile> files, Long postId, String token) {
        for (MultipartFile file: files)
            this.upload(file, postId, token);
    }
    public void upload(MultipartFile attachment, Long postId, String token) {
        LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        File file = new File(System.getProperty("user.home") + "/ngxPost"+postId+"AttachmentRedirectTargetFile.tmp");
        try {
            attachment.transferTo(file);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestErrorException(500, "Internal Server Error", "Failed uploading file");
        }
        params.add("file", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(token);

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity =
            new HttpEntity<>(params, headers);

        String name = attachment.getOriginalFilename();
        if (Strings.isBlank(name))
            name = "attachment";

        Attachment entity = Attachment.builder().post(Post.builder().id(postId).build()).build();
        repository.save(entity);
        ResponseEntity<String> response = restTemplate.postForEntity("http://storage/upload/post/"+postId+"/attachments/"+entity.getId()+"/"+name, requestEntity, String.class);
        entity.setPath(response.getHeaders().get("Location").get(0));
        repository.save(entity);
        file.delete();
    }
}
