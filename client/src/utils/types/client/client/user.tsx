import { SpaceProps } from "@/utils/types/client";

// export type User = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     username: string;
//     profileImage: string;
//     email: string;
//     isSuperAdmin: boolean;
//     softDelete: boolean;
//     coverImage: string;
//     createdAt: string;
//     updatedAt: string;
//     spaces: SpaceProps[];
//   };

export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  email: string;
  isSuperAdmin: boolean;
  softDelete: boolean;
  coverImage: string;
  spaces: SpaceProps[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    profileImage: string,
    email: string,
    isSuperAdmin: boolean,
    softDelete: boolean,
    coverImage: string,
    spaces: SpaceProps[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.profileImage = profileImage;
    this.email = email;
    this.isSuperAdmin = isSuperAdmin;
    this.softDelete = softDelete;
    this.coverImage = coverImage;
    this.spaces = spaces;
  }

  getId(): string {
    return this.id;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getUsername(): string {
    return this.username;
  }

  getProfileImage(): string {
    return this.profileImage;
  }

  getEmail(): string {
    return this.email;
  }

  getIsSuperAdmin(): boolean {
    return this.isSuperAdmin;
  }

  getSoftDelete(): boolean {
    return this.softDelete;
  }

  getCoverImage(): string {
    return this.coverImage;
  }

  getSpaces(): SpaceProps[] {
    return this.spaces;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  static deserialize(input: any): User {
    return new User(
      input.id,
      input.firstName,
      input.lastName,
      input.username,
      input.profileImage,
      input.email,
      input.isSuperAdmin,
      input.softDelete,
      input.coverImage,
      input.spaces
    );
  }
}
