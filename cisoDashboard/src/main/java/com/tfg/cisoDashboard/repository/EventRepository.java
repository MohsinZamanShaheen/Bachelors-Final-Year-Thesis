package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Event;
import com.tfg.cisoDashboard.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {
    List<Event> findByOrganizationId(Long organizationId);
}
