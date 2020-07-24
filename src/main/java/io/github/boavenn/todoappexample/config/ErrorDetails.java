package io.github.boavenn.todoappexample.config;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.Instant;

@Getter
public class ErrorDetails
{
    private Instant timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ErrorDetails(HttpStatus status, String message, String path) {
        this.timestamp = Instant.now();
        this.status = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.path = path;
    }

    public ErrorDetails(HttpStatus status, String message, WebRequest request) {
        this(status, message, request.getDescription(false).substring(4)); // removes "uri=" from request path
    }
}
