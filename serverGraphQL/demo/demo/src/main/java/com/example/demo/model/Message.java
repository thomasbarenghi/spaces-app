package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Builder;

public class Message {
    private String id;
    @DBRef(lazy = true)
    private User fromUser;
    @Builder.Default
    private String content = "";
    private String createdAt;
    private String updatedAt;

    public Message() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Message(User fromUser, String content, String createdAt, String updatedAt, String id) {
        this.fromUser = fromUser;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters

    public User getFromUser() {
        return this.fromUser;
    }

    public String getContent() {
        return this.content;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }

    public String getId() {
        return this.id;
    }

    // ---------------------------------------------------------------------------------------------
    // Setters

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setId(String id) {
        this.id = id;
    }



}
