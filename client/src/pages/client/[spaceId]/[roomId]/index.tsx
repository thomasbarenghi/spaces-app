import {
  LayoutSpaces,
  TasksList,
  HeroSpaceArea,
  RoomForm,
  TaskCreateForm,
  CircularLoader,
} from "@/components";
import { deleteRoom, editRoom } from "@/redux/slices/client/spaces/rooms";
import {
  addTaskSubs,
  deleteTaskSubs,
  editTaskSubs,
} from "@/redux/slices/client/spaces/tasks";
import {
  NOTIFY_TASK_CHANGED,
  NOTIFY_TASK_CREATED,
  NOTIFY_TASK_DELETED,
} from "@/graphql/subscriptions";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import { useSubscription } from "@apollo/client";
import { RoomsProps } from "@/utils/types/client";
import useValidate from "@/hooks/useValidate";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import { toastError } from "@/utils/toastStyles";

export default function CurrentRoom() {
  const dispatch = useAppDispatch();
  const { currentRoom: cRoom, roomLoading } = useAppSelector(
    (state) => state?.client?.spaces?.rooms
  );

  const currentRoom = RoomsProps.deserialize(cRoom);

  const { data: datachange } = useSubscription(NOTIFY_TASK_CHANGED, {
    variables: { roomId: currentRoom?.id },
  });

  const { data: datacreate } = useSubscription(NOTIFY_TASK_CREATED, {
    variables: { roomId: currentRoom?.id },
  });

  const { data: datadelete } = useSubscription(NOTIFY_TASK_DELETED, {
    variables: { roomId: currentRoom?.id },
  });

  useEffect(() => {
    if (datachange?.notifyTaskChanged) {
      dispatch(editTaskSubs(datachange?.notifyTaskChanged));
    }
  }, [datachange]);

  useEffect(() => {
    if (datacreate?.notifyTaskCreated) {
      dispatch(addTaskSubs(datacreate?.notifyTaskCreated));
    }
  }, [datacreate]);

  useEffect(() => {
    if (datadelete?.notifyTaskDeleted) {
      dispatch(deleteTaskSubs(datadelete?.notifyTaskDeleted));
    }
  }, [datadelete]);

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
        actionToDispatch: editRoom,
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

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteRoom());
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

  return (
    <>
      <Head>
        <title>Room | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>

      <LayoutSpaces type="client">
        {roomLoading ? (
          <RoomLoader />
        ) : (
          <>
            <HeroSpaceArea
              current={currentRoom}
              type="room"
              secondaryLoading={loading}
              primaryLoading={loading}
              primaryManualClose={manualClose}
              secondaryManualClose={manualClose}
              triggerText="Crear una tarea"
              secondControls={true}
              secondTriggerIsAdmin={true}
              triggerIsAdmin={false}
              triggerSecondText="Editar room"
              childrenSecond={
                <RoomForm
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  hasDefaultValues={true}
                  handleDelete={handleDelete}
                  title="Editar room"
                />
              }
            >
              <TaskCreateForm
                setLoading={setLoading}
                setManualClose={setManualClose}
              />
            </HeroSpaceArea>
            <TasksList />
          </>
        )}
      </LayoutSpaces>
    </>
  );
}

function RoomLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-4">
        <CircularLoader />
        <div>
          <p className="subtitulo">Cargando tu room</p>
          <p className="text-sm font-light">Solo un momento mas...</p>
        </div>
      </div>
    </div>
  );
}
