import { RoomsProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import { RoomItem, ListTopArea, RoomCreate } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RoomsList() {
  const router = useRouter();
  const { spaceId } = router.query;
  const { rooms } = useAppSelector((state) => state?.client?.spaces?.rooms);
  const [loading, setLoading] = useState(false);
  const [manualClose, setManualClose] = useState(false);
  return (
    <div className=" listContainer">
      <ListTopArea
        title="Mis rooms"
        triggerIsAdmin={true}
        description="Organiza tu espacio en pequeñas salas"
        buttonText="Crear nuevo room"
        triggerLoading={loading}
        triggerManualClose={manualClose}
        triggerContent={
          <RoomCreate setManualClose={setManualClose} setLoading={setLoading} />
        }
      />
      <div className="gridContainer">
        {Array.isArray(rooms) &&
          rooms.map((item: RoomsProps) => (
            <RoomItem
              item={item}
              handleClick={(roomId: string) => {
                router.push(`/client/${spaceId}/${roomId}`);
              }}
            />
          ))}
      </div>
    </div>
  );
}
