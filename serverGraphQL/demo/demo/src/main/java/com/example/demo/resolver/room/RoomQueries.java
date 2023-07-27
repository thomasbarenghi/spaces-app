package com.example.demo.resolver.room;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class RoomQueries {

    @Autowired
    private RoomRepository roomRepository;

    @SchemaMapping(typeName = "Query", value = "findAllRooms")
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value = "findRoomById")
    public Room findOne(@Argument String id) {
        return roomRepository.findById(id).orElseThrow(null);
    }

}
