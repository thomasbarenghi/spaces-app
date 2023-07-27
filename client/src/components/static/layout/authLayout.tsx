import { useRouter } from "next/router";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <section className="relative flex w-full flex-row justify-center">
      <div className="w-full items-center justify-center align-middle">
        <div className="relative flex h-full w-full flex-col items-center justify-center align-middle md:h-full md:min-h-screen md:flex-row">
          <div
            className="h-[300px] w-full bg-white sm:h-full "
            style={{
              backgroundImage: "url(/image/hero-auth.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "20vh",
            }}
          ></div>
          <div
            className=" flex h-full min-w-full flex-col items-start justify-center bg-white px-4 py-10 align-middle xs:px-8 sm:px-14 md:min-w-[50%] lg:min-w-[40%] xl:min-w-[35%] 2xl:min-w-[30%]"
            id="login"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
