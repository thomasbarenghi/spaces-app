package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class Member {
    @DBRef(lazy = true)
    private User user;
    private String role;

    public Member() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Member(User user, String role) {
        this.user = user;
        this.role = role;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters

    public User getUser() {
        return this.user;
    }

    public String getRole() {
        return this.role;
    }

    // ---------------------------------------------------------------------------------------------
    // Setters

    public void setUser(User user) {
        this.user = user;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        // return "Member [users=" + users + ", role=" + role + "]";
        return "Member [user=" + user + ", role=" + role + "]";
    }
}
