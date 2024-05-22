package com.tfg.cisoDashboard.dto;
import lombok.Data;

@Data
public class UserUpdateDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String username;
    private String company;
    private String bio;
}
