package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Alert;
import com.tfg.cisoDashboard.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    @Autowired
    private AlertService alertService;
    @GetMapping
    public List<Alert> getAllAlerts(@RequestHeader("X-Organization-ID") Long organizationId) {
        return alertService.getAllAlertsByOrganization(organizationId);
    }
    @PatchMapping("/{id}/assignee")
    public Alert updateAssignee(@PathVariable Long id, @RequestBody Map<String, String> assignee, @RequestHeader("X-Organization-ID") Long organizationId) throws Exception {
        return alertService.updateAssignee(id, assignee.get("assignee"), organizationId);
    }
    @PatchMapping("/{id}/status")
    public Alert updateStatus(@PathVariable Long id, @RequestBody Map<String, String> status, @RequestHeader("X-Organization-ID") Long organizationId) throws Exception {
        return alertService.updateStatus(id, status.get("status"), organizationId);
    }
    @PatchMapping("/{id}/action")
    public Alert updateAction(@PathVariable Long id, @RequestBody Map<String, String> action, @RequestHeader("X-Organization-ID") Long organizationId) throws Exception {
        return alertService.updateAction(id, action.get("action"), organizationId);
    }
    @PatchMapping("/{id}/comments")
    public Alert updateComments(@PathVariable Long id, @RequestBody Map<String, String> comments, @RequestHeader("X-Organization-ID") Long organizationId) throws Exception {
        return alertService.updateComments(id, comments.get("comments"), organizationId);
    }
}
