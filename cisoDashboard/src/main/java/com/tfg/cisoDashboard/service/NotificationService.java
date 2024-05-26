package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Notification;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.NotificationRepository;
import com.tfg.cisoDashboard.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired private OrganizationService organizationService;
    @Autowired
    private UserService userService;

    public Notification createNotification(String content, String type, Long organizationId) {
        Organization organization = organizationService.findById(organizationId);

        Notification notification = new Notification();
        notification.setContent(content);
        notification.setType(type);
        notification.setOrganization(organization);
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications(Long organizationId) {
        return notificationRepository.findByOrganizationId(organizationId);
    }

    public Notification markAsRead(Long id, Long organizationId) throws Exception {
        Notification notification = notificationRepository.findByIdAndOrganizationId(id, organizationId).orElseThrow(() -> new Exception("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void clearAll(Long organizationId) {
        List<Notification> notifications = notificationRepository.findByOrganizationId(organizationId);
        notificationRepository.deleteAll(notifications);
    }
}
