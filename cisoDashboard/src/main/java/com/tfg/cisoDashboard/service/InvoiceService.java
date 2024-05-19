package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.dto.InvoiceDto;
import com.tfg.cisoDashboard.model.Invoice;
import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.repository.InvoiceRepository;
import com.tfg.cisoDashboard.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ProviderRepository providerRepository;

    public Invoice saveInvoice(InvoiceDto invoiceDto) {
        Provider provider = providerRepository.findByName(invoiceDto.getProviderName())
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Invoice invoice = new Invoice();
        invoice.setProvider(provider);
        invoice.setCost(invoiceDto.getCost());
        invoice.setDate(invoiceDto.getDate());
        invoice.setConcept(invoiceDto.getConcept());

        return invoiceRepository.save(invoice);
    }

    public List<InvoiceDto> getAllInvoices() {
        return invoiceRepository.findAll().stream().map(invoice -> {
            InvoiceDto dto = new InvoiceDto();
            dto.setId(invoice.getId());
            dto.setProviderName(invoice.getProvider().getName());
            dto.setCost(invoice.getCost());
            dto.setDate(invoice.getDate());
            dto.setConcept(invoice.getConcept());
            return dto;
        }).collect(Collectors.toList());
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
