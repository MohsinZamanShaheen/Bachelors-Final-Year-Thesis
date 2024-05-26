package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.OrganizationRepository;
import com.tfg.cisoDashboard.repository.UserRepository;
import com.tfg.cisoDashboard.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }
    public Organization findById(Long id){
        return organizationRepository.findById(id).orElseThrow(() -> new RuntimeException("Organization not found"));
    }

    public void createOrganization(Organization organization){
        Organization savedOrganization = organizationRepository.save(organization);

        Long currentUserId = SecurityUtils.getCurrentUserIdFromContext();
        User currentUser = userRepository.findById(currentUserId).orElseThrow(() -> new RuntimeException("User not found"));

        currentUser.getOrganizations().add(savedOrganization);
        userRepository.save(currentUser);

    }
}
