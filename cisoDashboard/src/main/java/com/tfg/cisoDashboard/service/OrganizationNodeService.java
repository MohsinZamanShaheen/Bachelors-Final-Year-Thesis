package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.OrganizationNode;
import com.tfg.cisoDashboard.repository.OrganizationNodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationNodeService {

    @Autowired
    private OrganizationNodeRepository repository;

    public List<OrganizationNode> getAllNodes() {
        return repository.findAll();
    }
}
