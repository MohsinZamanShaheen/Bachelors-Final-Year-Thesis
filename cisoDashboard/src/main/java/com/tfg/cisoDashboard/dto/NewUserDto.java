package com.tfg.cisoDashboard.dto;

import com.tfg.cisoDashboard.model.Role;
import lombok.Data;

@Data
public class NewUserDto {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String contact;
    private Role role;

}
