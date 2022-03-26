package com.example.mongotest.Dtos.Builders;


import com.example.mongotest.Dtos.UserDTO;
import com.example.mongotest.Models.UserEntity;

public class UserBuilder {

    private UserBuilder(){

    }


    private static UserDTO toUserDTO(UserEntity user){

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .age(user.getAge())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();

    }

    private static UserEntity toUser(UserDTO userDTO){

        return UserEntity.builder()
                .id(userDTO.getId())
                .name(userDTO.getName())
                .address(userDTO.getAddress())
                .phoneNumber(userDTO.getPhoneNumber())
                .age(userDTO.getAge())
                .email(userDTO.getEmail())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .build();
    }


}
