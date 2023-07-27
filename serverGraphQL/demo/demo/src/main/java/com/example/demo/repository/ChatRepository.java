package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Chat;

public interface ChatRepository extends MongoRepository<Chat, String> {

}