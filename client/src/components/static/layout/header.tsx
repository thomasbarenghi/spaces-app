import { useAppSelector } from "@/redux/hooks";
import { HorizontalNav, ProfileAction } from "@/components";
import { useRouter } from "next/router";
import { AuthClass } from "@/utils/types/client";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";

type HeaderProps = {
  alwaysAlternative?: boolean;
};

export default function Header({ alwaysAlternative }: HeaderProps) {
  const router = useRouter();

  const inPublicArea =
    router.pathname === "/" ||
    router.pathname === "/about" ||
    router.pathname.startsWith("/help");

  const inAuthArea = router.pathname.startsWith("/auth");

  const [headerType, setHeaderType] = useState<"default" | "alternative">(
    alwaysAlternative ? "alternative" : "default"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType("alternative");
      } else {
        setHeaderType(alwaysAlternative ? "alternative" : "default");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const childrenTriggerPublic = (
    <Link
      href="/help"
      className={headerType === "alternative" ? "text-black" : "text-white"}
    >
      Ayuda
    </Link>
  );

  const itemsPublicNav = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Sobre nosotros",
      href: "/about",
    },
    {
      name: "Ayuda",
      href: "/help",
      hasPopover: true,
      childrenTrigger: childrenTriggerPublic,
      itemsNav: [
        {
          name: "Inicio",
          href: "/help",
        },
        {
          name: "Términos",
          href: "/help/terms",
        },
      ],
    },
  ];

  if (inAuthArea)
    return (
      <header className="fixed left-0 top-0 flex h-[97px] items-center justify-center ">
        <div className=" seccion1-x">
          <div className="containerInner">
            <Logo type="white" />
          </div>
        </div>
      </header>
    );
  else
    return (
      <header
        className="header h-[97px] "
        style={
          headerType === "alternative"
            ? { background: "#FFFFFF", backdropFilter: "blur(5px)", top: 0 }
            : {}
        }
      >
        <div className="headerInner ">
          <Logo type="normal" headerType={headerType} />
          <div className="absolute left-[50%]  hidden  w-max  translate-x-[-50%] lg:flex">
            {inPublicArea ? (
              <HorizontalNav
                items={itemsPublicNav}
                textColor={
                  headerType === "alternative" ? "text-black" : "text-white"
                }
              />
            ) : (
              <HorizontalNav
                items={itemsPublicNav}
                textColor={
                  headerType === "alternative" ? "text-black" : "text-white"
                }
              />
            )}
          </div>
          <ProfileAction
            textColor={
              headerType === "alternative" ? "text-black" : "text-white"
            }
          />
        </div>
      </header>
    );
}

type LogoProps = {
  type?: "white" | "normal";
  headerType?: "default" | "alternative";
};

function Logo({ type, headerType }: LogoProps) {
  const router = useRouter();
  const { auth: sAuth } = useAppSelector((state) => state?.authSession);
  const auth = AuthClass.deserialize(sAuth);

  return (
    <ReactSVG
      onClick={() => router.push(auth.getIsLogged() ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      className={`aspect-[98/30] h-[30px] w-[98px] cursor-pointer fill-current 
      ${headerType === "alternative" ? "text-black" : "text-white"}
      `}
    />
  );
}
