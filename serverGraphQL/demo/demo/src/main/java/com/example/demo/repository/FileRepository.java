package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.File;

public interface FileRepository extends MongoRepository<File, String> {

}