package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.OrganizationNode;
import com.tfg.cisoDashboard.service.OrganizationNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/organization")
public class OrganizationNodeController {

    @Autowired
    private OrganizationNodeService service;

    @GetMapping("/chart")
    public List<OrganizationNode> getOrganizationChart() {
        return service.getAllNodes();
    }
}
