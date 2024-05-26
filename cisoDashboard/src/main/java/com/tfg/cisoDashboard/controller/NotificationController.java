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
    public List<Notification> getAllNotifications(@RequestHeader("X-Organization-ID") Long organizationId) {
        return notificationService.getAllNotifications(organizationId);
    }

    @PostMapping("/read/{id}")
    public Notification markAsRead(@PathVariable Long id, @RequestHeader("X-Organization-ID") Long organizationId) throws Exception {
        return notificationService.markAsRead(id, organizationId);
    }

    @DeleteMapping("/clear")
    public void clearAll(@RequestHeader("X-Organization-ID") Long organizationId) {
        notificationService.clearAll(organizationId);
    }
}
