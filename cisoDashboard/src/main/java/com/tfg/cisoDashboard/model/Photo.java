package com.tfg.cisoDashboard.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fileName;
    private String fileType;
    @Column(name = "data", columnDefinition = "BYTEA")
    private byte[] data;
}
