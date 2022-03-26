package com.example.mongotest.Services;

import com.example.mongotest.Dtos.LoginCredentialsDTO;
import com.example.mongotest.Dtos.LoginSuccessDTO;
import com.example.mongotest.Exceptions.ApiExceptionResponse;
import com.example.mongotest.Models.UserEntity;
import com.example.mongotest.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class LoginService {

    private final UserRepository userRepository;

    @Autowired
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginSuccessDTO login(LoginCredentialsDTO dto) throws ApiExceptionResponse {

        UserEntity user = userRepository.findFirstByUsername(dto.getUsername());

        if (user == null) {
            throw ApiExceptionResponse.builder()
                    .errors(Collections.singletonList("Bad credentials"))
                    .message("User not found")
                    .httpStatus(HttpStatus.NOT_FOUND)
                    .build();
        }

        LoginSuccessDTO loginSuccessDTO;
        UserEntity.Role role = user.getRole();

        if (role.equals(UserEntity.Role.USER)) {
            loginSuccessDTO =
                    LoginSuccessDTO.builder()
                            .id(user.getId().toString())
                            .role(user.getRole())
                            .build();
        } else {
            loginSuccessDTO =
                    LoginSuccessDTO.builder().id(user.getId().toString())
                            .role(user.getRole())
                            .build();
        }

        if (dto.getPassword().equals(user.getPassword()))
            return loginSuccessDTO;

        throw ApiExceptionResponse.builder()
                .errors(Collections.singletonList("Bad credentials"))
                .message("Invalid password")
                .httpStatus(HttpStatus.NOT_FOUND)
                .build();


    }


}
