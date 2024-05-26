package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.dto.InvoiceDto;
import com.tfg.cisoDashboard.model.Invoice;
import com.tfg.cisoDashboard.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/add")
    public Invoice createInvoice(@RequestBody InvoiceDto invoiceDto, @RequestHeader("X-Organization-ID") Long organizationId) {
        return invoiceService.saveInvoice(invoiceDto,organizationId);
    }

    @GetMapping("/getAll")
    public List<InvoiceDto> getAllInvoices(@RequestHeader("X-Organization-ID") Long organizationId) {
        return invoiceService.getAllInvoices(organizationId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id, @RequestHeader("X-Organization-ID") Long organizationId) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }
}
