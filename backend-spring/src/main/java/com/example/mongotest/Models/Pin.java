package com.example.mongotest.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.io.Serializable;
import java.time.LocalDateTime;

@Builder
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pin implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "pins_sequence";


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String location;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;

    private String description;

    private double latitude;
    private double longitude;

    public enum Role {BLOOD_DONATION, MATERIAL_DONATION, TOURISM}
    private Role role;
    //red, green, blue

}
