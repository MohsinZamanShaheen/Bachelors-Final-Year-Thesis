package com.tfg.cisoDashboard.service;
import org.springframework.stereotype.Service;

@Service
public class OrganizationContextService {

    private Long currentOrganizationId;
    public Long getCurrentOrganizationId() {
        return currentOrganizationId;
    }
    public void setCurrentOrganizationId(Long organizationId) {
        this.currentOrganizationId = organizationId;
    }
}
