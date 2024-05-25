package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Notification;
import com.tfg.cisoDashboard.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(String content, String type) {
        Notification notification = new Notification();
        notification.setContent(content);
        notification.setType(type);
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification markAsRead(Long id) throws Exception {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new Exception("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void clearAll() {
        notificationRepository.deleteAll();
    }
}
