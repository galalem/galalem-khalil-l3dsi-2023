package com.ngx.rh.exceptions;

public class RestErrorException extends RuntimeException {
    private int status;
    private String statusText;

    public RestErrorException(int status, String statusText, String message) {
        super(message);
        this.status = status;
        this.statusText = statusText;
    }

    public RestErrorException(int status, String statusText, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
        this.statusText = statusText;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }
}
