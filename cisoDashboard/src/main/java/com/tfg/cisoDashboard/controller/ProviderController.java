package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.dto.ProviderDto;
import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @GetMapping("getAll")
    public List<Provider> getAllProviders() {
        return providerService.getAllProviders();
    }

    @PostMapping("add")
    public Provider createProvider(@RequestBody ProviderDto providerDto) {
        return providerService.saveProvider(providerDto);
    }

    @DeleteMapping("/{id}")
    public void deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
    }
}
