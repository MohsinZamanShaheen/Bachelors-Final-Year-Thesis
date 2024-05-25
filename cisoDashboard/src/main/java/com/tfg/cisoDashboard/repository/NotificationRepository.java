package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
