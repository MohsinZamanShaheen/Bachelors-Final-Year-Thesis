package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByOrganizationId(Long organizationId);
}
