import { MemberPicture } from "@/components";
import { MembersProps } from "@/utils/types/client";

type MembersListProps = {
  members: MembersProps[];
  size: "small" | "medium" | "large";
  pictureHasMargin: boolean;
};

export default function MembersList({
  members,
  size,
  pictureHasMargin = false,
}: MembersListProps) {
  return (
    <div className="ml-[15px] mt-2 flex ">
      {Array.isArray(members) &&
        members.map((member: MembersProps) => (
          <MemberPicture
            member={member}
            size={size}
            hasMargin={pictureHasMargin}
          />
        ))}
    </div>
  );
}
