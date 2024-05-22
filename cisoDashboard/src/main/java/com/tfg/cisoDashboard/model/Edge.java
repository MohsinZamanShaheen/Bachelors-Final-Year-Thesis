package com.tfg.cisoDashboard.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "edges")
public class Edge {
    @Id
    private String id;
    private String source;
    private String target;
    private String sourceHandle;
}
