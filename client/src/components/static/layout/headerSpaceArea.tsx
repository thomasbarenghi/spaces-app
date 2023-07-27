import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import { useAppSelector } from "@/redux/hooks";
import { ProfileAction } from "@/components";
import { AuthClass } from "@/utils/types/client";
import { useEffect, useState } from "react";

export default function HeaderSpaceArea() {
  const router = useRouter();

  const [headerType, setHeaderType] = useState<"default" | "alternative">(
    "default"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setHeaderType("alternative");
      } else {
        setHeaderType("default");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-[97px] w-full items-center justify-center ${
        headerType === "default" ? "flex" : "hidden"
      } `}
    >
      <div className="seccion1-x ">
        <div className="containerInner flex w-full items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo type="normal" />
          </div>
          <ProfileAction />
        </div>
      </div>
    </header>
  );
}

function Logo({ type }: any) {
  const router = useRouter();
  const { auth: sAuth } = useAppSelector((state) => state?.authSession);
  const auth = AuthClass.deserialize(sAuth);

  return (
    <ReactSVG
      onClick={() => router.push(auth.getIsLogged() ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      className="aspect-[98/30] h-[30px] w-[98px] cursor-pointer fill-current text-white lg:text-white"
    />
  );
}
