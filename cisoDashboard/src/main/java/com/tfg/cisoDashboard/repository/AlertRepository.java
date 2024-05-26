package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByOrganizationId(Long organizationId);

    Optional<Alert> findByIdAndOrganizationId(Long id, Long organizationId);
}
