package com.example.demo.resolver.chat;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.example.demo.model.Chat;
import com.example.demo.model.Message;
import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import org.springframework.stereotype.Component;

@Component
public class ChatPublisher  {

    private Map<String, FluxSink<Message>> createMessageStreams = new ConcurrentHashMap<>();
    private Map<String, ConnectableFlux<Message>> createMessagePublishers = new HashMap<>();

    public void publishMessage(Message message, String chatId, String action) {
        if (action.equals("create")) {
            publishNewMessage(message, chatId);
        }
    }

    // ----------------------------------------------
    // New Task
    public void publishNewMessage(Message message, String chatId) {
        FluxSink<Message> messageStream = createMessageStreams.get(chatId);
        if (messageStream != null) {
            messageStream.next(message);
        }
    }

    private ConnectableFlux<Message> createCreateMessagePublisher(String chatId) {
        return Flux.<Message>create(sink -> {
            createMessageStreams.put(chatId, sink);
        }).publish();
    }

    public Flux<Message> getCreateMessageStream(String chatId) {
        ConnectableFlux<Message> messagePublisher = createMessagePublishers.computeIfAbsent(chatId,
                key -> createCreateMessagePublisher(chatId));
        return messagePublisher.autoConnect();
    }

   }

