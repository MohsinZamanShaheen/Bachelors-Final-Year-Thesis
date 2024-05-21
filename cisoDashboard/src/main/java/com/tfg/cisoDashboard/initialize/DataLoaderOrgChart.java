package com.tfg.cisoDashboard.initialize;

import com.tfg.cisoDashboard.model.OrganizationNode;
import com.tfg.cisoDashboard.repository.OrganizationNodeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataLoaderOrgChart {

    @Autowired
    private OrganizationNodeRepository organizationNodeRepository;

    @PostConstruct
    public void loadData() {
        if (organizationNodeRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = new ClassPathResource("org_diagData.json").getInputStream();
                List<OrganizationNode> nodes = mapper.readValue(inputStream, new TypeReference<List<OrganizationNode>>(){});
                organizationNodeRepository.saveAll(nodes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
