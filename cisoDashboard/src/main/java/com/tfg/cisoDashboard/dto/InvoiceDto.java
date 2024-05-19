package com.tfg.cisoDashboard.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class InvoiceDto {
    private Long id;
    private String providerName;
    private Double cost;
    private LocalDate date;
    private String concept;
}
