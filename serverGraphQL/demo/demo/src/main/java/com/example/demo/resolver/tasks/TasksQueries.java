package com.example.demo.resolver.tasks;

import com.example.demo.model.Room;
import com.example.demo.model.Task;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class TasksQueries {

    @Autowired
    TaskPublisher taskPublisher;
    @Autowired
    private RoomRepository roomRepository;

    @SchemaMapping(typeName = "Query", value = "findTaskById")
    public Task findOne(@Argument String taskId, @Argument String roomId) {
        try {
        Room room = roomRepository.findById(roomId).orElseThrow(null);
        Task task = room.getTaskById(taskId);
        return task;
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

}