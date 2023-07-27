import { Input, TaskItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { UserProps, TasksProps } from "@/utils/types/client";

export default function TasksList() {
  const selectOptions = [
    { value: 0, label: "De todos los miembros" },
    { value: 1, label: "Mis tareas" },
  ];

  const indexItems = ["Todas", "Pendiente", "En progreso", "Completado"];

  const [selectedOption, setSelectedOption] = useState(0);
  const [index, setIndex] = useState(0);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  const { currentRoomTasks } = useAppSelector(
    (state) => state?.client?.spaces?.tasks
  );

  const { current: cCurrent } = useAppSelector(
    (state) => state?.authSession.session
  );
  const currentUser = UserProps.deserialize(cCurrent);

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    let updatedTasks = [];

    if (index == 0) {
      updatedTasks = currentRoomTasks;
    } else if (index == 1) {
      updatedTasks = currentRoomTasks.filter((task) => task.status == index);
    } else if (index == 2) {
      updatedTasks = currentRoomTasks.filter((task) => task.status == index);
    } else {
      updatedTasks = currentRoomTasks.filter((task) => task.status == index);
    }

    if (selectedOption == 1) {
      updatedTasks = updatedTasks.filter((task) =>
        task.assignedTo.some((user) => user.user.id === currentUser?.id)
      );
    } else {
      updatedTasks = updatedTasks;
    }

    setTasks(updatedTasks);
  }, [index, currentRoomTasks, selectedOption]);

  return (
    <section className="listContainer  gap-0">
      <Indexer
        index={index}
        indexItems={indexItems}
        setIndex={setIndex}
        selectOptions={selectOptions}
        handleSelectChange={handleSelectChange}
        selectedOption={selectedOption}
      />
      <div className="gridContainer mt-6 rounded-3xl bg-[#F6F8FA] ">
        {Array.isArray(tasks) &&
          tasks.map((item: TasksProps) => (
            <TaskItem key={item.id} item={item} />
          ))}
      </div>
    </section>
  );
}

type IndexerProps = {
  index: number;
  indexItems: string[];
  setIndex: (index: number) => void;
  selectOptions: any;
  handleSelectChange: (selectedOption: any) => void;
  selectedOption: number;
};

function Indexer({
  index,
  indexItems,
  setIndex,
  selectOptions,
  handleSelectChange,
  selectedOption,
}: IndexerProps) {
  return (
    <div className="flex w-full  justify-between gap-4 overflow-x-auto rounded-2xl bg-white px-10 py-5">
      <div className="flex w-full justify-between gap-12">
        <div className="flex w-max gap-4 ">
          {indexItems.map((item, i) => (
            <button
              key={i}
              className={
                index === i
                  ? "whitespace-nowrap font-semibold"
                  : "whitespace-nowrap"
              }
              onClick={() => setIndex(i)}
            >
              {item}
            </button>
          ))}
        </div>
        <Input
          type="select"
          name="owner"
          selectOptions={selectOptions}
          handleSelectChange={handleSelectChange}
          label=""
          placeholder="Filtrar por:"
          className=""
          labelClass="max-w-max"
          selectSelected={selectOptions[selectedOption]}
        />
      </div>
    </div>
  );
}
