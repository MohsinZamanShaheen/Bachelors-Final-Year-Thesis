package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.NetworkNode;
import com.tfg.cisoDashboard.model.Edge;
import com.tfg.cisoDashboard.repository.NetworkNodeRepository;
import com.tfg.cisoDashboard.repository.NetworkEdgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/netdiagelem")
public class NetworkController {

    @Autowired
    private NetworkNodeRepository nodeRepository;

    @Autowired
    private NetworkEdgeRepository edgeRepository;

    @GetMapping("/nodes")
    public List<NetworkNode> getNodes() {
        return nodeRepository.findAll();
    }

    @GetMapping("/edges")
    public List<Edge> getEdges() {
        return edgeRepository.findAll();
    }
}
