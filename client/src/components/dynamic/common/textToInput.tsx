import { useState } from "react";
import NextImage from "next/image";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";

type TextToInputProps = {
  text: any;
  title: string;
  inputType?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "file"
    | "select";
  inputTag: "input" | "textarea" | "image" | "file" | "select";
  setResultText: (data: any) => void;
  name: string;
  selectOptions?: any;
  setNowEditing: (data: any) => void;
};

export default function TextToInput({
  text,
  setResultText,
  title,
  inputType,
  inputTag,
  name,
  selectOptions,
  setNowEditing,
}: TextToInputProps) {
  const [editing, setEditing] = useState<boolean>(false);

  const [selectValue, setSelectValue] = useState<string>(text.label);

  const handleSave = (e: any) => {
    e.preventDefault();
    setEditing(false);
    if (inputTag === "image") {
      setResultText({
        key: name,
        text: e.target[name].files[0],
      });
    } else {
      setResultText({
        key: name,
        text: e.target[name].value,
      });
    }
  };

  useEffect(() => {
    setNowEditing(editing);
  }, [editing]);

  return (
    <div>
      <p className="bodyText text-blue-700">{title}</p>

      {editing ? (
        <>
          <form className="w-full" onSubmit={(e) => handleSave(e)}>
            {inputTag === "input" ? (
              <input
                type="text"
                name={name}
                className="w-full font-normal"
                defaultValue={text}
                required
              />
            ) : inputTag === "textarea" ? (
              <textarea
                name={name}
                className="w-full font-normal"
                defaultValue={text}
                required
              />
            ) : inputTag === "image" ? (
              <input
                type="file"
                name={name}
                className="w-full font-normal"
                required
              />
            ) : (
              <>
                <FormControl fullWidth size="small">
                  <Select
                    name={name}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(e: SelectChangeEvent) => {
                      setSelectValue(e.target.value);
                    }}
                  >
                    {selectOptions.map((option: any, index: any) => (
                      <MenuItem value={option.value} key={index}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <div className="mt-1 flex gap-1">
              <button
                className="terceryButton text-red-700"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="terceryButton">
                Guardar
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-start justify-start gap-2">
            {inputTag !== "image" ? (
              <p className="bodyText mb-1  font-normal text-black">
                {inputTag === "select" ? text.label : text}
              </p>
            ) : (
              <div className="relative h-[200px] w-[200px] ">
                <NextImage
                  src={text}
                  alt="SpaceCover"
                  layout="fill"
                  className="aspect-square rounded-[20px]"
                />
              </div>
            )}
            <NextImage
              src="/icon/pencil.svg"
              alt="edit"
              width={16}
              height={16}
              className="cursor-pointer pt-1"
              onClick={() => setEditing(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}
