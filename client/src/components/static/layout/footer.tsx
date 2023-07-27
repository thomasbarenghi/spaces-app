import { Image } from "@/components";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";

export default function Footer() {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authSession);

  const isHidden = router.pathname.startsWith("/client/[spaceId]");

  if (isHidden) return null;
  return (
    <footer className="footer  ">
      <div className="footerInner h-[200px] items-start justify-center ">
        <Image
          onClick={() => router.push(auth.isLogged ? "/client" : "/")}
          src="/icon/logo.svg"
          alt="Logo"
          layout="fill"
          width="w-[98px]"
          height="w-[30px]"
          aspectRatio="aspect-[98/30]"
          containerClassName="cursor-pointer"
        />
      </div>
    </footer>
  );
}
