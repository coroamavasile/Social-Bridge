package com.example.mongotest.Dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PinDTO {

    private Long id;
    private String title;
    private String location;
    private LocalDateTime timestamp;
    private String description;
    private double latitude;
    private double longitude;

}
