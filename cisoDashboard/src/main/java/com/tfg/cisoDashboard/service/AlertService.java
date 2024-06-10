package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Alert;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private OrganizationContextService organizationContextService;

    private final Random random = new Random();
    private final String[] rules = {"Malware Prevention", "Phishing Detection", "Intrusion Detection","CMS Issue", "DNS Issues", "Hardware Failure", "Host Provider"};
    private final String[] reasons = {"Malware Detected", "Phishing Attempt", "Intrusion Detected", "Policy Violation", "Unauthorized Access", "Suspicious Activity", "Data Exfiltration Attempt", "Denial of Service", "Account Compromise", "Insider Threat", "System Misconfiguration"};
    private final String[] eventTypes = {"Malware", "Phishing", "Intrusion", "Unauthorized Access", "Policy Violation", "Suspicious Activity", "Data Exfiltration", "Denial of Service", "Account Compromise", "Insider Threat", "System Misconfiguration"};

    private final String[] ipSources = {"192.168.1.", "10.0.0."};
    private final String[] userSources = {"User_", "Employee_"};
    private final String[] appSources = {"App_", "Service_"};
    private final String[] deviceSources = {"Device_", "Endpoint_"};

    private final String[] ipDestinations = {"192.168.1.", "10.0.0."};
    private final String[] userDestinations = {"User_", "Employee_"};
    private final String[] appDestinations = {"App_", "Service_"};
    private final String[] deviceDestinations = {"Device_", "Endpoint_"};

    @Scheduled(fixedRate = 30000, initialDelay = 30000) // specify time after which an alert will be generated automatically
    public void generateAlert() {
        String[] source = randomSource();
        String[] destination = randomDestination(source[1]);
        Long organizationId = organizationContextService.getCurrentOrganizationId();
        Organization organization = organizationService.findById(organizationId);
        Alert alert = Alert.builder()
                .timestamp(LocalDateTime.now())
                .rule(rules[random.nextInt(rules.length)])
                .assignees("")
                .severity(randomSeverity())
                .riskScore(random.nextInt(100))
                .reason(reasons[random.nextInt(reasons.length)])
                .source(source[0])
                .destination(destination[0])
                .eventType(eventTypes[random.nextInt(eventTypes.length)])
                .status("Open")
                .actionTaken("None")
                .comments("")
                .organization(organization)
                .build();
        alertRepository.save(alert);
        notificationService.createNotification("New alert generated", "alert", organizationId);
    }

    private String randomSeverity() {
        String[] severities = {"medium", "high", "critical"};
        return severities[random.nextInt(severities.length)];
    }

    private String[] randomSource() {
        String[] sources = new String[4];
        sources[0] = ipSources[random.nextInt(ipSources.length)] + random.nextInt(255);
        sources[1] = "IP";

        String sourceType = random.nextInt(4) == 0 ? "User" : random.nextInt(4) == 1 ? "App" : "Device";
        switch (sourceType) {
            case "User":
                sources[0] = userSources[random.nextInt(userSources.length)] + randomUserName();
                sources[1] = "User";
                break;
            case "App":
                sources[0] = appSources[random.nextInt(appSources.length)] + randomAppName();
                sources[1] = "App";
                break;
            case "Device":
                sources[0] = deviceSources[random.nextInt(deviceSources.length)] + randomDeviceName();
                sources[1] = "Device";
                break;
            default:
                break;
        }

        return sources;
    }

    private String[] randomDestination(String sourceType) {
        String[] destinations = new String[2];
        switch (sourceType) {
            case "IP":
                destinations[0] = ipDestinations[random.nextInt(ipDestinations.length)] + random.nextInt(255);
                destinations[1] = "IP";
                break;
            case "User":
                destinations[0] = userDestinations[random.nextInt(userDestinations.length)] + randomUserName();
                destinations[1] = "User";
                break;
            case "App":
                destinations[0] = appDestinations[random.nextInt(appDestinations.length)] + randomAppName();
                destinations[1] = "App";
                break;
            case "Device":
                destinations[0] = deviceDestinations[random.nextInt(deviceDestinations.length)] + randomDeviceName();
                destinations[1] = "Device";
                break;
            default:
                destinations[0] = "Unknown";
                destinations[1] = "Unknown";
                break;
        }

        return destinations;
    }

    private String randomUserName() {
        String[] users = {"John Doe", "Jane Doe", "Alice", "Bob", "Eve"};
        return users[random.nextInt(users.length)];
    }

    private String randomAppName() {
        String[] apps = {"HR Management System", "Payroll System", "CRM", "Inventory Management"};
        return apps[random.nextInt(apps.length)];
    }

    private String randomDeviceName() {
        String[] devices = {"Server 1", "Laptop 15", "Database Server", "Workstation 3"};
        return devices[random.nextInt(devices.length)];
    }

    public List<Alert> getAllAlertsByOrganization(Long organizationId) {
        return alertRepository.findByOrganizationId(organizationId);
    }

    public Alert updateAssignee(Long id, String assignee,Long organizationId) throws Exception {
        Alert alert = alertRepository.findByIdAndOrganizationId(id, organizationId).orElseThrow(() -> new Exception("Alert not found"));
        alert.setAssignees(assignee);
        return alertRepository.save(alert);
    }

    public Alert updateStatus(Long id, String status,Long organizationId) throws Exception {
        Alert alert = alertRepository.findByIdAndOrganizationId(id, organizationId).orElseThrow(() -> new Exception("Alert not found"));
        alert.setStatus(status);
        return alertRepository.save(alert);
    }

    public Alert updateAction(Long id, String action,Long organizationId) throws Exception {
        Alert alert = alertRepository.findByIdAndOrganizationId(id, organizationId).orElseThrow(() -> new Exception("Alert not found"));;
        alert.setActionTaken(action);
        return alertRepository.save(alert);
    }

    public Alert updateComments(Long id, String comments,Long organizationId) throws Exception {
        Alert alert = alertRepository.findByIdAndOrganizationId(id, organizationId).orElseThrow(() -> new Exception("Alert not found"));
        alert.setComments(comments);
        return alertRepository.save(alert);
    }
}
