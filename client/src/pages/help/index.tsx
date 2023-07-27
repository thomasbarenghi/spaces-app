import { Main, HelpHero, LayoutPublic } from "@/components";
import Head from "next/head";

type Terms = {
  id: number;
  title: string;
  subParrafos: string;
};

const faq: Terms[] = [
  {
    id: 1,
    title: "¿Cómo puedo empezar a usar la aplicación?",
    subParrafos:
      "Es fácil comenzar a utilizar nuestra aplicación. Solo necesitas crear una cuenta y, una vez dentro, podrás crear tus propios espacios para equipos y proyectos. Desde allí, podrás invitar a otros miembros de tu equipo y comenzar a trabajar en conjunto.",
  },
  {
    id: 2,
    title: "¿Cuál es la diferencia entre espacios y rooms?",
    subParrafos:
      'Los "espacios" son áreas de trabajo generales, donde puedes organizar diferentes proyectos para equipos específicos. Los "rooms" son proyectos individuales dentro de un espacio, donde puedes dividir y gestionar las tareas para cada proyecto de manera más específica.',
  },
  {
    id: 3,
    title: "¿Cómo puedo invitar a otros miembros de mi equipo a un espacio?",
    subParrafos:
      'Para invitar a nuevos miembros a un espacio, ve al espacio y busca la opción "Invitar a un amigo" o comparte tu codigo de ingreso.',
  },
  {
    id: 4,
    title: "¿Qué puedo hacer dentro de un room?",
    subParrafos:
      "Dentro de un room, puedes crear tareas individuales para el proyecto en curso. Puedes asignar tareas a diferentes miembros del equipo. y cambiar el estado de la tarea.",
  },
  {
    id: 5,
    title:
      "¿Existe algún límite en la cantidad de espacios, rooms o tareas que puedo crear?",
    subParrafos:
      "Nuestra aplicación está diseñada para adaptarse a las necesidades de tu equipo, por lo que no hay límites estrictos en la cantidad de espacios, rooms o tareas que puedes crear. Sin embargo, recomendamos mantener la organización y evitar la creación excesiva de elementos para mantener la eficiencia.",
  },
  {
    id: 6,
    title: "¿Cómo funciona la función de chat en la aplicación?",
    subParrafos:
      "La función de chat te permite comunicarte de forma instantánea con otros miembros del equipo dentro de un espacio o room específico. Puedes compartir ideas, archivos y discutir el progreso del proyecto en tiempo real.",
  },
  {
    id: 7,
    title: "¿Puedo adjuntar archivos en los espacios?",
    subParrafos:
      " Sí, puedes adjuntar archivos relevantes a las tareas para que los miembros del equipo tengan acceso a la información necesaria para completarlas con éxito",
  },
  {
    id: 8,
    title:
      "¿Qué medidas de seguridad se aplican para proteger la privacidad de nuestros datos?",
    subParrafos:
      "Nos tomamos en serio la seguridad y la privacidad de tus datos. Utilizamos medidas de seguridad avanzadas para proteger la información y cumplimos con las regulaciones de privacidad aplicables. Para obtener más detalles, consulta nuestras condiciones de uso.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Ayuda | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <Main>
        <LayoutPublic>
          <HelpHero
            title="Centro de ayuda"
            body="En nuestro centro de ayuda, nos esforzamos por proporcionar una experiencia de usuario excepcional a todos nuestros clientes. "
            image="/image/hero-home.png"
            height="h-[55vh]"
          />
          <section className="seccion1-y seccion2-x flex flex-col gap-[40px] ">
            <div>
              <p className="bodyText font-normal text-blue-700">
                Resuelve tus dudas
              </p>
              <h2 className="titulo-3 font-medium">Preguntas frecuentes</h2>
            </div>
            <div className=" grid gap-[40px] md:grid-cols-2 ">
              {faq.map((faq) => (
                <TermItems key={faq.id} term={faq} />
              ))}
            </div>
          </section>
        </LayoutPublic>
      </Main>
    </>
  );
}

type props = {
  term: Terms;
};

const TermItems = ({ term }: props) => {
  const { subParrafos, title, id } = term;

  return (
    <>
      <div className=" flex flex-col gap-3  ">
        <h3 className="subtitulo font-medium  ">
          <span className="">{id}.</span> {title}
        </h3>
        <ol>
          <li className=" bodyText">{subParrafos}</li>
        </ol>
      </div>
    </>
  );
};
