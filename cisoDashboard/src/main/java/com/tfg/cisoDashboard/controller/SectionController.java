package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Section;
import com.tfg.cisoDashboard.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {
    @Autowired
    private SectionService sectionService;

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @PostMapping
    public Section createSection(@RequestBody Section section) {
        return sectionService.saveSection(section);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable String id, @RequestBody Section updatedSection) {
        return sectionService.getAllSections().stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .map(existingSection -> {
                    existingSection.setTitle(updatedSection.getTitle());
                    existingSection.setContent(updatedSection.getContent());
                    existingSection.setSubsections(updatedSection.getSubsections());
                    return ResponseEntity.ok(sectionService.saveSection(existingSection));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable String id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }
}
