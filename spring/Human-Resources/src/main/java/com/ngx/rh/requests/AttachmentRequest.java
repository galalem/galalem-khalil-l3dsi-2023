package com.ngx.rh.requests;

import org.springframework.web.multipart.MultipartFile;

public class AttachmentRequest {
    private Long id;
    private String label;
    private String description;
    private MultipartFile file;
}
