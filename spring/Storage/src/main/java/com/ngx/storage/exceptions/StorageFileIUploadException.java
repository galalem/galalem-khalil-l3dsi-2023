package com.ngx.storage.exceptions;

public class StorageFileIUploadException extends RuntimeException {

    public StorageFileIUploadException(String filename) {
        super("Could not upload file: " + filename);
    }

    public StorageFileIUploadException(String filename, Throwable cause) {
        super("Could not upload file: " + filename, cause);
    }
}