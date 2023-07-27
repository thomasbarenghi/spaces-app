import { useRouter } from "next/router";
import Head from "next/head";
import { Main, Footer, Header } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { joinSpace } from "@/redux/slices/client/spaces/spaces";

export default function JoinSpace() {
  const router = useRouter();
  const { spaceId, spaceName, accessCode } = router.query;

  const dispatch = useAppDispatch();

  const handleJoinSpace = () => {
    if (spaceId && accessCode) {
      dispatch(
        joinSpace({
          spaceId: spaceId as string,
          accessCode: accessCode as string,
        })
      );
    }
  };

  return (
    <>
      <Head>
        <title>Unirse a un espacio</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <Main>
        <Header alwaysAlternative={true} />
        <section className="seccion1-x mt-[96px] flex flex-col gap-6 pb-12 ">
          <div className="flex h-[60vh] flex-col items-center justify-center">
            <h1 className="titulo-1">Unirse a un espacio</h1>
            <p className="bodyText">
              Estás a punto de unirte al espacio {spaceName}, ¿Estás seguro?
            </p>
            <button className="primaryButton mt-3" onClick={handleJoinSpace}>
              Unirse
            </button>
          </div>
        </section>
        <Footer />
      </Main>
    </>
  );
}
