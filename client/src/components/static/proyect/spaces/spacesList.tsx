import { useRouter } from "next/router";
import { SpaceProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { SpaceItem, ListTopArea, SpaceCreate } from "@/components";
import { useState } from "react";

export default function SpacesList() {
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state?.client?.spaces?.spaces);

  const [loading, setLoading] = useState(false);
  const [manualClose, setManualClose] = useState(false);

  const handleClick = (spaceId: string, settings = false) => {
    const path = `/client/${spaceId}${settings ? "/settings" : ""}`;
    router.push(path);
  };

  return (
    <section className="listContainer2">
      <div className="containerInner listContainerInner">
        <ListTopArea
          title="Mis espacios"
          description="Organiza tus proyectos"
          buttonText="Crear nuevo espacio"
          triggerLoading={loading}
          triggerManualClose={manualClose}
          triggerIsAdmin={false}
          triggerContent={
            <SpaceCreate
              setManualClose={setManualClose}
              setLoading={setLoading}
            />
          }
        />
        <div className="gridContainer xl:grid-cols-4">
          {Array.isArray(spaces) &&
            spaces[0] &&
            spaces.map((item: SpaceProps) => (
              <SpaceItem
                item={item}
                handleClick={handleClick}
                handleClickConfig={handleClick}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
