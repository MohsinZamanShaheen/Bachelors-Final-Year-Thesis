package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Event;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.EventRepository;
import com.tfg.cisoDashboard.repository.OrganizationRepository;
import com.tfg.cisoDashboard.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private OrganizationRepository organizationRepository;

    public List<Event> getUserEventsByOrganization(Long organizationId) {
        return eventRepository.findByOrganizationId(organizationId);
    }

    public Event createEvent(Event event, Long organizationId) {
        User currentUser = userService.getCurrentUser();
        Organization organization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
        event.setUser(currentUser);
        event.setOrganization(organization);
        notificationService.createNotification("New event created: " + event.getTitle(), "event", organizationId);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId, Long organizationId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (!event.getOrganization().getId().equals(organizationId)) {
            throw new RuntimeException("Event does not belong to the specified organization");
        }
        eventRepository.deleteById(eventId);
    }
}
