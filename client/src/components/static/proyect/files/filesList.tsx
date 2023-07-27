import { FilesProps } from "@/utils/types/client";
import { FileForm, ListTopArea } from "@/components";
import { ModalTrigger } from "@/components";
import { GeneralPermission } from "@/utils/types/client/spaces/members";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { MembersProps } from "@/utils/types/client/spaces/members";
import { ReactSVG } from "react-svg";
import {
  deleteFile,
  setCurrentFile,
  editFile,
} from "@/redux/slices/client/spaces/files";
import { useState } from "react";
import { toast } from "sonner";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import useValidate from "@/hooks/useValidate";
import Link from "next/link";
type FilesListProps = {
  files: FilesProps[];
};

export default function FilesList({ files }: FilesListProps) {
  return (
    <section className="listContainer ">
      <ListTopArea
        title="Archivos"
        description="Administra los archivos de tu espacio"
        buttonText="Invitar a un amigo"
        controls={false}
      />
      <div className="gridContainer lg:grid-cols-2 xl:grid-cols-3">
        {Array.isArray(files) &&
          files.map((file: FilesProps) => <FileItem file={file} />)}
      </div>
    </section>
  );
}

type FileItemProps = {
  file: FilesProps;
};

function FileItem({ file }: FileItemProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [manualClose, setManualClose] = useState<boolean>(false);

  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      await submitManager({
        e,
        formValues,
        errors,
        dispatch,
        actionToDispatch: editFile,
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
      toast.error("Verifica los campos del formulario");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleDelete = async (fileId: string) => {
    setLoading(true);
    await dispatch(deleteFile({ fileId: fileId }));
    setManualClose(true);
    setLoading(false);
    setTimeout(() => {
      setManualClose(false);
    }, 200);
  };

  const { currentMember: cMember } = useAppSelector(
    (state) => state.client.spaces.spaces
  );
  const { fileLoading } = useAppSelector((state) => state.client.spaces.files);

  const currentMember = new MembersProps(cMember.user, cMember.role);

  const childrenTrigger = (
    <ReactSVG src="/icon/sidebar/config.svg" className="h-5 w-5" />
  );

  return (
    <div className="flex h-max items-center justify-between gap-3 rounded-3xl bg-white  p-4 pr-8">
      <div className="flex gap-2">
        {/* <Image
          src={file?.src}
          alt="file"
          layout="fill"
          aspectRatio="1/1"
          width="w-[80px]"
          height="h-[80px]"
          rounded="rounded-2xl"
          containerClassName="aspect-square"
        /> */}
        <div className="flex flex-col items-start justify-between pb-2">
          <div>
            <p className="smalltext  font-medium">{file?.name}</p>
            <p className="smalltext break-all ">{file?.description}</p>
            <p className="mb-1 mt-2 text-sm font-medium">
              Por {file.owner.firstName + " " + file.owner.lastName}
            </p>
          </div>
          <Link
            className="terceryButton text-sm"
            href={file.src}
            target="_blank"
            download
          >
            Descargar
          </Link>
        </div>
      </div>
      {(currentMember.hasPermission(GeneralPermission.DeleteFile) ||
        currentMember.getId() === file.owner.id) && (
        <div
          onClick={() => {
            dispatch(setCurrentFile(file));
          }}
        >
          <ModalTrigger
            triggerText={childrenTrigger}
            buttonType="terceryButton"
            classname=""
            loading={fileLoading}
            manualClose={manualClose}
          >
            <FileForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              hasDefaultValues={true}
              handleDelete={() => handleDelete(file.id)}
              title="Editar archivo"
            />
          </ModalTrigger>
        </div>
      )}
    </div>
  );
}
