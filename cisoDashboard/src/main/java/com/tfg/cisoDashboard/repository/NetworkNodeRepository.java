package com.tfg.cisoDashboard.repository;

import com.tfg.cisoDashboard.model.NetworkNode;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NetworkNodeRepository extends MongoRepository<NetworkNode, String> {
}
