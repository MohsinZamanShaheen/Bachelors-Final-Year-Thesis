package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Provider;
import com.tfg.cisoDashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findByName(String name);
    List<Provider> findByOrganizationId(Long organizationId);
}
