import { TaskForm } from "@/components";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { createTask } from "@/redux/slices/client/spaces/tasks";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

type TaskCreateFormProps = {
  setManualClose: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function TaskCreateForm({
  setManualClose,
  setLoading,
}: TaskCreateFormProps) {
  const dispatch = useAppDispatch();
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [selected, setSelected] = useState<any>([]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormValues({
      ...formValues,
      status: parseInt(e.target.value),
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
        actionToDispatch: createTask,
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

  // const [selected, setSelected] = useState<any>(
  //   currentTask.assignedTo.map((item) => {
  //     const member = MembersProps.deserialize(item);
  //     return {
  //       value: member.getId(),
  //       label: member.getFullName(),
  //     };
  //   })
  // );

  useEffect(() => {
    setFormValues({
      ...formValues,
      assignedToIds: selected.map((item: any) => item.value),
    });
  }, [selected]);

  return (
    <TaskForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      title="Crear tarea"
      handleDelete={() => {}}
      hasDefaultValues={false}
      selected={selected}
      setSelected={setSelected}
      handleSelectChange={handleSelectChange}
    />
  );
}
