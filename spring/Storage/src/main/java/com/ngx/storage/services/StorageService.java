package com.ngx.storage.services;

import com.ngx.storage.exceptions.StorageFileNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.Files.copy;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class StorageService {

    private static final String DEFAULT_DIRECTORY = System.getProperty("user.home") + "/NGX/storage/";

    @Value("${storage.directory:default}")
    private String directory;

    public String save(MultipartFile file, String path) throws IOException {
        return this.saveAs(file, path, file.getName());
    }
    public String saveWithOriginalName(MultipartFile file, String path) throws IOException {
        return this.saveWithOriginalName(file, path, false);
    }
    public String saveWithOriginalName(MultipartFile file, String path, boolean overwrite) throws IOException {
        return this.saveAs(file, path, StringUtils.cleanPath(file.getOriginalFilename()), overwrite);
    }
    public String saveAs(MultipartFile file, String path, String name) throws IOException {
        return this.saveAs(file, path, name, false);
    }
    public String saveAs(MultipartFile file, String path, String name, boolean overwrite) throws IOException {
        Path fileStorage = this.get(path, name);

        Path folder = this.get(path);
        if (!Files.exists(folder))
            Files.createDirectories(folder);

        File existing = new File(fileStorage.toUri());

        if (overwrite || !existing.exists())
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
        else {
            int i=0;
            if (name.contains(".")){
                StringBuilder builder;
                do {
                    i++;
                    builder = new StringBuilder(name);
                    builder.replace(name.lastIndexOf("."), name.lastIndexOf(".") + 1, " ("+i+").");
                    fileStorage = this.get(path, builder.toString());
                    existing = new File(fileStorage.toUri());
                }
                while (existing.exists());
                name = builder.toString();
            }
            else {
                do {
                    i++;
                    fileStorage = this.get(path, name + " ("+i+")");
                    existing = new File(fileStorage.toUri());
                }
                while (existing.exists());
                name = name + " ("+i+")";
            }
            copy(file.getInputStream(), fileStorage);
        }
        return name;
    }

    public Path load(String path, String name) {
        return this.get(path).resolve(name);
    }

    public Resource loadAsResource(String path, String name) {
        try {
            Path file = this.load(path, name);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable())
                return resource;
            else
                throw new StorageFileNotFoundException(name);

        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + name, e);
        }
    }

    public void deleteAll(String path) {
        FileSystemUtils.deleteRecursively(get(path).toFile());
    }

    public void delete(String path, String name) {
        FileSystemUtils.deleteRecursively(get(path, name).toFile());
    }


    private Path get(String path) {
        String directory = this.directory.equals("default") ? DEFAULT_DIRECTORY : this.directory;
        return Paths.get(directory + path).toAbsolutePath().normalize();
    }
    private Path get(String path, String name) {
        String directory = this.directory.equals("default") ? DEFAULT_DIRECTORY : this.directory;
        return Paths.get(directory + path, name).toAbsolutePath().normalize();
    }
}
