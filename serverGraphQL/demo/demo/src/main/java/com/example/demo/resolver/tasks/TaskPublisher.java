package com.example.demo.resolver.tasks;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.example.demo.model.Task;

import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import org.springframework.stereotype.Component;

@Component
public class TaskPublisher  {

    private Map<String, FluxSink<Task>> createTaskStreams = new ConcurrentHashMap<>();
    private Map<String, ConnectableFlux<Task>> createTaskPublishers = new HashMap<>();
    private Map<String, FluxSink<Task>> editTaskStreams = new ConcurrentHashMap<>();
    private Map<String, ConnectableFlux<Task>> editTaskPublishers = new HashMap<>();
    private Map<String, FluxSink<Task>> deleteTaskStreams = new ConcurrentHashMap<>();
    private Map<String, ConnectableFlux<Task>> deleteTaskPublishers = new HashMap<>();

    public void publishTask(Task task, String roomId, String action) {
        if (action.equals("create")) {
            publishNewTask(task, roomId);
        } else if (action.equals("edit")) {
            
            publishModifiedTask(task, roomId);
        } else if (action.equals("delete")) {
            publishDeletedTask(task, roomId);
        }
    }

    // ----------------------------------------------
    // New Task
    public void publishNewTask(Task task, String roomId) {
        FluxSink<Task> taskStream = createTaskStreams.get(roomId);
        if (taskStream != null) {
            taskStream.next(task);
        }
    }

    private ConnectableFlux<Task> createCreateTaskPublisher(String roomId) {
        return Flux.<Task>create(sink -> {
            createTaskStreams.put(roomId, sink);
        }).publish();
    }

    public Flux<Task> getCreateTaskStream(String roomId) {
        ConnectableFlux<Task> taskPublisher = createTaskPublishers.computeIfAbsent(roomId,
                key -> createCreateTaskPublisher(roomId));
        return taskPublisher.autoConnect();
    }

    // ----------------------------------------------
    // Modified Task
    public void publishModifiedTask(Task task, String roomId) {
        FluxSink<Task> taskStream = editTaskStreams.get(roomId);
        System.out.println("publishTask: " + task.getTitle() + " " + roomId);
        if (taskStream != null) {
            taskStream.next(task);
        }
    }

    private ConnectableFlux<Task> createEditTaskPublisher(String roomId) {
        return Flux.<Task>create(sink -> {
            editTaskStreams.put(roomId, sink);
        }).publish();
    }

    public Flux<Task> getEditTaskStream(String roomId) {
        ConnectableFlux<Task> taskPublisher = editTaskPublishers.computeIfAbsent(roomId,
                key -> createEditTaskPublisher(roomId));
        return taskPublisher.autoConnect();
    }

    // ----------------------------------------------
    // Deleted Task
    public void publishDeletedTask(Task task, String roomId) {
        FluxSink<Task> taskStream = deleteTaskStreams.get(roomId);
        if (taskStream != null) {
            taskStream.next(task);
        }
    }

    private ConnectableFlux<Task> createDeleteTaskPublisher(String roomId) {
        return Flux.<Task>create(sink -> {
            deleteTaskStreams.put(roomId, sink);
        }).publish();
    }

    public Flux<Task> getDeleteTaskStream(String roomId) {
        ConnectableFlux<Task> taskPublisher = deleteTaskPublishers.computeIfAbsent(roomId,
                key -> createDeleteTaskPublisher(roomId));
        return taskPublisher.autoConnect();
    }

}
