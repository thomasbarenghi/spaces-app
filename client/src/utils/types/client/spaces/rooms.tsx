import { MembersProps, TasksProps } from "@/utils/types/client";

export class RoomsProps {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tasks: TasksProps[];
  members: MembersProps[]; //Ignorar

  constructor(
    id: string,
    name: string,
    description: string,
    coverImage: string,
    tasks: TasksProps[],
    members: MembersProps[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.coverImage = coverImage;
    this.tasks = tasks;
    this.members = members;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  static deserialize(input: any): RoomsProps {
    return new RoomsProps(
      input.id,
      input.name,
      input.description,
      input.coverImage,

      input.tasks,
      input.members
    );
  }

  static deserializeList(input: any[]): RoomsProps[] {
    return input.map((room) => RoomsProps.deserialize(room));
  }

  getDescription(): string {
    return this.description;
  }

  getCoverImage(): string {
    return this.coverImage;
  }
}
