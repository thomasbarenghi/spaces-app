import {
  MembersProps,
  RoomsProps,
  UserProps,
  FilesProps,
} from "@/utils/types/client";

export class SpaceProps {
  id: string;
  name: string;
  accessCode: string;
  description: string;
  coverImage: string;
  rooms?: RoomsProps[];
  members?: MembersProps[];
  files?: FilesProps[];

  constructor(
    id: string,
    name: string,
    accessCode: string,
    description: string,
    coverImage: string,
    rooms?: RoomsProps[],
    members?: MembersProps[], //Ignorar
    files?: FilesProps[]
  ) {
    this.id = id;
    this.name = name;
    this.accessCode = accessCode;
    this.description = description;
    this.coverImage = coverImage;
    this.rooms = rooms;
    this.members = members;
    this.files = files;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAccessCode(): string {
    return this.accessCode;
  }

  getDescription(): string {
    return this.description;
  }

  getCoverImage(): string {
    return this.coverImage;
  }

  getRooms(): RoomsProps[] {
    if (!this.rooms) return [];
    return this.rooms;
  }

  getFiles(): FilesProps[] {
    if (!this.files) return [];
    return this.files;
  }

  getMembers(): MembersProps[] {
    if (!this.members) return [];
    return this.members;
  }

  getOwner(): MembersProps | null {
    const members = this.getMembers();
    const owner = members?.find((member) => member?.role === "owner");
    if (!owner) return null;
    return owner;
  }

  isFromUser(user: UserProps): boolean {
    const owner = this.getOwner();
    const isOwner = owner?.user.id === user.id;

    return isOwner;
  }

  static deserialize(input: any): SpaceProps {
    return new SpaceProps(
      input.id,
      input.name,
      input.accessCode,
      input.description,
      input.coverImage,
      input.rooms,
      input.members
    );
  }
}

// export type RoomsProps = {
//   id: string;
//   name: string;
//   description: string;
//   coverImage: string;
//   createdAt: string;
//   lastModified: string;
//   tasks: TasksProps[];
//   members: MembersProps[]; //Ignorar
// };
