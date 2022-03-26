package com.example.mongotest.Dtos;


import com.example.mongotest.Models.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {

    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private int age;
    private String email;
    private String username;
    private String password;
    private UserEntity.Role role;


}
