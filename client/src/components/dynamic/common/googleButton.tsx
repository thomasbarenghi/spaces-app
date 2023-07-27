import Image from "next/image";
import { useRouter } from "next/router";

export default function GoogleButton() {
  const router = useRouter();

  const handleLogin = async () => {
    router.push(`/client`);
  };

  return (
    <button
      className="text-base-medium flex w-full  items-center justify-center gap-2 rounded-full border px-8 py-2 text-black"
      style={{ background: "#fff" }}
      onClick={handleLogin}
    >
      <div className="rounded-full bg-white p-2">
        <Image
          src="/icon/google.png"
          alt="Google"
          width={15}
          height={15}
          className="aspect-square"
        />
      </div>
      <span>Continuar con Google</span>
    </button>
  );
}
