package io.github.boavenn.todoappexample.config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler
{
    private final static String defaultMessage = "Something went wrong";
    private final static HttpStatus defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralExceptions(Exception ex, WebRequest request) {
        return defaultResponse(request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status,
                                                                  WebRequest request) {
        var fieldError = ex.getBindingResult().getFieldError();
        if (fieldError != null) {
            return ResponseEntity.status(status)
                    .body(new ErrorDetails(status, fieldError.getDefaultMessage(), request));
        } else {
            return defaultResponse(request);
        }
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers, HttpStatus status,
                                                                  WebRequest request) {
        String message = "Request body is not readable";
        return ResponseEntity.status(status).body(new ErrorDetails(status, message, request));
    }

    private ResponseEntity<Object> defaultResponse(WebRequest request) {
        return ResponseEntity.status(defaultStatus).body(new ErrorDetails(defaultStatus, defaultMessage, request));
    }
}
