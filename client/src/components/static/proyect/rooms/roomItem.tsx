import { Image } from "@/components";
import { RoomsProps } from "@/utils/types/client";

type RoomItemProps = {
  item: RoomsProps;
  handleClick: (roomId: string) => void;
};

export default function RoomItem({ item, handleClick }: RoomItemProps) {
  return (
    <div
      key={item.id}
      className="flex  h-max cursor-pointer flex-col overflow-hidden rounded-2xl border-none bg-white  shadow-sm  "
      onClick={() => {
        handleClick(item.id);
      }}
    >
      <Image
        src={item.coverImage}
        alt="SpaceCover"
        layout="fill"
        width="w-[100%]"
        height="w-[100%]"
        aspectRatio="aspect-[59/32]"
      />
      <div className="flex flex-col items-start justify-start gap-3 p-5 ">
        <div>
          <p className="subtitulo">{item.name}</p>
          <p className="smalltext  ">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
