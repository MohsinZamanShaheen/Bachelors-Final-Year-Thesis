package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.Edge;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NetworkEdgeRepository extends MongoRepository<Edge, String> {
}