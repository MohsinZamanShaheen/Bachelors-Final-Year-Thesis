package com.tfg.cisoDashboard.dto;

import com.tfg.cisoDashboard.model.Role;
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
    private Role role;
}
