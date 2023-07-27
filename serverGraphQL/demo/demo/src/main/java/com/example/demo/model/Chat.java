package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chats")
public class Chat {
    @Id
    private String id;
    private List<Message> messages = new ArrayList<>();
    private String createdAt;
    private String updatedAt;

    public Chat() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Chat(List<Message> messages, String createdAt, String updatedAt, Space fromSpace) {
        this.messages = messages;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters
    public String getId() {
        return this.id;
    }

    public List<Message> getMessages() {
        return this.messages;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }


    // ---------------------------------------------------------------------------------------------
    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }



    @Override
    public String toString() {
        return "Chat{" + "id=" + this.id + ", messages='" + this.messages + '\'' + ", createdAt='" + this.createdAt
                + '\'' + ", updatedAt='" + this.updatedAt + '\'' + '}';
    }

}
