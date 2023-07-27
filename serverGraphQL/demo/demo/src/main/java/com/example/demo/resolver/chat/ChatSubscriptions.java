package com.example.demo.resolver.chat;

import com.example.demo.model.Message;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ChatSubscriptions {

    @Autowired
    ChatPublisher chatPublisher;

    @SchemaMapping(typeName = "Subscription", field = "notifyMessageCreated")
    public Publisher<Message> notifyMessageCreated(@Argument String chatId) {
        return chatPublisher.getCreateMessageStream(chatId);
    }

}