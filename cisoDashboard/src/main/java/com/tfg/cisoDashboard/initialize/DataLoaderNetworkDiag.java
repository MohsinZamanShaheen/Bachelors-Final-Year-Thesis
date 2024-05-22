package com.tfg.cisoDashboard.initialize;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.cisoDashboard.model.NetworkNode;
import com.tfg.cisoDashboard.model.Edge;
import com.tfg.cisoDashboard.repository.NetworkNodeRepository;
import com.tfg.cisoDashboard.repository.NetworkEdgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataLoaderNetworkDiag {

    @Autowired
    private NetworkNodeRepository nodeRepository;

    @Autowired
    private NetworkEdgeRepository edgeRepository;

    @PostConstruct
    public void loadData() {
        if (nodeRepository.count() == 0 && edgeRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = new ClassPathResource("net_diagData.json").getInputStream();
                JsonNode rootNode = mapper.readTree(inputStream);

                List<NetworkNode> nodes = mapper.convertValue(rootNode.get("nodes"), mapper.getTypeFactory().constructCollectionType(List.class, NetworkNode.class));
                List<Edge> edges = mapper.convertValue(rootNode.get("edges"), mapper.getTypeFactory().constructCollectionType(List.class, Edge.class));

                nodeRepository.saveAll(nodes);
                edgeRepository.saveAll(edges);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
