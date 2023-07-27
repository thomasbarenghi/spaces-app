package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.session.data.mongo.MongoSession;
import com.example.demo.model.Session;

public interface SessionRepository extends MongoRepository<Session, String> {
    Session findByUserId(String userId);

}
