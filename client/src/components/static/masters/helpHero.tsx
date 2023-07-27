import ImageNext from "next/image";

type HelpHeroProps = {
  title: string;
  body: string;
  image: string;
  height?: string;
};

export default function HelpHero({
  title,
  body,
  image,
  height,
}: HelpHeroProps) {
  return (
    <section
      className={`relative  ${height} flex min-h-[250px] w-full items-center justify-center `}
    >
      <div className="seccion2-x z-[2] flex  min-h-[250px] w-full items-center justify-start ">
        <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full">
          <ImageNext
            src={image}
            alt="hero-help"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="z-[1] w-[100%] md:w-[60%]">
          <h1 className="titulo-1 z-[1] text-white ">{title}</h1>
          <p className="bodyText z-[1] text-white">{body}</p>
        </div>
      </div>
    </section>
  );
}
