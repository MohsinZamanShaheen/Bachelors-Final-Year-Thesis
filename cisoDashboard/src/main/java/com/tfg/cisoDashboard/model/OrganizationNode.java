package com.tfg.cisoDashboard.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "organization_chart")
public class OrganizationNode {
    @Id
    private String id;
    private String type;
    private String label;
    private Data data;
    private List<OrganizationNode> children;
    private boolean expanded;

    @lombok.Data
    public static class Data {
        private String image;
        private String name;
        private String title;

    }
}
