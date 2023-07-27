import ImageNext from "next/image";

const employees = [
  {
    title: "Jaime Velasquez",
    body: "Project Manager",
    image: "/image/team/jaime.png",
  },
  {
    title: "Thomas Barenghi",
    body: "Desarrollador Fullstack",
    image: "/image/team/thomas.png",
  },
  {
    title: "José Rojas",
    body: "Desarrollador Frontend",
    image: "/image/team/jose.png",
  },
];

export default function Members() {
  return (
    <section className="centerInner relative overflow-hidden   bg-slate-100 py-[80px] ">
      <div className="seccion2-x centerInner gap-10">
        <div className="centerInner">
          <p className="bodyText font-normal text-blue-700">Quienes somos</p>
          <h1 className="titulo-1 text-center">Conoce a nuestro equipo.</h1>
          <p className="bodyText mt-1 text-center">
            Nuestra misión es simplificar y mejorar tus procesos
          </p>
        </div>
        <div className="scrollbar-hide seccion1-x-padding  flex w-screen  gap-10 overflow-scroll lg:justify-center lg:gap-14 lg:overflow-visible">
          {employees.map((item, index) => (
            <Employees data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type EmployeesProps = {
  data: any;
};

function Employees({ data }: EmployeesProps) {
  return (
    <div className=" centerInner w-max max-w-[100vw]  gap-4" key={data.title}>
      <div className="relative aspect-square  min-w-[250px]  gap-4 overflow-hidden rounded-full">
        <ImageNext
          src={data.image}
          alt="hero-home"
          fill={true}
          className="aspect-square object-cover"
        />
      </div>
      <div className="centerInner">
        <h3 className="titulo-3">{data.title}</h3>
        <p className="bodyText">{data.body}</p>
      </div>
    </div>
  );
}
