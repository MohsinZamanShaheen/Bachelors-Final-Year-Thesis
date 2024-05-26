package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.repository.OrganizationNodeRepository;
import com.tfg.cisoDashboard.service.OrganizationContextService;
import com.tfg.cisoDashboard.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/organization")
public class OrganizationController {

    @Autowired
    private OrganizationContextService organizationContextService;
    @Autowired
    private OrganizationService organizationService;

    @PostMapping("/set-current")
    public void setCurrentOrganization(@RequestParam Long organizationId) {
        organizationContextService.setCurrentOrganizationId(organizationId);
    }

    @PostMapping("/create")
    public void createOrganization(@RequestBody Organization organization) {
        organizationService.createOrganization(organization);
    }
}

