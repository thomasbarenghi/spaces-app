package com.example.demo.config;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dyzyygfwu",
                "api_key", "789834598322256",
                "api_secret", "otYWqyedM2gWm7Doje0Bl6xPOGw"));
    }
}
