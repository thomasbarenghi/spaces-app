package com.example.demo.resolver.chat;

import com.example.demo.model.Room;
import com.example.demo.model.Message;
import com.example.demo.model.Chat;
import com.example.demo.model.User;
import com.example.demo.model.Space;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class ChatController {

    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatPublisher chatPublisher;

    @SchemaMapping(typeName = "Mutation", field = "createMessage")
    public Message createMessage(
            @Argument String content,
            @Argument String userId,
            @Argument String chatId) {
        Message message = new Message();
        User user = userRepository.findById(userId).orElseThrow(null);

        message.setId(generateRandomId());
        message.setCreatedAt(new Date().toString());
        message.setUpdatedAt(new Date().toString());
        message.setContent(content);
        message.setFromUser(user);
        chatPublisher.publishMessage(message, chatId, "create");
        Chat chat = chatRepository.findById(chatId).orElseThrow(null);
        chat.getMessages().add(message);
        chatRepository.save(chat);
        return message;
    }

    // Query
    @SchemaMapping(typeName = "Query", value = "findChatById")
    public Chat findChatById(@Argument String id) {
        return chatRepository.findById(id).orElseThrow(null);
    }

    private String generateRandomId() {
        return UUID.randomUUID().toString();
    }

}
