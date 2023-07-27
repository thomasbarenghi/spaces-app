import { MembersProps, CommentProps } from "@/utils/types/client";

export class TasksProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 1 | 2 | 3;
  assignedTo: MembersProps[];
  comments: CommentProps[];
  longDescription: string;

  constructor(
    id: string,
    title: string,
    description: string,
    deadline: string,
    status: 1 | 2 | 3,
    assignedTo: MembersProps[],
    comments: CommentProps[],
    longDescription: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
    this.assignedTo = assignedTo;
    this.comments = comments;
    this.longDescription = longDescription;
  }

  static deserialize(data: any): TasksProps {
    return new TasksProps(
      data.id,
      data.title,
      data.description,
      data.deadline,
      data.status,
      data.assignedTo,
      data.comments,
      data.longDescription
    );
  }

  static deserializeList(data: any[]): TasksProps[] {
    return data.map((task) => TasksProps.deserialize(task));
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getDeadline(): string {
    return this.deadline;
  }

  getStatus(): number {
    return this.status;
  }

  getAssignedTo(): MembersProps[] {
    return this.assignedTo;
  }

  getLongDescription(): string {
    return this.longDescription;
  }

  getComments(): CommentProps[] {
    return this.comments;
  }

  getFormattedStatus(): string | number {
    if (this.status == 1) {
      return "Pendiente";
    } else if (this.status == 2) {
      return "En progreso";
    } else if (this.status == 3) {
      return "Completado";
    } else {
      return "Completado";
    }
  }
}
