package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.dto.InvoiceDto;
import com.tfg.cisoDashboard.model.Invoice;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.InvoiceRepository;
import com.tfg.cisoDashboard.repository.ProviderRepository;
import com.tfg.cisoDashboard.repository.UserRepository;
import com.tfg.cisoDashboard.security.SecurityUtils;
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

    @Autowired OrganizationService OrganizationService;
    @Autowired
    private UserService userService;

    public Invoice saveInvoice(InvoiceDto invoiceDto, Long organizationId) {
        Provider provider = providerRepository.findByName(invoiceDto.getProviderName())
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Organization organization = OrganizationService.findById(organizationId);

        Invoice invoice = new Invoice();
        invoice.setProvider(provider);
        invoice.setCost(invoiceDto.getCost());
        invoice.setDate(invoiceDto.getDate());
        invoice.setConcept(invoiceDto.getConcept());
        invoice.setOrganization(organization);

        return invoiceRepository.save(invoice);
    }

    public List<InvoiceDto> getAllInvoices(Long organizationId) {
        return invoiceRepository.findByOrganizationId(organizationId).stream().map(invoice -> {
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
