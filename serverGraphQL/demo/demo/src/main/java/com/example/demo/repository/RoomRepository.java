package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Room;

public interface RoomRepository extends MongoRepository<Room, String> {

}