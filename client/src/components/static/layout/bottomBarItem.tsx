import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { ReactSVG } from "react-svg";
import { SpaceProps } from "@/utils/types/client";

type BottomBarItemProps = {
  data: any;
  hasLogo: boolean;
  isRooms?: boolean;
};

export default function BottomBarItem({
  data,
  hasLogo,
  isRooms,
}: BottomBarItemProps) {
  const router = useRouter();
  const { currentSpace: cSpace } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);

  const handleClick = (item: any) => {
    if (isRooms) {
      router.push("/client/" + currentSpace?.getId() + "/" + item.id);
    } else {
      router.push(item.linkPath);
    }
  };

  const colorChangeCondition = (item: any) => {
    if (isRooms) {
      return (
        router.asPath === "/client/" + currentSpace?.getId() + "/" + item.id
      );
    } else {
      return router.pathname === item.path;
    }
  };

  return (
    <>
      {data.visible && (
        <div
          key={data.name}
          className="centerInner w-full gap-1"
          onClick={() => handleClick(data)}
        >
          <ReactSVG
            src={!hasLogo ? "/icon/default-sm.svg" : data.icon}
            className={`fill-current  ${
              colorChangeCondition(data)
                ? "rounded-full bg-blue-50 px-3 py-2 text-blue-700"
                : "px-3 py-2 text-black"
            }`}
          />
          <p
            className={`smalltext text-xs xs:text-sm  ${
              colorChangeCondition(data) ? "text-blue-700" : "text-black"
            }`}
          >
            {data.name}
          </p>
        </div>
      )}
    </>
  );
}
