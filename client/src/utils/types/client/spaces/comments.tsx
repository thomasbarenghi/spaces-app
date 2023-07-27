import { UserProps } from "@/utils/types/client";

export type CommentProps = {
  id: string;
  content: string;
  createdAt: string;
  fromUser: UserProps;
};
