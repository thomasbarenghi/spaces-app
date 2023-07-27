package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;

import org.checkerframework.checker.units.qual.C;
import org.hibernate.annotations.Cascade;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.annotation.Transient;

import org.springframework.data.mongodb.core.mapping.Document;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.NonNull;

@Document(collection = "spaces")
public class Space {
    @Id
    private String id;
    @Builder.Default
    private String name = "NameLess Space";
    @Builder.Default
    private String accessCode = "";
    @Builder.Default
    private String description = "";
    @Builder.Default
    private String coverImage = "";
    private List<Member> members = new ArrayList<>();
    @DBRef(lazy = true)
    @Cascade(CascadeType.ALL)
    private List<Room> rooms = new ArrayList<>();
    @DBRef(lazy = true)
    @Cascade(CascadeType.ALL)
    private List<File> files = new ArrayList<>();
    @DBRef(lazy = true)
    @Cascade(CascadeType.ALL)
    private Chat chat;
    private String createdAt;
    private String updatedAt;

    public Space() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Space(String name, String accessCode, String description, String coverImage, String createdAt,
            String updatedAt, List<Member> members, List<Room> rooms, List<File> files) {
        this.name = name;
        this.description = description;
        this.accessCode = accessCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.coverImage = coverImage;
        this.members = members;
        this.rooms = rooms;
        this.files = files;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters
    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getAccessCode() {
        return this.accessCode;
    }

    public String getDescription() {
        return this.description;
    }

    public String getCoverImage() {
        return this.coverImage;
    }

    public List<Member> getMembers() {
        return this.members;
    }

    public List<Room> getRooms() {
        return this.rooms;
    }

    public List<File> getFiles() {
        return this.files;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }

    public Member getMember(String userId) {
        for (Member member : this.members) {
            if (member.getUser().getId().equals(userId)) {
                return member;
            }
        }
        return null;
    }

    // ---------------------------------------------------------------------------------------------
    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public void addMember(Member member) {
        this.members.add(member);
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Chat getChat() {
        return this.chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    @Override
    public String toString() {
        return "Space [id=" + id + ", name=" + name + ", accessCode=" + accessCode + ", description=" + description
                + ", coverImage=" + coverImage + ", members=" + members + ", rooms=" + rooms + ", files=" + files
                + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }

    public String toJson() {
        return "{" +
                "\"id\": \"" + this.id + "\"," +
                "\"name\": \"" + this.name + "\"," +
                "\"accessCode\": \"" + this.accessCode + "\"," +
                "\"description\": \"" + this.description + "\"," +
                "\"coverImage\": \"" + this.coverImage + "\"," +
                "\"updatedAt\": \"" + this.updatedAt + "\"" +
                "}";
    }

}