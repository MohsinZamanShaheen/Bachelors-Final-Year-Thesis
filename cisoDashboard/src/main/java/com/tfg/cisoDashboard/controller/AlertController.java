package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Alert;
import com.tfg.cisoDashboard.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    @Autowired
    private AlertService alertService;

    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    @PatchMapping("/{id}/assignee")
    public Alert updateAssignee(@PathVariable Long id, @RequestBody Map<String, String> assignee) throws Exception {
        return alertService.updateAssignee(id, assignee.get("assignee"));
    }

    @PatchMapping("/{id}/status")
    public Alert updateStatus(@PathVariable Long id, @RequestBody Map<String, String> status) throws Exception {
        return alertService.updateStatus(id, status.get("status"));
    }

    @PatchMapping("/{id}/action")
    public Alert updateAction(@PathVariable Long id, @RequestBody Map<String, String> action) throws Exception {
        return alertService.updateAction(id, action.get("action"));
    }

    @PatchMapping("/{id}/comments")
    public Alert updateComments(@PathVariable Long id, @RequestBody Map<String, String> comments) throws Exception {
        return alertService.updateComments(id, comments.get("comments"));
    }
}
