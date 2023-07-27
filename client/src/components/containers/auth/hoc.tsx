import { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { setAuth, setSession, resetReducer } from "@/redux/slices/authSession";
import { AuthClass, UserProps } from "@/utils/types/client";
import { VERIFY_SESSION } from "@/graphql/queries";
import client from "@/graphql/apollo-client";

type Props = {
  children: ReactNode;
};

const HOC: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    session: { current: sSession },
    auth: sAuth,
  } = useAppSelector((state) => state.authSession);

  const {
    loginMethod: loginMethodQy,
    id: userIdQy,
    status: statusQy,
    session: sessionQy,
  } = router.query;

  const session = UserProps.deserialize(sSession);
  const auth = AuthClass.deserialize(sAuth);
  const userId = session?.getId() || (userIdQy ?? "");

  const verifySession = async (data: AuthClass) => {
    if (data.isLogged && userId) {
      const { data: verifData } = await client.query({
        query: VERIFY_SESSION,
        variables: {
          userId: userId,
        },
      });

      if (verifData.verifySession === true) {
        dispatch(setAuth(data));
        await dispatch(setSession(userId as string));
      } else {
        console.log("Debes iniciar sesión primero");
        dispatch(resetReducer());
      }
    } else {
      console.log("Debes iniciar sesión primero");
    }
  };

  const setAuthFn = async () => {
    const authObj = new AuthClass(
      statusQy === "ok" ? true : false,
      loginMethodQy as string,
      sessionQy as string
    );

    verifySession(authObj);
  };

  const systemHoc = () => {
    if (router.pathname.startsWith("/client")) {
      if (auth?.getIsLogged()) {
        verifySession(auth);
      } else if (
        !auth?.isLogged &&
        loginMethodQy &&
        userIdQy &&
        statusQy &&
        sessionQy
      ) {
        setAuthFn();
      } else {
        if (router.pathname === "/client/joinspace") {
          router.push(`/auth?next=${router.asPath}`);
        } else {
          router.push("/");
        }
      }
    } else if (router.pathname.startsWith("/auth")) {
      if (auth?.getIsLogged()) {
        router.push("/client");
      }
    }
  };

  const delayedSystemStart = useMemo(
    () => debounce(() => systemHoc(), 500),
    [
      router.pathname,
      userId,
      auth?.getIsLogged(),
      loginMethodQy,
      userIdQy,
      statusQy,
      router.query,
      session?.getId(),
    ]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedSystemStart.cancel();
    };
    delayedSystemStart();
    return cancelDebounce;
  }, [delayedSystemStart]);

  // Rutas protegidas
  if (router?.pathname.startsWith("/client") && !auth?.getIsLogged()) {
    return null;
  }

  return <main>{children}</main>;
};

export default HOC;
