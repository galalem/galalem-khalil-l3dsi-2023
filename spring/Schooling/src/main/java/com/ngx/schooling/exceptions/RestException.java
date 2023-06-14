package com.ngx.schooling.exceptions;

public class RestException extends RuntimeException {
    private int status;

    public RestException(int status, String message) {
        super(message);
        this.status = status;
    }

    public RestException(int status, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
