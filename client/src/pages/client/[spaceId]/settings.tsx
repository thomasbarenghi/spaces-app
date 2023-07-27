import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteSpace, editSpace } from "@/redux/slices/client/spaces/spaces";
import Head from "next/head";
import { SpaceProps } from "@/utils/types/client";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";
import {
  LayoutSpaces,
  MembersSpaceList,
  HeroSpaceArea,
  SpaceForm,
} from "@/components";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";

export default function SpaceSettings() {
  const dispatch = useAppDispatch();

  const { currentSpace: cSpace } = useAppSelector(
    (state) => state.client.spaces.spaces
  );

  const currentSpace = SpaceProps.deserialize(cSpace);

  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);

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
      setLoading(true);
      await submitManager({
        e,
        formValues,
        errors,
        dispatch,
        actionToDispatch: editSpace,
        setFormValues,
      });

      setManualClose(true);
      setLoading(false);
      setTimeout(() => {
        setManualClose(false);
      }, 200);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Verifica los campos del formulario", toastError);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteSpace());
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

  return (
    <>
      <Head>
        <title>Configuracion del espacio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Editar espacio"
          primaryLoading={loading}
          primaryManualClose={manualClose}
        >
          <SpaceForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            hasDefaultValues={true}
            handleDelete={handleDelete}
            title="Editar espacio"
          />
        </HeroSpaceArea>
        <MembersSpaceList adminZone={true} />
      </LayoutSpaces>
    </>
  );
}
