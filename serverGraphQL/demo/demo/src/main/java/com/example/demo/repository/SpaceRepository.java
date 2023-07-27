package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Space;

public interface SpaceRepository extends MongoRepository<Space, String> {

}