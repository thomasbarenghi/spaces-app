package com.example.demo.resolver.user;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class UserQueries {

    @Autowired
    private UserRepository userRepository;

    @SchemaMapping(typeName = "Query", value = "findAllUsers")
    public List<User> findAll() {
        try {
            System.out.println("findAllUsers1");
            return userRepository.findAll();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @SchemaMapping(typeName = "Query", value = "findUserById")
    public User findOne(@Argument String id) {
        try {
            System.out.println("findUserById1 + " + id);
            User user = userRepository.findById(id).orElseThrow(null);
            return user;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

}