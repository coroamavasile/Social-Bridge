package com.example.mongotest.Dtos;

import com.example.mongotest.Models.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class LoginSuccessDTO {

    private UserEntity.Role role;
    private String id;


}
