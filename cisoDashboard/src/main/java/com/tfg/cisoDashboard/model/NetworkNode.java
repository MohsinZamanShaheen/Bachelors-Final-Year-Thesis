package com.tfg.cisoDashboard.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Data
@Document(collection = "nodes")
public class NetworkNode {
    @Id
    private String id;
    private String type;
    private Position position;
    private NodeData data;
    private String parentId;
    private String extent;
    private Map<String, Object> style;

}

@Data
class Position {
    private int x;
    private int y;

}
@Data
class NodeData {
    private String label;
    private String type;
    private String imageUrl;

}
