import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import {
  GeneralPermission,
  MembersProps,
  RoomsProps,
  SpaceProps,
} from "@/utils/types/client";
import { VerticalMenu, BottomBarItem } from "@/components";

type SidebarProps = {
  type: "client" | "account";
};

export default function Sidebar({ type }: SidebarProps) {
  const { currentSpace: cSpace, currentMember: cMember } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const { rooms: sRooms } = useAppSelector(
    (state) => state?.client?.spaces?.rooms
  );

  const currentMember = MembersProps.deserialize(cMember);
  const currentSpace = SpaceProps.deserialize(cSpace);
  const rooms = RoomsProps.deserializeList(sRooms);

  const spaceNavData = [
    {
      name: "Espacios",
      path: "/client",
      linkPath: "/client",
      visible: true,
      icon: "/icon/sidebar/espacios.svg",
    },
    {
      name: "Cuenta",
      path: "/client/account",
      linkPath: "/client/account",
      visible: true,
      icon: "/icon/sidebar/cuenta.svg",
    },
    {
      name: "Rooms",
      path: "/client/[spaceId]",
      linkPath: "/client/" + currentSpace?.getId(),
      visible: true,
      icon: "/icon/sidebar/rooms.svg",
    },
    {
      name: "Configuracion",
      path: "/client/[spaceId]/settings",
      linkPath: "/client/" + currentSpace?.getId() + "/settings",
      visible: currentMember.hasPermission(GeneralPermission.EditSpace),
      icon: "/icon/sidebar/config.svg",
    },
    {
      name: "Miembros",
      path: "/client/[spaceId]/members",
      linkPath: "/client/" + currentSpace?.getId() + "/members",
      visible: true,
      icon: "/icon/sidebar/miembros.svg",
    },
    {
      name: "Archivos",
      path: "/client/[spaceId]/files",
      linkPath: "/client/" + currentSpace?.getId() + "/files",
      visible: true,
      icon: "/icon/sidebar/archivos.svg",
    },
  ];

  const accountNavData = [
    {
      name: "Espacios",
      path: "/client",
      linkPath: "/client",
      visible: true,
      icon: "/icon/sidebar/espacios.svg",
    },
    {
      name: "Personal",
      path: "/client/account",
      linkPath: "/client/account",
      visible: true,
      icon: "/icon/sidebar/personal.svg",
    },
    {
      name: "Seguridad",
      path: "/client/account/security",
      linkPath: "/client/account/security",
      visible: true,
      icon: "/icon/sidebar/seguridad.svg",
    },
  ];

  return (
    <>
      <aside className="sidebar  ">
        <div className="sidebarInner  ">
          <div className="relative h-full w-full overflow-y-auto">
            <div className="absolute left-0 top-0 h-full w-full  ">
              <Logo type="normal" />
              <div className="mt-8 flex flex-col items-start justify-start gap-8">
                <VerticalMenu
                  title={type === "client" ? "GENERAL" : "GENERAL"}
                  data={
                    type === "client"
                      ? spaceNavData.slice(0, 2)
                      : accountNavData.slice(0, 1)
                  }
                  hasLogo={true}
                  isRooms={false}
                />
                {type === "client" && (
                  <>
                    <VerticalMenu
                      title={currentSpace?.getName()?.toUpperCase()}
                      data={spaceNavData.slice(2, 6)}
                      hasLogo={true}
                      isRooms={false}
                    />
                    {Array.isArray(rooms) && rooms.length > 0 && (
                      <VerticalMenu
                        title="ROOMS"
                        data={rooms}
                        hasLogo={false}
                        isRooms={true}
                      />
                    )}
                  </>
                )}
                {type === "account" && (
                  <VerticalMenu
                    title="CUENTA"
                    data={accountNavData.slice(1, 6)}
                    hasLogo={true}
                    isRooms={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className=" seccion1-x-padding fixed bottom-[0px] left-0 right-0 z-[10] justify-between bg-red-700  bg-white lg:hidden">
        <div className="flex items-center justify-between gap-1 overflow-y-auto py-3">
          {type === "client" &&
            spaceNavData
              .slice(0, 1)
              .concat(spaceNavData.slice(2, 6))
              .map((item: any, index: any) => (
                <BottomBarItem data={item} hasLogo={true} isRooms={false} />
              ))}
          {type === "account" &&
            accountNavData
              .slice(0, 3)
              .map((item: any, index: any) => (
                <BottomBarItem data={item} hasLogo={true} isRooms={false} />
              ))}
        </div>
      </div>
    </>
  );
}

function Logo({ type }: any) {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authSession);

  return (
    <ReactSVG
      onClick={() => router.push(auth.isLogged ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      className="aspect-[98/30] h-[30px] w-[98px] cursor-pointer fill-current text-white lg:text-black"
    />
  );
}
