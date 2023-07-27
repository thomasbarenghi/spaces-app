type HrProps = {
  hasPadding?: boolean;
  classname?: string;
};

export default function Hr({ hasPadding = false, classname }: HrProps) {
  return (
    <section
      className={
        hasPadding
          ? `seccion1-x w-full pt-2 ${classname} `
          : `w-full pt-2 ${classname}`
      }
    >
      <hr className="hr1" />
    </section>
  );
}
