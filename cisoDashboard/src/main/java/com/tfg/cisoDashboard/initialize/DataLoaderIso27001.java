package com.tfg.cisoDashboard.initialize;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.cisoDashboard.model.Section;
import com.tfg.cisoDashboard.repository.SectionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoaderIso27001 {
    @Autowired
    private SectionRepository sectionRepository;

    @PostConstruct
    public void loadData() {
        if (sectionRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = new ClassPathResource("ISO27001_Sections.json").getInputStream();
                JsonNode rootNode = mapper.readTree(inputStream);

                JsonNode sectionsNode = rootNode.path("sections");
                List<Section> sections = parseSections(sectionsNode);
                sectionRepository.saveAll(sections);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private List<Section> parseSections(JsonNode sectionsNode) {
        List<Section> sections = new ArrayList<>();
        for (JsonNode sectionNode : sectionsNode) {
            Section section = new Section();
            section.setSectionId(sectionNode.get("id").asText());
            section.setTitle(sectionNode.get("title").asText());
            section.setContent(sectionNode.get("content").asText());

            JsonNode subsectionsNode = sectionNode.path("subsections");
            if (subsectionsNode.isArray()) {
                section.setSubsections(parseSections(subsectionsNode));
            }

            sections.add(section);
        }
        return sections;
    }
}
