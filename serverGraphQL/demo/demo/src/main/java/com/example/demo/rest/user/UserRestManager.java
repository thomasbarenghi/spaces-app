package com.example.demo.rest.user;

import java.util.Date;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.utils.ImageUploader;
import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Chat;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.ChatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.demo.utils.PasswordUtils;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/rest/users") // Ruta base para todas las rutas del controlador
@CrossOrigin(origins = { "http://localhost:3000", "https://nocountry-c12-13.onrender.com" }) // Origen permitido para
                                                                                             // las solicitudes CORS
public class UserRestManager {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ImageUploader imageUploader;

    @PutMapping("/edit") // Ruta GE
    public ResponseEntity<String> editRoom(@RequestParam(value = "userId", required = true) String userId,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "filenamePi", required = false) String filenamePi,
            @RequestParam(value = "filenameCi", required = false) String filenameCi) {

        // obtenemos el body
        try {
            User user = userRepository.findById(userId).orElseThrow(null);

            if (firstName != null && !firstName.equals("")) {
                user.setFirstName(firstName);
            }

            if (lastName != null && !lastName.equals("")) {
                user.setLastName(lastName);
            }

            if (email != null && !email.equals("")) {
                // Verificar que el email no exista, a menos que sea el mismo del usuario
                Boolean userWithEmail = userRepository.existsByEmail(email);
                if (user.getEmail().equals(email)) {
                    user.setEmail(email);
                } else if (userWithEmail) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
                } else {
                    user.setEmail(email);
                }

            }

            if (username != null && !username.equals("")) {
                // Verificar que el username no exista
                Boolean userWithUsername = userRepository.existsByUsername(username);
                if (user.getUsername().equals(username)) {
                    user.setUsername(username);
                } else if (userWithUsername) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
                } else {
                    user.setUsername(username);
                }

            }

            if (profileImage != null) {
                String imageUrl = imageUploader.uploadImage(profileImage.getBytes(), filenamePi);
                user.setProfileImage(imageUrl);
            }

            if (coverImage != null) {
                String imageUrl = imageUploader.uploadImage(coverImage.getBytes(), filenameCi);
                user.setCoverImage(imageUrl);
            }

            user.setUpdatedAt(new Date().toString());

            userRepository.save(user);
            return ResponseEntity.ok(user.toJson());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }

    }


}
