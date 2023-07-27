import { AuthLayout } from "@/components";
import { Input, GoogleButton } from "@/components";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import useRegister from "@/hooks/useRegister";
import { useAppDispatch } from "@/redux/hooks";
import { register } from "@/redux/slices/authSession";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import useValidate from "@/hooks/useValidate";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const onClick = () => {
    setStep(2);
  };

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
        actionToDispatch: register,
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
        <title>Registrarse | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <AuthLayout>
        <h1 className="titulo-3 mb-6 font-normal">
          Registrate en <span className="font-semibold">Spaces</span>
        </h1>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <div id="step1" className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                className="w-full"
                error={errors.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="lastName"
                label="Apellidos"
                placeholder="Apellidos"
                className="w-full"
                error={errors.lastName}
                onChange={handleChange}
              />
              <button type="button" className="primaryButton" onClick={onClick}>
                Siguiente
              </button>
            </div>
          )}
          {step === 2 && (
            <div id="step2" className="flex w-full flex-col gap-4">
              <Input
                type="email"
                name="email"
                label="Correo electrónico"
                placeholder="Correo electrónico"
                className="w-full"
                error={errors.email}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                className="w-full"
                error={errors.username}
              />
              <Input
                type="password"
                name="password"
                label="Contraseña"
                placeholder="Contraseña"
                error={errors.password}
                onChange={handleChange}
              />
              <button type="submit" className={`primaryButton `}>
                Registrarse
              </button>
            </div>
          )}
        </form>
        {/* <hr className="my-6 w-full" /> */}
        {/* <GoogleButton /> */}
        <p className="mt-6 w-full text-center font-light">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth" className="font-medium text-blue-700">
            Ingresar
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
