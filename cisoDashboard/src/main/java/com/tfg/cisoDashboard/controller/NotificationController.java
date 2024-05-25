package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Notification;
import com.tfg.cisoDashboard.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PostMapping("/read/{id}")
    public Notification markAsRead(@PathVariable Long id) throws Exception {
        return notificationService.markAsRead(id);
    }

    @DeleteMapping("/clear")
    public void clearAll() {
        notificationService.clearAll();
    }
}
