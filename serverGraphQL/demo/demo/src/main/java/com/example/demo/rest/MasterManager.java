package com.example.demo.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.rest.space.RestSpaceManager;
import com.example.demo.rest.room.RestRoomManager;

@RestController
@RequestMapping("/rest") // Ruta base para todas las rutas del controlador
@CrossOrigin(origins = { "http://localhost:3000", "https://nocountry-c12-13.onrender.com" }) // Origen permitido para
public class MasterManager {

    // Abrimos paso a los controladores de cada entidad
    @Autowired
    private RestSpaceManager restSpaceManager;
    @Autowired
    private RestRoomManager restRoomManager;

    @RequestMapping("/spaces")
    public RestSpaceManager spaceController() {
        return restSpaceManager;
    }

    @RequestMapping("/rooms")
    public RestRoomManager roomController() {
        return restRoomManager;
    }

}