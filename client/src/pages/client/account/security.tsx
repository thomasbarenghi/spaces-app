import {
  Input,
  LayoutSpaces,
  HeroAccountArea,
  AccountSection,
} from "@/components";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editUser } from "@/redux/slices/authSession";
import { useState } from "react";
import { UserProps } from "@/utils/types/client";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import useValidate from "@/hooks/useValidate";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

export default function AccountPage() {
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
        actionToDispatch: editUser,
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
        <title>Seguridad | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>

      <LayoutSpaces type="account">
        <HeroAccountArea />
        <AccountSection title="Seguridad" description="Edita tu contraseña">
          <form
            onSubmit={handleSubmit}
            className="flex w-full grid-cols-2  flex-col gap-4 lg:grid"
          >
            <div id="col1" className="flex w-full flex-col gap-4">
              <Input
                type="password"
                name="oldPassword"
                label="Contraseña actual"
                placeholder="Contraseña actual"
                className="w-full"
                onChange={handleChange}
                error={errors.oldPassword}
              />
            </div>
            <div id="col2" className="flex w-full flex-col gap-4">
              <Input
                type="password"
                name="newPassword"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                className="w-full"
                onChange={handleChange}
                error={errors.newPassword}
              />
            </div>
            <button type="submit" className="primaryButton w-40">
              Guardar
            </button>
          </form>
        </AccountSection>
      </LayoutSpaces>
    </>
  );
}
