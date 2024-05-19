package com.tfg.cisoDashboard.dto;
import lombok.Data;

@Data
public class ProviderDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String zipCode;
    private int registrarId;
}
