package com.tfg.cisoDashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private Provider provider;
    private Double cost;
    private LocalDate date;
    private String concept;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
}
