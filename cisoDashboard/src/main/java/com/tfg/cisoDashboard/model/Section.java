package com.tfg.cisoDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sections")
public class Section {
    @Id
    private String id;
    private String sectionId;
    private String title;
    private String content;
    private List<Section> subsections;
}
