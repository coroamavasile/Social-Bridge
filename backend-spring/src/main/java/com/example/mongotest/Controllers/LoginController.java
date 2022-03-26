package com.example.mongotest.Controllers;


import com.example.mongotest.Dtos.LoginCredentialsDTO;
import com.example.mongotest.Exceptions.ApiExceptionResponse;
import com.example.mongotest.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginCredentialsDTO dto) throws ApiExceptionResponse {
        return new ResponseEntity<>(loginService.login(dto), HttpStatus.OK);
    }
}
