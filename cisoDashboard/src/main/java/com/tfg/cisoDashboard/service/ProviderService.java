package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.dto.ProviderDto;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.ProviderRepository;
import com.tfg.cisoDashboard.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserService userService;

    public List<Provider> getAllProviders(Long organizationId) {
        return providerRepository.findByOrganizationId(organizationId);
    }

    public Provider saveProvider(ProviderDto providerDto, Long organizationId) {
        Provider provider = new Provider();
        Organization organization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found"));

        provider.setName(providerDto.getName());
        provider.setEmail(providerDto.getEmail());
        provider.setPhone(providerDto.getPhone());
        provider.setAddress(providerDto.getAddress());
        provider.setCity(providerDto.getCity());
        provider.setZipCode(providerDto.getZipCode());
        provider.setRegistrarId(providerDto.getRegistrarId());
        provider.setOrganization(organization);
        return providerRepository.save(provider);
    }

    public void deleteProvider(Long id) {
        providerRepository.deleteById(id);
    }
}
