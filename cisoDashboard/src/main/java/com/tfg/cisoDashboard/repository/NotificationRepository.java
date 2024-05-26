package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByOrganizationId(Long organizationId);
    Optional<Notification> findByIdAndOrganizationId(Long id, Long organizationId);

}
