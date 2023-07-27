import { SpaceForm } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { createSpace } from "@/redux/slices/client/spaces/spaces";
import { useState } from "react";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

type SpaceCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function SpaceCreateForm({
  setManualClose,
  setLoading,
}: SpaceCreateFormProps) {
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

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      await submitManager({
        e,
        formValues,
        errors,
        dispatch,
        actionToDispatch: createSpace,
        setFormValues,
      });
      setManualClose(true);
      setLoading(false);
      setTimeout(() => {
        setManualClose(false);
      }, 200);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Verifica los campos del formulario", toastError);
    }
  };

  return (
    <SpaceForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      title="Crear espacio"
      hasDefaultValues={false}
      handleDelete={() => {}}
    />
  );
}
