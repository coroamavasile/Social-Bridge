package com.example.mongotest.Exceptions;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import java.util.*;

@Getter
@JsonIgnoreProperties(value={"stackTrace","suppressed","cause","localizedMessage"})
public class ApiExceptionResponse extends Exception{

    private final HttpStatus httpStatus;
    private final List<String> errors;

    @Builder
    public ApiExceptionResponse(String message, HttpStatus httpStatus,List<String> errors){
        super(message);
        this.httpStatus = httpStatus;
        this.errors = errors;
    }

}
