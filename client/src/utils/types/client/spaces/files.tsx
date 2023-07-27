import { MembersProps, RoomsProps, UserProps } from "@/utils/types/client";

export type FilesProps = {
  id: string;
  name: string;
  src: string;
  owner: UserProps;
  description: string;
};
