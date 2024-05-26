package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Event;
import com.tfg.cisoDashboard.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/getAll")
    public List<Event> getUserEvents(@RequestHeader("X-Organization-ID") Long organizationId) {
        return eventService.getUserEventsByOrganization(organizationId);
    }

    @PostMapping("/createEvent")
    public Event createEvent(@RequestBody Event event, @RequestHeader("X-Organization-ID") Long organizationId) {
        return eventService.createEvent(event, organizationId);
    }

    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id, @RequestHeader("X-Organization-ID") Long organizationId) {
        eventService.deleteEvent(id, organizationId);
        return ResponseEntity.noContent().build();
    }

}
