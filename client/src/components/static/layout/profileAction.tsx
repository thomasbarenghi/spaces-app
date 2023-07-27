import { useAppSelector } from "@/redux/hooks";
import { Image, Popover, VerticalNav } from "@/components";
import Link from "next/link";
import { AuthClass, UserProps } from "@/utils/types/client";
import { useState } from "react";
import { createPortal } from "react-dom";
import ImageNext from "next/image";

type ProfileActionProps = {
  textColor?: string;
};

export default function ProfileAction({
  textColor = "text-white",
}: ProfileActionProps) {
  const {
    session: { current: Ssession },
    auth: sAuth,
  } = useAppSelector((state) => state.authSession);
  const session = UserProps.deserialize(Ssession);
  const auth = AuthClass.deserialize(sAuth);

  const itemsNav = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Cuenta",
      href: "/client/account",
    },
    {
      name: "Espacios",
      href: "/client",
    },
    {
      name: "Cerrar sesión",
      href: "/auth/logout",
    },
  ];

  const childrenTrigger = (
    <>
      {session?.getFullName().length > 2 && session?.getProfileImage() && (
        <>
          <Image
            src={session?.getProfileImage()}
            alt="ProfileImage"
            layout="fill"
            width="w-[40px]"
            height="w-[40px]"
            aspectRatio="aspect-[1/1]"
            rounded="rounded-[20px]"
          />
          <p className={`bodyText hidden font-medium ${textColor} lg:flex`}>
            {session?.getFullName()}
          </p>
        </>
      )}
    </>
  );

  return (
    <>
      {auth.getIsLogged() ? (
        <div>
          <div className="hidden lg:flex">
            <Popover childrenTrigger={childrenTrigger}>
              <VerticalNav items={itemsNav} />
            </Popover>
          </div>
          <div className="flex lg:hidden">
            <HamburgerMenu childrenTrigger={childrenTrigger} auth={auth} />
          </div>
        </div>
      ) : (
        <div className="">
          <button className="button terceryButton hidden lg:flex">
            <Link href={"/auth"}>Iniciar sesión</Link>
          </button>
          <HamburgerMenu />
        </div>
      )}
    </>
  );
}

type HamburgerMenuProps = {
  childrenTrigger?: JSX.Element;
  auth?: AuthClass;
};

function HamburgerMenu({ childrenTrigger, auth }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const itemsNav = [
    {
      name: "Home",
      href: "/",
      visible: true,
    },
    {
      name: "Sobre nosotros",
      href: "/about",
      visible: true,
    },
    {
      name: "Cuenta",
      href: "/client/account",
      visible: auth?.getIsLogged(),
    },
    {
      name: "Espacios",
      href: "/client",
      visible: auth?.getIsLogged(),
    },
    {
      name: "FAQs",
      href: "/help",
      visible: true,
    },
    {
      name: "Politicas de privacidad",
      href: "/help/terms",
      visible: true,
    },
    {
      name: `${auth?.getIsLogged() ? "Cerrar sesión" : "Iniciar sesión"}`,
      href: `${auth?.getIsLogged() ? "/auth/logout" : "/auth"}`,
      visible: true,
    },
  ];

  return (
    <>
      {!isOpen ? (
        <>
          {!auth?.getIsLogged() ? (
            <div className="lg:hidden" onClick={handleClick}>
              <Image
                src="/icon/hamburger.svg"
                alt="hamburger"
                layout="fill"
                width="w-[30px]"
                height="w-[30px]"
                aspectRatio="aspect-[1/1]"
                rounded=" "
              />
            </div>
          ) : (
            <div className="flex items-center gap-2" onClick={handleClick}>
              {childrenTrigger}
            </div>
          )}
        </>
      ) : (
        <>
          {createPortal(
            <div className="fixed left-0 top-0 z-[1000] flex h-screen w-screen items-center justify-center bg-[#ffffffc5] backdrop-blur-lg lg:hidden">
              <ImageNext
                src="/icon/cross.svg"
                alt="close"
                width={20}
                height={20}
                onClick={handleClick}
                className="absolute right-4 top-4 cursor-pointer"
              />
              <div className="seccion1-x-padding flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-2">
                  <p className="smalltext text-blue-700">MENU</p>
                  <div className=" flex w-full flex-col gap-2">
                    {itemsNav.map((item, index) => (
                      <>
                        {item.visible && (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            key={index}
                          >
                            <p className="subtitulo font-normal">{item.name}</p>
                          </Link>
                        )}
                      </>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="smalltext text-blue-700">CONTACTO</p>
                  <p className="bodyText font-light">ayuda@spaces.com</p>
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </>
  );
}
