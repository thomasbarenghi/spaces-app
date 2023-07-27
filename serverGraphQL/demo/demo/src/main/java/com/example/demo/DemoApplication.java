package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import javax.annotation.PostConstruct;
//importamos system
import java.lang.System;

@SpringBootApplication
@EnableWebSocket
public class DemoApplication {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public DemoApplication(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostConstruct
    public void showCollections() {
        mongoTemplate.getCollectionNames().forEach(System.out::println);
    }

    @Configuration
    public class CorsConfiguration {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/graphql") // Ruta del endpoint GraphQL
                            .allowedOrigins("http://localhost:3000", "https://nocountry-c12-13.onrender.com") // Origen
                                                                                                              // permitido
                                                                                                              // para
                                                                                                              // las
                                                                                                              // solicitudes
                                                                                                              // CORS
                            .allowedMethods("POST") // Métodos HTTP permitidos
                            .allowedHeaders("*") // Encabezados permitidos
                            .allowCredentials(true); // Permitir el envío de cookies
                }
            };
        }
    }

    // Resto del código de la aplicación
}
