package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.OrganizationNode;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganizationNodeRepository extends MongoRepository<OrganizationNode, String> {
}
