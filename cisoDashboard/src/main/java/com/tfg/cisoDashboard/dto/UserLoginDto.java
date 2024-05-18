package com.tfg.cisoDashboard.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDto {

    private String email;
    private String password;
}
