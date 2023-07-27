package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Task {
    private String id;
    private String title = "TitleLess Task";
    private String description = "";

    private String deadline = "";
    private Number status = 1;
    private List<Member> assignedTo = new ArrayList<>();

    @DBRef(lazy = true)
    private List<Comment> comments = new ArrayList<>();

    private String createdAt;
    private String updatedAt;
    private String longDescription = "";

    public Task() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Task(String title, String description, String deadline, Number status, List<Member> assignedTo,
            String createdAt,
            String updatedAt, String id, List<Comment> comments) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.comments = comments;
        this.longDescription = "";
    }

    // ---------------------------------------------------------------------------------------------
    // Getters
    public String getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDeadline() {
        return this.deadline;
    }

    public Number getStatus() {
        return this.status;
    }

    public List<Member> getAssignedTo() {
        return this.assignedTo;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public String getDescription() {
        return this.description;
    }

    public String getLongDescription() {
        return this.longDescription;
    }

    // ---------------------------------------------------------------------------------------------
    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public void setStatus(Number status) {
        this.status = status;
    }

    public void setAssignedTo(List<Member> assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void addAssignedTo(Member member) {
        this.assignedTo.add(member);
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    @Override
    public String toString() {
        // return "Member [users=" + users + ", role=" + role + "]";
        return "Task [id=" + id + ", title=" + title + ", description=" + description + ", deadline=" + deadline
                + ", status=" + status + ", assignedTo=" + assignedTo + ", createdAt=" + createdAt + ", updatedAt="
                + updatedAt + "]";
    }
}
