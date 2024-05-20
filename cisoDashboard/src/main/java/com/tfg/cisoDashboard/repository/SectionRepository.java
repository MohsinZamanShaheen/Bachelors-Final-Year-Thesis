package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Section;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SectionRepository extends MongoRepository<Section, String> {
}
