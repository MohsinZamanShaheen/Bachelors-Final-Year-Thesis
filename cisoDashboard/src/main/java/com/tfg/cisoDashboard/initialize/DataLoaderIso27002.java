package com.tfg.cisoDashboard.initialize;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.cisoDashboard.model.Control;
import com.tfg.cisoDashboard.repository.ControlRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.Map;

@Component
public class DataLoaderIso27002 {

    @Autowired
    private ControlRepository controlRepository;

    @PostConstruct
    public void loadData() {
        if (controlRepository.count() == 0) {
            try {
                // Load the controls from JSON file
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = new ClassPathResource("isoData.json").getInputStream();
                JsonNode rootNode = mapper.readTree(inputStream);

                JsonNode controlsNode = rootNode.path("controls");
                JsonNode controlesNode = rootNode.path("controles");
                // Save controls in English
                saveControls(controlsNode, "en");
                // Save controls in Spanish
                saveControls(controlesNode, "es");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void saveControls(JsonNode controls, String language) {
        Iterator<Map.Entry<String, JsonNode>> categories = controls.fields();
        while (categories.hasNext()) {
            Map.Entry<String, JsonNode> categoryEntry = categories.next();
            String category = categoryEntry.getKey();
            JsonNode controlDetails = categoryEntry.getValue().get("data");

            Iterator<Map.Entry<String, JsonNode>> controlIterator = controlDetails.fields();
            while (controlIterator.hasNext()) {
                Map.Entry<String, JsonNode> controlEntry = controlIterator.next();
                String controlCode = controlEntry.getKey();
                JsonNode details = controlEntry.getValue();

                Control control = new Control();
                control.setCategory(category);
                control.setControlCode(controlCode);
                control.setTitle(details.get("title").asText());
                control.setChecked(false);
                control.setDescription(details.get("description").asText());
                control.setLanguage(language);
                controlRepository.save(control);
            }
        }
    }
}
