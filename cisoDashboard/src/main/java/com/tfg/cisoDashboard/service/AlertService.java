package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Alert;
import com.tfg.cisoDashboard.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    private final Random random = new Random();
    private final String[] rules = {"Malware Prevention", "Phishing Detection", "Intrusion Detection"};

    @Scheduled(fixedRate = 300000)
    public void generateAlert() {
        Alert alert = Alert.builder()
                .timestamp(LocalDateTime.now())
                .rule(rules[random.nextInt(rules.length)])
                .assignees("Unassigned")
                .severity(randomSeverity())
                .riskScore(random.nextInt(100))
                .reason("malware, intrusion_detection, file event with process p")
                .sourceIP("192.168.1." + random.nextInt(255))
                .destinationIP("10.0.0." + random.nextInt(255))
                .eventType("Malware")
                .status("open")
                .actionTaken("None")
                .comments("")
                .build();
        alertRepository.save(alert);
    }

    private String randomSeverity() {
        String[] severities = {"low", "medium", "high"};
        return severities[random.nextInt(severities.length)];
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public Alert updateAssignee(Long id, String assignee) throws Exception {
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new Exception("Alert not found"));
        alert.setAssignees(assignee); // Save directly
        return alertRepository.save(alert);
    }

    public Alert updateStatus(Long id, String status) throws Exception {
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new Exception("Alert not found"));
        alert.setStatus(status); // Save directly
        return alertRepository.save(alert);
    }

    public Alert updateAction(Long id, String action) throws Exception {
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new Exception("Alert not found"));
        alert.setActionTaken(action); // Save directly
        return alertRepository.save(alert);
    }

    public Alert updateComments(Long id, String comments) throws Exception {
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new Exception("Alert not found"));
        alert.setComments(comments); // Save directly
        return alertRepository.save(alert);
    }
}
