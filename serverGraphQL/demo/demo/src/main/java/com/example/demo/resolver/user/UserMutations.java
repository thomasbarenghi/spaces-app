package com.example.demo.resolver.user;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.PasswordUtils;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class UserMutations {

    @Autowired
    private UserRepository userRepository;

    @SchemaMapping(typeName = "Mutation", field = "createUser")
    public User createUser(@Argument String firstName,
            @Argument String email,
            @Argument String lastName,
            @Argument String password,
            @Argument String loginMethod,
            @Argument String username,
            @Argument String profileImage,
            @Argument Boolean isSuperAdmin) {
        try {
            System.out.println("Creando usuario...");

            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("El correo electrónico ya está en uso");
            } else {
                user.setEmail(email);
            }
            if (userRepository.existsByUsername(username)) {
                throw new IllegalArgumentException("El nombre de usuario ya está en uso");
            } else {
                user.setUsername(username);
            }
            String encryptedPassword = PasswordUtils.encryptPassword(password);
            user.setPassword(encryptedPassword);

            if (profileImage != null && !profileImage.isEmpty()) {
                user.setProfileImage(profileImage);
            }
            if (isSuperAdmin != null && !isSuperAdmin) {
                user.setIsSuperAdmin(isSuperAdmin);
            }
            if (loginMethod != null && !loginMethod.isEmpty()) {
                user.setLoginMethod(loginMethod);
            }
            user.setCreatedAt(new Date().toString());
            user.setUpdatedAt(new Date().toString());
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteUser")
    public User deleteUser(@Argument String id) {
        try {
            User user = userRepository.findById(id).orElseThrow(null);
            userRepository.delete(user);
            return user;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @SchemaMapping(typeName = "Mutation", field = "editUser")
    public User editUser(@Argument String userId,
            @Argument String firstName,
            @Argument String email,
            @Argument String lastName,
            @Argument String username,
            @Argument String profileImage,
            @Argument Boolean isSuperAdmin,
            @Argument Boolean softDelete,
            @Argument String coverImage) {
        try {
            User user = userRepository.findById(userId).orElseThrow(null);

            if (user == null) {
                throw new IllegalArgumentException("El usuario no existe");
            }

            if (firstName != null && !firstName.isEmpty()) {
                user.setFirstName(firstName);
            }

            if (lastName != null && !lastName.isEmpty()) {
                user.setLastName(lastName);
            }

            if (email != null && !email.isEmpty()) {
                if (userRepository.existsByEmail(email)) {
                    throw new IllegalArgumentException("El correo electrónico ya está en uso");
                } else {
                    user.setEmail(email);
                }
            }

            if (username != null && !username.isEmpty()) {
                if (userRepository.existsByUsername(username)) {
                    throw new IllegalArgumentException("El nombre de usuario ya está en uso");
                } else {
                    user.setUsername(username);
                }
            }

            if (profileImage != null && !profileImage.isEmpty()) {
                user.setProfileImage(profileImage);
            }

            if (coverImage != null && !coverImage.isEmpty()) {
                user.setCoverImage(coverImage);
            }

            if (isSuperAdmin != null) {
                user.setIsSuperAdmin(isSuperAdmin);
            }

            if (softDelete != null) {
                user.setSoftDelete(softDelete);
            }

            user.setUpdatedAt(new Date().toString());
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @SchemaMapping(typeName = "Mutation", field = "changePassword")
    public User changePassword(@Argument String userId,
            @Argument String oldPassword,
            @Argument String newPassword) {
        try {
            User user = userRepository.findById(userId).orElseThrow(null);

            if (user == null) {
                throw new IllegalArgumentException("El usuario no existe");
            }

            if (!PasswordUtils.isPasswordMatch(oldPassword, user.getPassword())) {
                throw new IllegalArgumentException("La contraseña actual no coincide");
            }

            String encryptedPassword = PasswordUtils.encryptPassword(newPassword);
            user.setPassword(encryptedPassword);
            user.setUpdatedAt(new Date().toString());
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        }
    }

}