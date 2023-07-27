import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $userId: ID!
    $newPassword: String!
    $oldPassword: String!
  ) {
    changePassword(
      userId: $userId
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $loginMethod: String
    $username: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      loginMethod: $loginMethod
      username: $username
    ) {
      id
      email
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace(
    $userOwner: ID!
    $name: String!
    $description: String!
    $accessCode: String!
    $coverImage: String!
  ) {
    createSpace(
      userOwner: $userOwner
      name: $name
      description: $description
      accessCode: $accessCode
      coverImage: $coverImage
    ) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
    }
  }
`;

export const DELETE_SPACE = gql`
  mutation deleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      id
      name
      description
      accessCode
      coverImage
    }
  }
`;

export const EDIT_SPACE = gql`
  mutation EditSpace(
    $spaceId: ID!
    $name: String
    $description: String
    $accessCode: String
    $coverImage: String
  ) {
    editSpace(
      spaceId: $spaceId
      name: $name
      description: $description
      accessCode: $accessCode
      coverImage: $coverImage
    ) {
      id
      name
      description
      accessCode
      coverImage
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation CreateRoom(
    $spaceOwnerId: ID!
    $name: String!
    $description: String!
    $coverImage: String!
  ) {
    createRoom(
      spaceOwnerId: $spaceOwnerId
      name: $name
      description: $description
      coverImage: $coverImage
    ) {
      id
      name
      description
      coverImage
      spaceOwner {
        id
      }
      tasks {
        id
      }
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
      name
      description
      coverImage
    }
  }
`;

export const EDIT_ROOM = gql`
  mutation EditRoom(
    $roomId: ID!
    $name: String
    $description: String
    $coverImage: String
  ) {
    editRoom(
      roomId: $roomId
      name: $name
      description: $description
      coverImage: $coverImage
    ) {
      id
      name
      description
      coverImage
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: Int!
    $roomOwnerId: ID!
    $assignedToIds: [ID!]
    $longDescription: String!
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      roomOwnerId: $roomOwnerId
      assignedToIds: $assignedToIds
      longDescription: $longDescription
    ) {
      id
      title
      description
      deadline
      status
      longDescription
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

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!, $roomId: ID!) {
    deleteTask(taskId: $taskId, roomId: $roomId) {
      id
      title
      description
      deadline
      status
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $taskId: ID!
    $roomId: ID!
    $title: String
    $description: String
    $status: Int
    $deadline: String
    $assignedToIds: [ID!]
    $longDescription: String
  ) {
    editTask(
      taskId: $taskId
      roomId: $roomId
      title: $title
      description: $description
      status: $status
      deadline: $deadline
      assignedToIds: $assignedToIds
      longDescription: $longDescription
    ) {
      id
      title
      description
      longDescription
      status
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
      deadline
    }
  }
`;

export const JOIN_SPACE = gql`
  mutation joinSpace($spaceId: ID!, $userId: ID!) {
    joinSpace(spaceId: $spaceId, userId: $userId) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
    }
  }
`;

export const LEAVE_SPACE = gql`
  mutation leaveSpace($spaceId: ID!, $userId: ID!) {
    leaveSpace(spaceId: $spaceId, userId: $userId) {
      id
    }
  }
`;

export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      id
      userId
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation createMessage($chatId: ID!, $content: String!, $userId: ID!) {
    createMessage(chatId: $chatId, content: $content, userId: $userId) {
      content
    }
  }
`;

export const CHANGE_USER_ROLE = gql`
  mutation changeUserRole($spaceId: ID!, $userId: ID!, $role: String!) {
    changeUserRole(spaceId: $spaceId, userId: $userId, role: $role) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($fileId: ID!, $spaceId: ID!) {
    deleteFile(fileId: $fileId, spaceId: $spaceId) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment(
    $roomId: ID!
    $taskId: ID!
    $userId: ID!
    $content: String!
  ) {
    createComment(
      roomId: $roomId
      taskId: $taskId
      userId: $userId
      content: $content
    ) {
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
