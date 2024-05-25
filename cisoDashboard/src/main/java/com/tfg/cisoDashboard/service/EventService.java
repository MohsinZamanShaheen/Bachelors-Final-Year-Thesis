package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Event;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.EventRepository;
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

    private Long currentUserId(){
        Long currentUserId = SecurityUtils.getCurrentUserIdFromContext();
        if (currentUserId == null) {
            return null;
        }
        return currentUserId;
    }

    public List<Event> getUserEvents() {
        Long userId =  currentUserId();
        return eventRepository.findByUserId(userId);
    }

    public Event createEvent(Event event) {
        User currentUser = userService.getCurrentUser();
        event.setUser(currentUser);
        notificationService.createNotification("New event created: " + event.getTitle(), "event");
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}

