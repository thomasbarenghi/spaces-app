package com.example.demo.model;

import com.example.demo.model.Space;
import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Builder;
import lombok.NonNull;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String username;
    private String firstName;
    private String lastName;
    @NonNull
    private String password;
    @NonNull
    @Builder.Default
    private String loginMethod = "local";
    @Builder.Default
    private String profileImage = "https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80";
    @Builder.Default
    private String coverImage = "https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80";
    @Builder.Default
    private Boolean softDelete = false;
    @Builder.Default
    private Boolean isSuperAdmin = false;
    @DBRef(lazy = true)
    private List<Space> spaces = new ArrayList<>();
    private String createdAt;
    private String updatedAt;

    public User() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public User(String email, String firstName, String lastName, String password, String username, String createdAt,
            String updatedAt, Boolean softDelete, Boolean isSuperAdmin, String coverImage, String profileImage,
            List<Space> spaces) {

        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.softDelete = softDelete;
        this.isSuperAdmin = isSuperAdmin;
        this.coverImage = coverImage;
        this.profileImage = profileImage;
        this.spaces = spaces;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getLoginMethod() {
        return loginMethod;
    }

    public String getPassword() {
        return password;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public Boolean getSoftDelete() {
        return softDelete;
    }

    public Boolean getIsSuperAdmin() {
        return isSuperAdmin;
    }

    public List<Space> getSpaces() {
        return spaces;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    // ---------------------------------------------------------------------------------------------
    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public void setLoginMethod(@NonNull String loginMethod) {
        this.loginMethod = loginMethod;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public void setSoftDelete(Boolean softDelete) {
        this.softDelete = softDelete;
    }

    public void setIsSuperAdmin(Boolean isSuperAdmin) {
        this.isSuperAdmin = isSuperAdmin;
    }

    public void setSpaces(List<Space> spaces) {
        this.spaces = spaces;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void removeSpace(Space space) {
        this.spaces.remove(space);
    }

    // ---------------------------------------------------------------------------------------------
    // Unique verification
    public boolean isUniqueEmail(String email) {
        return this.email.equals(email);
    }

    public boolean isUniqueUsername(String username) {
        return this.username.equals(username);
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", username=" + username + ", firstName=" + firstName
                + ", lastName=" + lastName + ", password=" + password + ", loginMethod=" + loginMethod
                + ", profileImage=" + profileImage + ", coverImage=" + coverImage + ", softDelete=" + softDelete
                + ", isSuperAdmin=" + isSuperAdmin + ", spaces=" + spaces + ", createdAt=" + createdAt + ", updatedAt="
                + updatedAt + "]";
    }

    public String toJson() {
        return "{" + " \"id\":\"" + id + "\"" + ", \"email\":\"" + email + "\"" + ", \"username\":\"" + username + "\""
                + ", \"firstName\":\"" + firstName + "\"" + ", \"lastName\":\"" + lastName + "\""
                + ", \"password\":\"" + password + "\"" + ", \"loginMethod\":\"" + loginMethod + "\""
                + ", \"profileImage\":\"" + profileImage + "\"" + ", \"coverImage\":\"" + coverImage + "\""
                + ", \"softDelete\":\"" + softDelete + "\"" + ", \"isSuperAdmin\":\"" + isSuperAdmin + "\""
                + ", \"createdAt\":\"" + createdAt + "\"" + ", \"updatedAt\":\""
                + updatedAt + "\"" + "}";
    }
}
