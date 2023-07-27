import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { GeneralPermission, MembersProps } from "@/utils/types/client";

type EditManagerProps = {
  children?: React.ReactNode;
  title: string;
  processedData: any;
  originalData: any;
  deleteAction: any;
  route: string;
  editAction: any;
  nowEditing: boolean;
  deletePermission: GeneralPermission;
};

export default function EditManager({
  processedData,
  originalData,
  children,
  title,
  deleteAction,
  editAction,
  deletePermission,
  nowEditing,
}: EditManagerProps) {
  const dispatch = useAppDispatch();
  const { currentMember: cMember } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

  const currentMember = MembersProps.deserialize(cMember);

  const handleSave = () => {
    let editedData = {};

    for (const key in originalData) {
      if (
        originalData[key] !== processedData[key as keyof typeof processedData]
      ) {
        editedData = { ...editedData, [key]: processedData[key] };
      }
    }
    editAction(editedData);
  };

  const handleDelete = async () => {
    deleteAction();
  };

  return (
    <div className=" flex  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">{title}</h1>
      {children}
      <div className="flex gap-2">
        {currentMember.hasPermission(deletePermission) && (
          <button
            className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
            onClick={() => handleDelete()}
          >
            Borrar
          </button>
        )}
        <button
          onClick={() => handleSave()}
          className={` mt-4 w-full ${
            nowEditing ? "disabledPrimaryButton" : "primaryButton"
          } `}
          disabled={nowEditing}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
