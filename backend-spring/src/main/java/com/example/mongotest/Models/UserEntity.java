package com.example.mongotest.Models;


import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Builder
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String address;
    private String phoneNumber;
    private int age;
    private String email;
    private String username;
    private String password;
    private Role role;
    public enum Role {ADMIN, USER}
    private List<Pin> favPins = new ArrayList<>();

    public void addPin(Pin pin){
        favPins.add(pin);
    }

}
