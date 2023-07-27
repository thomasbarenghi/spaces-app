package com.example.demo.resolver.room;

import com.example.demo.model.Room;
import com.example.demo.model.Space;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.RoomRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class RoomMutations {

    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private RoomRepository roomRepository;

    @SchemaMapping(typeName = "Mutation", field = "createRoom")
    public Room createRoom(
            @Argument String name,
            @Argument String description,
            @Argument String coverImage,
            @Argument String spaceOwnerId) {
        Room room = new Room();
        room.setName(name);
        room.setDescription(description);
        room.setCoverImage(coverImage);
        room.setCreatedAt(new Date().toString());
        room.setUpdatedAt(new Date().toString());
        roomRepository.save(room);
        Space spaceOwner = spaceRepository.findById(spaceOwnerId).orElseThrow(null);
        spaceOwner.getRooms().add(room);
        room.setSpaceOwner(spaceOwner);
        spaceRepository.save(spaceOwner);
        roomRepository.save(room);
        return room;
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteRoom")
    public Room deleteRoom(@Argument String id) {
        Room room = roomRepository.findById(id).orElseThrow(null);
        Space spaceOwner = room.getSpaceOwner();
        spaceOwner.getRooms().remove(room);
        spaceRepository.save(spaceOwner);
        roomRepository.delete(room);
        return room;
    }

    @SchemaMapping(typeName = "Mutation", field = "editRoom")
    public Room editRoom(
            @Argument String roomId,
            @Argument String name,
            @Argument String description,
            @Argument String coverImage) {
        Room room = roomRepository.findById(roomId).orElseThrow(null);

        if (name != null) {
            room.setName(name);
        }
        if (description != null) {
            room.setDescription(description);
        }
        if (coverImage != null) {
            room.setCoverImage(coverImage);
        }
        room.setUpdatedAt(new Date().toString());
        roomRepository.save(room);
        return room;
    }

}
