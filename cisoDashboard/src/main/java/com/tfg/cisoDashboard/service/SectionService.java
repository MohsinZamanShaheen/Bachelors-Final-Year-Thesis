package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Section;
import com.tfg.cisoDashboard.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SectionService {
    @Autowired
    private SectionRepository sectionRepository;

    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    public Section saveSection(Section section) {
        return sectionRepository.save(section);
    }

    public void deleteSection(String id) {
        sectionRepository.deleteById(id);
    }
}
