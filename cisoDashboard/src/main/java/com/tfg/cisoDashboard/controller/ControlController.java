package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.Responses.ControlSummary;
import com.tfg.cisoDashboard.model.Control;
import com.tfg.cisoDashboard.repository.ControlRepository;
import com.tfg.cisoDashboard.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/controls")
public class ControlController {

    @Autowired
    private ControlService controlService;
    @Autowired
    private ControlRepository controlRepository;

    @GetMapping("/all")
    public List<Control> getAllControls(@RequestParam String language) {
        return controlService.getAllControlsByLanguage(language);
    }

    @PutMapping("/updateStatusByCode")
    public ResponseEntity<Control> updateControlStatusByCode(@RequestBody Map<String, Object> payload) {
        String controlCode = (String) payload.get("controlCode");
        Boolean status = (Boolean) payload.get("status");
        List<Control> controls = controlService.getControlsByControlCode(controlCode);

        if (!controls.isEmpty()) {
            for (Control control : controls) {
                control.setChecked(status);
                controlRepository.save(control);
            }
            return ResponseEntity.ok(controls.get(0)); // Return the first updated control as an example
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<List<ControlSummary>> getControlSummary() {
        List<Control> controls = controlService.getAllControlsByLanguage("en");
        Map<String, ControlSummary> summaryMap = new HashMap<>();

        for (Control control : controls) {
            String category = control.getCategory();

            summaryMap.putIfAbsent(category, new ControlSummary(category, 0, 0));
            ControlSummary summary = summaryMap.get(category);
            summary.setTotal(summary.getTotal() + 1);

            if (control.getChecked()) {
                summary.setChecked(summary.getChecked() + 1);
            }
        }

        List<ControlSummary> summaries = new ArrayList<>(summaryMap.values());
        for (ControlSummary summary : summaries) {
            summary.setCheckedPercentage(summary.getTotal() == 0 ? 0 : ((double) summary.getChecked() / summary.getTotal()) * 100);
        }
        int totalControls = summaries.stream().mapToInt(ControlSummary::getTotal).sum();
        int totalChecked = summaries.stream().mapToInt(ControlSummary::getChecked).sum();
        double totalCheckedPercentage = totalControls == 0 ? 0 : ((double) totalChecked / totalControls) * 100;

        ControlSummary totalSummary = new ControlSummary("Total Checked", totalControls, totalChecked, totalCheckedPercentage);
        summaries.add(totalSummary);

        return ResponseEntity.ok(summaries);
    }




    @PostMapping
    public Control createControl(@RequestBody Control control) {
        return controlService.saveControl(control);
    }
}