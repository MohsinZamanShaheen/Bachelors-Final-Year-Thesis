package com.tfg.cisoDashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private boolean read = false;
    private String type;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
}
