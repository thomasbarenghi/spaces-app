package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.session.data.mongo.MongoSession;

@Document(collection = "sessions")
public class Session extends MongoSession {
    // Agrega cualquier personalización adicional que necesites
    //Agregamos userId y userEmail
    private String userId;
    private String userEmail;

    //constructor
    public Session() {
        super();
    }

    //getters y setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    //getters y setters

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    
}
