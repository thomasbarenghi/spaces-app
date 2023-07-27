package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;
import com.example.demo.model.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.demo.model.Task;

import lombok.Builder;
import lombok.NonNull;

@Document(collection = "files")
public class File {
    @Id
    private String id;
    @Builder.Default
    private String name = "NameLess Room";
    private String description = "";
    private String src = "";
    private String createdAt;
    private String updatedAt;
    @DBRef
    private User owner;

    public File() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public File(String name, String src, String createdAt, String updatedAt, User owner, String description) {
        this.name = name;
        this.src = src;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.owner = owner;
        this.description = description;

    }

    // ---------------------------------------------------------------------------------------------
    // Getter & Setter
    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public String getSrc() {
        return this.src;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    public void setSrc(@NonNull String src) {
        this.src = src;
    }

    public void setCreatedAt(@NonNull String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(@NonNull String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getOwner() {
        return this.owner;
    }

    public String getOwnerJson() {
        return this.owner.toJson();
    }

    public void setOwner(@NonNull User owner) {
        this.owner = owner;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
    }

    public String toJson() {
        // return "{" +
        //         "\"id\":\"" + id + "\"" +
        //         ", \"name\":\"" + name + "\"" +
        //         ", \"description\":\"" + description + "\"" +
        //         ", \"coverImage\":\"" + coverImage + "\"" +
        //         "}";
        return "{" +
                "\"id\":\"" + id + "\"" +
                ", \"name\":\"" + name + "\"" +
                ", \"description\":\"" + description + "\"" +
                ", \"src\":\"" + src + "\"" +
                ", \"createdAt\":\"" + createdAt + "\"" +
                ", \"updatedAt\":\"" + updatedAt + "\"" +
                ", \"owner\":" + owner.toJson() +
                "}";
    }

}
