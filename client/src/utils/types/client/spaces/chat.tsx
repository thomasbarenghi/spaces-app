import { UserProps } from "@/utils/types/client";

export class ChatProps {
  id: string;
  messages: MessageProps[];

  constructor(id: string, messages: MessageProps[]) {
    this.id = id;
    this.messages = messages;
  }

  getId(): string {
    return this.id;
  }

  getMessages(): MessageProps[] {
    return this.messages;
  }

  static deserialize(data: ChatProps): ChatProps {
    return new ChatProps(
      data?.id,
      MessageProps?.deserializeList(data?.messages)
    );
  }
}

export class MessageProps {
  id: string;
  content: string;
  fromUser: UserProps;

  constructor(id: string, content: string, fromUser: UserProps) {
    this.id = id;
    this.content = content;
    this.fromUser = fromUser;
  }

  getId(): string {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getUser(): UserProps {
    return this.fromUser;
  }

  static deserialize(data: MessageProps): MessageProps {
    return new MessageProps(
      data.id,
      data.content,
      UserProps.deserialize(data.fromUser)
    );
  }

  static deserializeList(data: MessageProps[]): MessageProps[] {
    return data?.map((message) => MessageProps.deserialize(message));
  }
}
