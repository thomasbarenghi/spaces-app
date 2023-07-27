import { Input, ConfirmationModal } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { GeneralPermission } from "@/utils/types/client";
import { SpaceProps, MembersProps } from "@/utils/types/client";

type FormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
  errors: any;
  hasDefaultValues?: boolean;
  handleDelete: () => void;
  title: string;
};

export default function FileForm({
  handleChange,
  handleSubmit,
  errors,
  hasDefaultValues,
  handleDelete,
  title,
}: FormProps) {
  const { currentSpaceFiles, currentFile } = useAppSelector(
    (state) => state.client.spaces.files
  );

  return (
    <div className=" flex  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">{title}</h1>
      <form className="flex w-full flex-col gap-4 " onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Nombre"
          required={hasDefaultValues ? false : true}
          error={errors.name}
          defaultValue={hasDefaultValues ? currentFile.name : ""}
        />
        <Input
          label="Descripción"
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          required={hasDefaultValues ? false : true}
          error={errors.description}
          defaultValue={hasDefaultValues ? currentFile.description : ""}
        />

        <Input
          label="Imagen"
          type="file"
          name="image"
          onChange={handleChange}
          placeholder="Imagen"
          required={hasDefaultValues ? false : true}
          error={errors.image}
        />
        <div className="flex gap-2">
          {hasDefaultValues && (
            // <button
            //   type="button"
            //   className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
            //   onClick={() => handleDelete()}
            // >
            //   Borrar
            // </button>
            <ConfirmationModal
              confirmText="¿Estás seguro que quieres borrar este room?"
              confirmParagraph="Esta acción no se puede deshacer"
              triggerText="Borrar"
              triggerClass="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
              triggerColor=""
              trueAction={handleDelete}
            />
          )}
          <button
            type="submit"
            className={` primaryButton mt-4 w-full
           `}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
