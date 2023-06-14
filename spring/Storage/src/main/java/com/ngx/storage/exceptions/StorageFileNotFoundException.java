package com.ngx.storage.exceptions;

public class StorageFileNotFoundException extends RuntimeException {

    public StorageFileNotFoundException(String filename) {
        super("Could not find file: " + filename);
    }

    public StorageFileNotFoundException(String filename, Throwable cause) {
        super("Could not find file: " + filename, cause);
    }
}