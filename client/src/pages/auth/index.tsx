import { AuthLayout } from "@/components";
import { Input, GoogleButton } from "@/components";
import Link from "next/link";
import Head from "next/head";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSession";
import useRegister from "@/hooks/useRegister";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import useValidate from "@/hooks/useValidate";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  //quitamos todo lo que esta antes del primer signo de interrogacion
  const query: string = router.asPath.split("auth")[1] || "";

  const dispatch = useAppDispatch();
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await submitManager({
        e,
        formValues,
        errors,
        dispatch,
        actionToDispatch: login,
        setFormValues,
      });
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario", toastError);
    }
  };

  return (
    <>
      <Head>
        <title>Iniciar sesion | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <AuthLayout>
        <h1 className="titulo-3 mb-6 font-normal">
          Hey, bienvenido <span className="font-semibold">de nuevo</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            className="w-full"
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
            onChange={handleChange}
            error={errors.password}
          />
          {/* <p className=" w-full text-center font-light">
            ¿No recuerdas tu contraseña?{" "}
            <Link href="/auth/recover" className="font-medium text-blue-700">
              Recuperar
            </Link>
          </p> */}
          <button type="submit" className="primaryButton">
            Ingresar
          </button>
        </form>
        {/* <hr className="my-6 w-full" /> */}
        {/* <GoogleButton /> */}
        <p className="mt-6 w-full text-center font-light">
          ¿No tienes una cuenta?{" "}
          <Link
            href={`/auth/register${query}`}
            className="font-medium text-blue-700"
          >
            Regístrate
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
