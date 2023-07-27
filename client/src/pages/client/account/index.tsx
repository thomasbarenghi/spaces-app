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
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});

  const { current: sCurrent } = useAppSelector(
    (state) => state.authSession.session
  );

  const current = UserProps.deserialize(sCurrent);

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
        <title>Mi cuenta | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>

      <LayoutSpaces type="account">
        <HeroAccountArea />
        <AccountSection title="Mi cuenta" description="Edita tu perfil">
          <form
            onSubmit={handleSubmit}
            className="flex w-full grid-cols-2  flex-col gap-6 lg:grid"
          >
            <div id="col1" className="hidden w-full flex-col gap-4 lg:flex ">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                className="w-full"
                defaultValue={current?.getFirstName()}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                className="w-full"
                defaultValue={current?.getEmail()}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                type="file"
                name="profileImage"
                label="Foto de perfil"
                placeholder="Foto de perfil"
                className="w-full"
                onChange={handleChange}
                error={errors.profileImage}
              />
            </div>
            <div id="col2" className="hidden w-full flex-col gap-4 lg:flex">
              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="Apellido"
                className="w-full"
                defaultValue={current?.getLastName()}
                onChange={handleChange}
                error={errors.lastName}
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                className="w-full"
                defaultValue={current?.getUsername()}
                onChange={handleChange}
                error={errors.username}
              />
              <Input
                type="file"
                name="coverImage"
                label="Foto de portada"
                placeholder="Foto de portada"
                className="w-full"
                onChange={handleChange}
                error={errors.coverImage}
              />
            </div>
            <div id="col3" className="flex w-full flex-col gap-4 lg:hidden ">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                className="w-full"
                defaultValue={current?.getFirstName()}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="Apellido"
                className="w-full"
                defaultValue={current?.getLastName()}
                onChange={handleChange}
                error={errors.lastName}
              />
              <Input
                type="text"
                name="email"
                label="Email"
                onChange={handleChange}
                placeholder="Email"
                className="w-full"
                defaultValue={current?.getEmail()}
                error={errors.email}
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                className="w-full"
                defaultValue={current?.getUsername()}
                onChange={handleChange}
                error={errors.username}
              />
              <Input
                type="file"
                name="profileImage"
                label="Foto de perfil"
                placeholder="Foto de perfil"
                className="w-full"
                onChange={handleChange}
                error={errors.profileImage}
              />
              <Input
                type="file"
                name="coverImage"
                label="Foto de portada"
                placeholder="Foto de portada"
                className="w-full"
                onChange={handleChange}
                error={errors.coverImage}
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
