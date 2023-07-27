import React from "react";
import { ModalTrigger } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client";

type ListTopAreaProps = {
  title: string;
  description: string;
  buttonText: string;
  triggerContent?: React.ReactNode;
  controls?: boolean;
  triggerIsAdmin?: boolean;
  triggerLoading?: boolean;
  triggerManualClose?: boolean;
};

export default function ListTopArea({
  title,
  description,
  buttonText,
  triggerContent,
  controls = true,
  triggerIsAdmin = false,
  triggerLoading = false,
  triggerManualClose = false,
}: ListTopAreaProps) {
  const { currentMember: cMember } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentMember = MembersProps.deserialize(cMember);

  return (
    <div className="relative flex w-full flex-col items-start  justify-between gap-3 md:flex-row md:items-center lg:gap-10">
      <div className="flex flex-col items-start justify-center ">
        <h2 className="titulo-3">{title}</h2>
        <p className="bodyText ">{description}</p>
      </div>
      {controls &&
        ((triggerIsAdmin &&
          (currentMember?.isAdmin() || currentMember?.isOwner())) ||
          !triggerIsAdmin) && (
          <ModalTrigger
            triggerText={buttonText}
            buttonType="terceryButton"
            loading={triggerLoading}
            manualClose={triggerManualClose}
          >
            {triggerContent}
          </ModalTrigger>
        )}
    </div>
  );
}
