//Redux
import { useAppDispatch } from "@/redux/hooks";
import {
  editTask,
  deleteTask,
  setCurrentTask,
} from "@/redux/slices/client/spaces/tasks";
import { MembersList, ModalTrigger, TaskForm } from "@/components";
import { TasksProps, MembersProps } from "@/utils/types/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

type TaskItemProps = {
  item: TasksProps;
};

export default function TaskItem({ item }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const validate = useValidate();
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [selected, setSelected] = useState<any>(
    item.assignedTo.map((item) => {
      const member = MembersProps.deserialize(item);
      return {
        value: member.getId(),
        label: member.getFullName(),
      };
    })
  );

  item = TasksProps.deserialize(item);

  const handleEditing = () => {
    dispatch(setCurrentTask(item));
    setEditing(true);
  };

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
        actionToDispatch: editTask,
        setFormValues,
      });

      setLoading(false);

      setEditing(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Verifica los campos del formulario", toastError);
    }
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      assignedToIds: selected.map((item: any) => item.value),
    });
  }, [selected]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await dispatch(deleteTask());

      setEditing(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const defaultClass =
    "font-medium  smalltext font-medium rounded-full w-max px-2 py-1";
  const completedClass = "text-green-900  bg-green-200  font-medium ";
  const inProgressClass = "text-orange-900 font-medium bg-orange-200  ";
  const toDoClass = "text-sky-900 font-medium bg-sky-200  ";

  const statusClass =
    item.status == 1
      ? toDoClass
      : item.status == 2
      ? inProgressClass
      : completedClass;

  return (
    <div
      key={item.id}
      className="relative flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-5 shadow-sm"
    >
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className={statusClass + defaultClass}>
            {item?.getFormattedStatus()}
          </p>
          <Image
            src="/icon/settings.svg"
            width={20}
            height={20}
            alt="settings"
            className="cursor-pointer "
            onClick={handleEditing}
          />
        </div>
        <div>
          <p className="subitulo font-medium">{item?.getTitle()}</p>
          <p className="smalltext font-light">{item?.getDescription()}</p>
        </div>
      </div>
      <MembersList
        members={item?.getAssignedTo()}
        size="small"
        pictureHasMargin={true}
      />
      {editing && (
        <ModalTrigger
          triggerText={""}
          buttonType="primaryButton"
          loading={loading}
          alwaysOpen={editing}
          alwaysOpenCloser={() => setEditing(false)}
        >
          <TaskForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            hasDefaultValues={true}
            handleDelete={handleDelete}
            title="Editar tarea"
            selected={selected}
            setSelected={setSelected}
            handleSelectChange={handleSelectChange}
            formValues={formValues}
          />
        </ModalTrigger>
      )}
    </div>
  );
}
