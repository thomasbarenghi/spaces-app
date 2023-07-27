import { MultiSelect } from "react-multi-select-component";

type MultiSelectProps = {
  options: any[];
  setSelected: (selected: any) => void;
  selected: any;
  label: string;
};

export default function MultiSelectC({
  options,
  selected,
  setSelected,
  label,
}: MultiSelectProps) {
  return (
    <label className="smalltext flex w-full min-w-0 flex-col gap-1 font-normal">
      {label}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </label>
  );
}
