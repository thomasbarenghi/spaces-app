import { gql } from "@apollo/client";

export const NOTIFY_TASK_CREATED = gql`
  subscription notifyTaskCreated($roomId: ID!) {
    notifyTaskCreated(roomId: $roomId) {
      id
      title
      description
      deadline
      status
      longDescription
      comments {
        id
        content
        createdAt
        fromUser {
          id
          firstName
          lastName
          profileImage
        }
      }
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`;

export const NOTIFY_TASK_CHANGED = gql`
  subscription notifyTaskChanged($roomId: ID!) {
    notifyTaskChanged(roomId: $roomId) {
      id
      title
      description
      deadline
      status
      longDescription
      comments {
        id
        content
        createdAt
        fromUser {
          id
          firstName
          lastName
          profileImage
        }
      }
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`;

export const NOTIFY_TASK_DELETED = gql`
  subscription notifyTaskDeleted($roomId: ID!) {
    notifyTaskDeleted(roomId: $roomId) {
      id
      title
      description
      deadline
      status
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`;

export const NOTIFY_MESSAGE_CREATED = gql`
  subscription notifyMessageCreated($chatId: ID!) {
    notifyMessageCreated(chatId: $chatId) {
      id
      content
      createdAt
      fromUser {
        id
        firstName
        lastName
        profileImage
      }
    }
  }
`;
