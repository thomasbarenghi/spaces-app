import { Image } from "@/components";
import { MembersProps } from "@/utils/types/client";

type MembersListProps = {
  member: MembersProps;
  size: "small" | "medium" | "large";
  hasMargin: boolean;
};

export default function MemberPicture({
  member,
  size,
  hasMargin,
}: MembersListProps) {
  member = MembersProps.deserialize(member);
  return (
    <Image
      key={member.getId()}
      src={member.getProfileImage()}
      alt="MemberProfile"
      layout="fill"
      width={
        size === "small"
          ? "w-[30px]"
          : size === "medium"
          ? "w-[40px]"
          : "w-[70px]"
      }
      height={
        size === "small"
          ? "h-[30px]"
          : size === "medium"
          ? "h-[40px]"
          : "h-[70px]"
      }
      aspectRatio="aspect-[1/1]"
      rounded="rounded-[1000px]"
      containerClassName={hasMargin ? "ml-[-15px]" : ""}
    />
  );
}
