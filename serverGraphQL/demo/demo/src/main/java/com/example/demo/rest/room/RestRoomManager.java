package com.example.demo.rest.room;

import java.util.Date;

import org.checkerframework.checker.units.qual.A;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.utils.ImageUploader;
import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Room;
import com.example.demo.model.Chat;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.utils.ImageUploader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/rest/rooms") // Ruta base para todas las rutas del controlador
@CrossOrigin(origins = { "http://localhost:3000", "https://nocountry-c12-13.onrender.com" })
public class RestRoomManager {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ImageUploader imageUploader;
    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/create") // Ruta GET
    public ResponseEntity<String> createRoom(@RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("coverImage") MultipartFile coverImage,
            @RequestParam("spaceOwnerId") String spaceOwnerId,
            @RequestParam("filename") String filename) {
        // obtenemos el body
        try {
            Room room = new Room();
            room.setName(name);
            room.setDescription(description);
            String imageUrl = imageUploader.uploadImage(coverImage.getBytes(), filename);
            room.setCoverImage(imageUrl);
            room.setCreatedAt(new Date().toString());
            room.setUpdatedAt(new Date().toString());
            roomRepository.save(room);
            Space spaceOwner = spaceRepository.findById(spaceOwnerId).orElseThrow(null);
            spaceOwner.getRooms().add(room);
            room.setSpaceOwner(spaceOwner);
            spaceRepository.save(spaceOwner);
            roomRepository.save(room);

            String id = room.getId();
            System.out.println("id: " + id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }

    }

    // put
    @PutMapping("/edit") // Ruta GE
    public ResponseEntity<String> editRoom(@RequestParam(value = "roomId", required = true) String roomId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestParam(value = "filename", required = false) String filename) {

        // obtenemos el body
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(null);

            if (name != null && !name.isEmpty()) {
                room.setName(name);
            }
            if (description != null && !description.isEmpty()) {
                room.setDescription(description);
            }
            if (coverImage != null && !coverImage.isEmpty()) {
                String imageUrl = imageUploader.uploadImage(coverImage.getBytes(), filename);
                room.setCoverImage(imageUrl);
            }

            room.setUpdatedAt(new Date().toString());
            roomRepository.save(room);

            return ResponseEntity.ok(room.toJson());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }

    }

}
