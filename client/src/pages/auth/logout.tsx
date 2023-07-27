import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { resetReducer } from "@/redux/slices/authSession";
import { AuthClass } from "@/utils/types/client";

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth: sAuth } = useAppSelector((state) => state.authSession);
  const auth = AuthClass.deserialize(sAuth);
  const loginMethod = auth?.getLoginMethod();

  const logOutJson = async () => {
    dispatch(resetReducer());
    // resetPersist()
  };

  useEffect(() => {
    const logOut = async () => {
      await logOutJson();
      router.push("/");
    };

    if (loginMethod !== "") {
      logOut();
    } else {
      router.push("/");
    }
  }, []);

  return <></>; // Opcionalmente puedes retornar algún contenido o null si no necesitas mostrar nada en este componente
}
