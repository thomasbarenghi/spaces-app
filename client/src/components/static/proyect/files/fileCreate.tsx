import { FileForm } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { createFile } from "@/redux/slices/client/spaces/files";
import { useState } from "react";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

type RoomCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function FileCreate({
  setManualClose,
  setLoading,
}: RoomCreateFormProps) {
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
        actionToDispatch: createFile,
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
    <FileForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      title="Crear archivo"
      hasDefaultValues={false}
      handleDelete={() => {}}
    />
  );
}
