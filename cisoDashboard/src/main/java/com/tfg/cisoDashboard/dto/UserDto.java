package com.tfg.cisoDashboard.dto;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String username;
    private String name;
    private String email;
    private String phoneNumber;
    private String company;
    private String bio;
    private PhotoDto photo;
}
