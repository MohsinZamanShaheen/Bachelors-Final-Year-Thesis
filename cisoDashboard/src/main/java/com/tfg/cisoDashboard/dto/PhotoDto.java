package com.tfg.cisoDashboard.dto;

import lombok.Data;

@Data
public class PhotoDto {
    private int id;
    private String fileName;
    private String fileType;
    private byte[] data;
}
