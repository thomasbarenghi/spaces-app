import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { ReactSVG } from "react-svg";
import { SpaceProps } from "@/utils/types/client";

type VerticalMenuProps = {
  data: any;
  hasLogo: boolean;
  title: string;
  isRooms?: boolean;
};

export default function VerticalMenu({
  data,
  hasLogo,
  title,
  isRooms,
}: VerticalMenuProps) {
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
      <div className="flex flex-col items-start gap-4 ">
        <p className="smalltext font-medium text-blue-700">{title}</p>
        {Array.isArray(data) &&
          data.map((item: any, index: any) => (
            <>
              {(item.visible || isRooms) && (
                <div
                  onClick={() => handleClick(item)}
                  key={index}
                  className="flex items-center justify-start gap-2 cursor-pointer"
                >
                  <ReactSVG
                    src={!hasLogo ? "/icon/default.svg" : item.icon}
                    className={`h-6 w-6 fill-current ${
                      colorChangeCondition(item)
                        ? "text-blue-700"
                        : "text-black"
                    }`}
                  />
                  <p
                    className={`${
                      colorChangeCondition(item)
                        ? "text-blue-700"
                        : "text-black"
                    } smalltext font-normal `}
                  >
                    {item.name}
                  </p>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
}
