package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.controller.ProviderController;
import com.tfg.cisoDashboard.dto.ProviderDto;
import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public Provider saveProvider(ProviderDto providerDto) {
        Provider provider = new Provider();
        provider.setId(providerDto.getId());
        provider.setName(providerDto.getName());
        provider.setEmail(providerDto.getEmail());
        provider.setPhone(providerDto.getPhone());
        provider.setAddress(providerDto.getAddress());
        provider.setCity(providerDto.getCity());
        provider.setZipCode(providerDto.getZipCode());
        provider.setRegistrarId(providerDto.getRegistrarId());
        return providerRepository.save(provider);
    }


    public void deleteProvider(Long id) {
        providerRepository.deleteById(id);
    }
}
