package com.example.demo.rest.file;

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
import com.example.demo.model.File;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.FileRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.utils.ImageUploader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/rest/files") // Ruta base para todas las rutas del controlador
@CrossOrigin(origins = { "http://localhost:3000", "https://nocountry-c12-13.onrender.com" })
public class RestFileManager {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private ImageUploader imageUploader;
    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/upload") // Ruta GET
    public ResponseEntity<String> createRoom(@RequestParam("name") String name,
            @RequestParam("spaceId") String spaceId,
            @RequestParam("image") MultipartFile file,
            @RequestParam("userId") String userId,
            @RequestParam("filename") String filename,
            @RequestParam("description") String description
            ) {

        try {
            File fileVar = new File();
            Space space = spaceRepository.findById(spaceId).get();
            fileVar.setName(name);
            fileVar.setDescription(description);
            String imageUrl = imageUploader.uploadImage(file.getBytes(), filename);
            fileVar.setSrc(imageUrl);
            fileVar.setCreatedAt(new Date().toString());
            fileVar.setUpdatedAt(new Date().toString());
            fileVar.setOwner(userRepository.findById(userId).get());
            fileRepository.save(fileVar);
            space.getFiles().add(fileVar);
            spaceRepository.save(space);
            return new ResponseEntity<String>(fileVar.toJson(), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error uploading file");
        }
    }

    @PutMapping("/edit") // Ruta GET
    public ResponseEntity<String> createRoom(@RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "fileId", required = true) String fileId,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @RequestParam(value = "filename", required = false) String filename,
            @RequestParam(value = "description", required = false) String description
            ) {

        try {
            File fileVar = fileRepository.findById(fileId).get();
            if (name != null && !name.equals("")) {
                fileVar.setName(name);
            }
            if (description != null && !description.equals("")) {
                fileVar.setDescription(description);
            }
            if (file != null) {
                String imageUrl = imageUploader.uploadImage(file.getBytes(), filename);
                fileVar.setSrc(imageUrl);
            }
            fileVar.setUpdatedAt(new Date().toString());
            fileRepository.save(fileVar);
            return new ResponseEntity<String>(fileVar.toJson(), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error uploading file");
        }
    }

}
