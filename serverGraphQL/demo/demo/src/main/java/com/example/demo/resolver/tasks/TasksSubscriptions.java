package com.example.demo.resolver.tasks;

import com.example.demo.model.Task;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class TasksSubscriptions {

    @Autowired
    TaskPublisher taskPublisher;

    @SchemaMapping(typeName = "Subscription", field = "notifyTaskCreated")
    public Publisher<Task> notifyTaskCreated(@Argument String roomId) {
        return taskPublisher.getCreateTaskStream(roomId);
    }

    @SchemaMapping(typeName = "Subscription", field = "notifyTaskChanged")
    public Publisher<Task> notifyTaskChanged(@Argument String roomId) {
        return taskPublisher.getEditTaskStream(roomId);
    }

    @SchemaMapping(typeName = "Subscription", field = "notifyTaskDeleted")
    public Publisher<Task> notifyTaskDeleted(@Argument String roomId) {
        return taskPublisher.getDeleteTaskStream(roomId);
    }

}