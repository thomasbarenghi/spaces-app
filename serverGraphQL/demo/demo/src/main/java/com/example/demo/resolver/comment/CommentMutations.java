package com.example.demo.resolver.comment;

import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Task;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import java.util.ArrayList;
import java.util.Date;
import com.example.demo.model.Comment;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.resolver.tasks.TaskPublisher;

@Controller
public class CommentMutations {

    @Autowired
    TaskPublisher taskPublisher;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private CommentRepository commentRepository;

    @SchemaMapping(typeName = "Mutation", field = "createComment")
    public Comment createComment(
            @Argument String content,
            @Argument String taskId,
            @Argument String userId,
            @Argument String roomId) {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(null);
            User user = userRepository.findById(userId).orElseThrow(null);

            Task task = room.getTasks().stream().filter(t -> t.getId().equals(taskId)).findFirst().orElseThrow(null);

            Comment comment = new Comment();
            comment.setContent(content);
            comment.setFromUser(user);
            comment.setCreatedAt(new Date().toString());
            commentRepository.save(comment);

            task.addComment(comment);

            roomRepository.save(room);

            taskPublisher.publishTask(task, roomId, "edit");

            return comment;

        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

}
