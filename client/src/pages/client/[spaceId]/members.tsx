import { useAppSelector } from "@/redux/hooks";
import { LayoutSpaces, MembersSpaceList, HeroSpaceArea } from "@/components";
import Head from "next/head";
import { MembersProps, SpaceProps } from "@/utils/types/client";
import { useAppDispatch } from "@/redux/hooks";
import { leaveSpace } from "@/redux/slices/client/spaces/spaces";

export default function Members() {
  const dispatch = useAppDispatch();
  const { currentSpace: cSpace, currentMember: cMember } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentMember = MembersProps.deserialize(cMember);

  const handleTrueAction = () => {
    dispatch(leaveSpace());
  };

  return (
    <>
      <Head>
        <title>Miembros del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <div className="flex items-center justify-between">
          <HeroSpaceArea
            current={currentSpace}
            modalType="confirmation"
            type="space"
            controls={!currentMember?.isOwner()}
            showMembers={false}
            triggerText="Abandonar el espacio"
            confirmParagraph="Estas seguro que quieres salir de este espacio?"
            handleTrueAction={handleTrueAction}
            mustConfirm={true}
          />
        </div>
        <MembersSpaceList adminZone={false} />
      </LayoutSpaces>
    </>
  );
}
