package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Event;
import com.tfg.cisoDashboard.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/getAll")
    public List<Event> getUserEvents() {
        return eventService.getUserEvents();
    }

    @PostMapping("/createEvent")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @DeleteMapping("/deleteEvent/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
