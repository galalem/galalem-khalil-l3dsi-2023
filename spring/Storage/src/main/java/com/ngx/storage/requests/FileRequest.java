package com.ngx.storage.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileRequest {

    private MultipartFile file;
    private String path;
    private boolean overwrite = false;
    private String name;
}
