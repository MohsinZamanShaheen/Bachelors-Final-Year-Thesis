package com.tfg.cisoDashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime timestamp;
    private String rule;
    private String assignees;
    private String severity;
    private int riskScore;
    private String reason;
    private String source;
    private String destination;
    private String eventType;
    private String status;
    private String actionTaken;
    private String comments;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
}
