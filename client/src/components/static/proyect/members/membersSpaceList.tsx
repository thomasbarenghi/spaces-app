//Redux
import { MembersProps, GeneralPermission } from "@/utils/types/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  expulseMember,
  changeUserRole,
} from "@/redux/slices/client/spaces/spaces";
//Components
import {
  ConfirmationModal,
  ModalTrigger,
  MemberPicture,
  ListTopArea,
  Popover,
} from "@/components";
//React
import { useState } from "react";
//MUI
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//Others
import { ReactSVG } from "react-svg";

type MembersListProps = {
  adminZone: boolean;
};

export default function MembersSpaceList({ adminZone }: MembersListProps) {
  const dispatch = useAppDispatch();
  const { currentSpaceMembers: members, currentMember: cMember } =
    useAppSelector((state) => state?.client?.spaces?.spaces);

  const currentMember = MembersProps.deserialize(cMember);

  const childrenTrigger = (
    <ReactSVG
      src="/icon/sidebar/config.svg"
      className="h-5 w-5 fill-current text-blue-700"
    />
  );

  return (
    <section className="listContainer">
      <ListTopArea
        title={adminZone ? "Edita los miembros del espacio" : "Miembros"}
        description={
          adminZone
            ? "Puedes editar roles o expulsar usuarios"
            : "Miembros del espacio"
        }
        buttonText="Invitar a un amigo"
        controls={false}
      />
      <div className="gridContainer">
        {Array.isArray(members) &&
          members.map((memb) => {
            const member = MembersProps.deserialize(memb);
            return (
              <div className="flex w-full items-center justify-between gap-3 rounded-3xl border-[0.5px]  border-none bg-white py-5 pl-5 pr-8 shadow-sm lg:border-slate-200 lg:bg-white">
                <div className="flex items-center gap-3">
                  <MemberPicture
                    member={member}
                    size="large"
                    hasMargin={false}
                  />
                  <div className="flex flex-col">
                    <p className="subtitulo">{member?.getFullName()}</p>
                    <p className="smalltext">{member?.getFormattedRole()}</p>
                  </div>
                </div>
                <div>
                  {adminZone &&
                    currentMember.hasPermission(
                      GeneralPermission.DeleteMember
                    ) &&
                    currentMember.hasPermission(
                      GeneralPermission.EditMemberRole
                    ) &&
                    !member.isOwner() && (
                      <div>
                        <Popover
                          childrenTrigger={childrenTrigger}
                          PopoverBoxClassname="p-4 rounded-xl flex flex-col gap-1"
                        >
                          <ModalTrigger
                            triggerText="Editar"
                            buttonType="secondaryButton"
                            classname="px-4 py-2 text-sm w-full"
                          >
                            <EditRole
                              role={member?.getRole()}
                              userId={member?.getId()}
                            />
                          </ModalTrigger>
                          <ConfirmationModal
                            triggerText="Eliminar"
                            confirmText="Eliminar miembro"
                            confirmParagraph="Estas seguro que quieres eliminar a este miembro?"
                            triggerColor="bg-red-800 px-4 py-2 text-sm primaryButton w-full"
                            trueAction={() =>
                              dispatch(
                                expulseMember({ userId: member?.getId() })
                              )
                            }
                          />
                        </Popover>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

type editRoleProps = {
  role: string;
  userId: string;
};

function EditRole({ role, userId }: editRoleProps) {
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState<any>(role);
  const selectOptions = [
    { value: "admin", label: "Administrador" },
    { value: "member", label: "Miembro" },
  ];

  const handleSubmit = (e: any) => {
    if (selectValue === role) {
      return;
    }
    dispatch(changeUserRole({ role: selectValue, userId: userId }));
  };

  return (
    <div>
      <p className="subtitulo font-medium text-black">
        Editar el rol de un usuario
      </p>
      <p className="bodyText mb-4 font-light text-black">
        Selecciona el rol que deseas asignarle a este usuario
      </p>

      <>
        <FormControl fullWidth size="small">
          <Select
            name={"name"}
            labelId="demo-select-small-label"
            id="demo-select-small"
            displayEmpty
            value={selectValue}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e: SelectChangeEvent) => {
              setSelectValue(e.target.value);
            }}
          >
            <MenuItem value="" disabled>
              <em>Elige un valor</em>
            </MenuItem>
            {selectOptions.map((option: any) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
          <button
            type="button"
            className={` mt-4 w-full ${
              selectValue === role ? "disabledPrimaryButton" : "primaryButton"
            }`}
            disabled={selectValue === role}
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </FormControl>
      </>
    </div>
  );
}
