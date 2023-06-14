package com.ngx.storage.controllers;

import com.ngx.storage.exceptions.StorageFileIUploadException;
import com.ngx.storage.exceptions.StorageFileNotFoundException;
import com.ngx.storage.services.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URLConnection;
import java.util.Base64;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class StorageController {

    private final StorageService storageService;

    @PostMapping("upload/**")
    public ResponseEntity<?> create(@RequestParam("file")  MultipartFile file, HttpServletRequest request) {
        FileLocator locator = this.extractPathAndName(request);
        String name = locator.name;
        try {
            if (locator.name == null)
                storageService.saveWithOriginalName(file, locator.path, false);
            else
                name = storageService.saveAs(file, locator.path, locator.name, false);
        } catch (IOException e) {
            throw new StorageFileIUploadException(locator.name, e);
        }
        return ResponseEntity.created(encodeLocation(locator.path, name)).build();
    }
    private URI encodeLocation(String path, String name){
        return URI.create(("storage/" + path + "/" + name).replace(" ", "%20"));
    }
    @PutMapping("/upload/**")
    public ResponseEntity<?> update(@RequestParam("file")  MultipartFile file, HttpServletRequest request) {
        FileLocator locator = this.extractPathAndName(request);
        System.out.println("Locator path: " + locator.path + ", name: " + locator.name);
        String name = locator.name;
        try {
            if (locator.name == null)
                storageService.saveWithOriginalName(file, locator.path, true);
            else
                name = storageService.saveAs(file, locator.path, locator.name, true);
        } catch (IOException e) {
            e.printStackTrace();
            throw new StorageFileIUploadException(locator.name, e);
        }
        return ResponseEntity.created(encodeLocation(locator.path, name)).build();
    }

    @GetMapping("storage/**")
    public ResponseEntity<Resource> show(HttpServletRequest request) {
        FileLocator locator = this.extractPathAndName(request);
        if (locator.name == null)
            return ResponseEntity.noContent().build();

        locator.name = locator.name.replace("%20", " ");

        Resource file = storageService.loadAsResource(locator.path, locator.name);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("base64/**")
    public ResponseEntity<String> read(HttpServletRequest request) {
        FileLocator locator = this.extractPathAndName(request);
        if (locator.name == null)
            return ResponseEntity.noContent().build();

        locator.name = locator.name.replace("%20", " ");

        try {
            Resource file = storageService.loadAsResource(locator.path, locator.name);
            String mime = URLConnection.guessContentTypeFromName(file.getFilename());
            InputStream inputStream = file.getInputStream();
            ResponseEntity<String> response = ResponseEntity.ok().body(
                "data:" + mime + ";base64," +
                    Base64.getEncoder().encodeToString(inputStream.readAllBytes())
            );
            inputStream.close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("delete/**")
    @ResponseStatus(HttpStatus.OK)
    public void delete(HttpServletRequest request) {
        FileLocator locator = this.extractPathAndName(request);
        if (locator.name == null)
            storageService.deleteAll(locator.path);
        else
            storageService.delete(locator.path, locator.name);
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
    @ExceptionHandler(StorageFileIUploadException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileIUploadException exc) {
        return ResponseEntity.internalServerError().body("Cause: " + exc.getMessage());
    }

    private FileLocator extractPathAndName(HttpServletRequest request) {
        final String path =
            request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
        final String bestMatchingPattern =
            request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE).toString();

        String match = new AntPathMatcher().extractPathWithinPattern(bestMatchingPattern, path);
        String[] args = match.split("/");

        if (args.length > 1) {
            String possibleName = args[args.length - 1];
            if (possibleName.contains("."))
                return new FileLocator(match.substring(0, match.lastIndexOf("/")), possibleName);
        }
        return new FileLocator(match, null);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class FileLocator {
        private String path;
        private String name;
    }
}
