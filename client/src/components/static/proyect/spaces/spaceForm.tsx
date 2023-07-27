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

export default function SpaceForm({
  handleChange,
  handleSubmit,
  errors,
  hasDefaultValues,
  handleDelete,
  title,
}: FormProps) {
  const { currentSpace: cSpace, currentMember: cMember } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentMember = MembersProps.deserialize(cMember);

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
          defaultValue={hasDefaultValues ? currentSpace?.getName() : ""}
        />

        <Input
          label="Descripción"
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          required={hasDefaultValues ? false : true}
          error={errors.description}
          defaultValue={hasDefaultValues ? currentSpace?.getDescription() : ""}
        />

        <Input
          label="Imagen de portada"
          type="file"
          name="coverImage"
          onChange={handleChange}
          placeholder="Imagen de portada"
          required={hasDefaultValues ? false : true}
          error={errors.coverImage}
        />

        <Input
          label="Código de acceso"
          type="text"
          name="accessCode"
          onChange={handleChange}
          placeholder="Código de acceso"
          required={hasDefaultValues ? false : true}
          error={errors.accessCode}
          defaultValue={hasDefaultValues ? currentSpace?.getAccessCode() : ""}
        />
        <div className="flex gap-2">
          {currentMember.hasPermission(GeneralPermission.DeleteSpace) &&
            hasDefaultValues && (
              // <button
              //   type="button"
              //   className="secondaryButton mt-4 whitespace-nowrap bg-red-200  text-red-800"
              //   onClick={() => handleDelete()}
              // >
              //   Borrar
              // </button>
              <ConfirmationModal
                confirmText="¿Estás seguro que quieres borrar este espacio?"
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
