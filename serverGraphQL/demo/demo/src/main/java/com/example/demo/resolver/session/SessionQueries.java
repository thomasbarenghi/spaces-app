package com.example.demo.resolver.session;

import com.example.demo.repository.SessionRepository;
import com.example.demo.model.Session;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class SessionQueries {

    @Autowired
    private SessionRepository sessionRepository;

    @SchemaMapping(typeName = "Query", field = "verifySession")
    public Boolean verifySession(@Argument String userId) {
        try {
            System.out.println("Verificando sesión..." + userId);
            Session session = sessionRepository.findByUserId(userId);
            if (session != null) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

}
