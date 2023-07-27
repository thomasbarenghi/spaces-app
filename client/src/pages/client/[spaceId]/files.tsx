import {
  LayoutSpaces,
  FilesList,
  HeroSpaceArea,
  FileForm,
  FileCreate,
} from "@/components";
import { useAppSelector } from "@/redux/hooks";
import Head from "next/head";
import { SpaceProps } from "@/utils/types/client";
import { useState } from "react";

export default function SpaceSettings() {
  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);

  const { currentSpaceFiles } = useAppSelector(
    (state) => state?.client?.spaces?.files
  );

  const { currentSpace: cSpace } = useAppSelector(
    (state) => state?.client?.spaces.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);

  return (
    <>
      <Head>
        <title>Archivos del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="room"
          controls={true}
          triggerText="Subir un archivo"
          primaryLoading={loading}
          primaryManualClose={manualClose}
        >
          <FileCreate setManualClose={setManualClose} setLoading={setLoading} />
        </HeroSpaceArea>
        <FilesList files={currentSpaceFiles} />
      </LayoutSpaces>
    </>
  );
}
