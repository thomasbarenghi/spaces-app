import { useAppSelector } from "@/redux/hooks";
import { SpaceProps } from "@/utils/types/client";
import {
  LayoutSpaces,
  RoomsList,
  SpaceInvite,
  HeroSpaceArea,
} from "@/components";
import Head from "next/head";

export default function Space() {
  const { currentSpace: cSpace } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);

  return (
    <>
      <Head>
        <title>Espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Invitar a un amigo"
          triggerIsAdmin={true}
          bgImageVisibleOnDesktop={true}
          showMembers={true}
          baseModalType="confirmation"
        >
          <SpaceInvite />
        </HeroSpaceArea>
        <section className=" flex flex-col gap-10 ">
          <RoomsList />
        </section>
      </LayoutSpaces>
    </>
  );
}
