import { LayoutPublic, Members } from "@/components";
import Head from "next/head";
import ImageNext from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sobre nosotros | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <LayoutPublic>
        <section className=" relative flex h-[65vh]  min-h-[450px] w-full  flex-col items-center justify-center  lg:h-[70vh] lg:min-h-[350px] ">
          <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full ">
            <ImageNext
              src="/image/hero-about.png"
              alt="hero-home"
              fill
              className="z-[0] object-cover "
            />
          </div>
          <div className="seccion2-x z-[1] w-full">
            <div className=" ">
              <h1 className="titulo-1 text-white ">Sobre Spaces y el equipo</h1>
              <p className="bodyText  text-white">
                Creemos en el poder de la colaboración y la tecnología para
                impulsar el éxito de los equipos y organizaciones. Nuestra
                visión es transformar la forma en que trabajamos y nos
                comunicamos, y llevar la productividad a nuevos niveles.
              </p>
            </div>
          </div>
        </section>
        <section className="centerInner bg-white">
          <div className="seccion2-x centerInner gap-10 py-[80px]">
            <div>
              <p className="bodyText font-normal text-blue-700">
                ¿Como lo hacemos?
              </p>
              <h1 className="titulo-1">Sobre la aplicación 🤯😎</h1>
              <p className="bodyText mt-1">
                Hace unos años, en un pequeño espacio de trabajo compartido, un
                grupo de apasionados emprendedores se encontró enfrentando los
                desafíos de la colaboración a distancia. La distancia geográfica
                parecía dificultar la comunicación y afectaba la productividad
                del equipo. Fue en ese momento cuando nació la idea de crear una
                solución innovadora que pudiera reunir a los equipos de trabajo
                sin importar su ubicación física.
              </p>
            </div>
          </div>
        </section>
        <Members />
        <section className="centerInner bg-white">
          <div className="seccion2-x centerInner gap-10 py-[80px]">
            <div className="w-full">
              <p className="bodyText font-normal text-blue-700">
                ¿Como funciona?
              </p>
              <h1 className="titulo-1">Tecnologías que usamos</h1>
            </div>
            <div className="lg:gap-estilo1 grid grid-cols-1 gap-10 md:grid-cols-2">
              {tecnologias.map((tecnologia) => (
                <div className="flex flex-col gap-3" key={tecnologia.id}>
                  <div className="flex flex-row items-center justify-start gap-3 align-middle">
                    <div className="relative h-[50px] max-h-[50px]  w-[50px] max-w-[50px] ">
                      <ImageNext
                        src={tecnologia.image}
                        alt={tecnologia.title}
                        layout="fill"
                        className="object-contain "
                      />
                    </div>
                    <h3 className="titulo-3  text-center">
                      {tecnologia.title}
                    </h3>
                  </div>
                  <p className="bodyText">{tecnologia.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LayoutPublic>
    </>
  );
}

export const tecnologias = [
  {
    id: 1,
    title: "NextJS",
    image: "/icon/tecnologias/next-js.svg",

    description:
      "Next.js es un framework de React para la construcción de aplicaciones web de alto rendimiento y de alto rendimiento. Next.js te ayuda a crear aplicaciones web de una sola página con React fácilmente.",
  },
  {
    id: 4,
    title: "Redux Toolkit",
    image: "/icon/tecnologias/redux.svg",
    description:
      "Redux es una librería de gestión de estado para aplicaciones JavaScript de una sola página (SPA). Se utiliza principalmente con React, pero también se puede utilizar con otras bibliotecas o marcos de trabajo de JavaScript. Redux se basa en la arquitectura Flux y se centra en la idea de que el estado de la aplicación debe ser centralizado y predecible.",
  },
  {
    id: 5,
    title: "Postman",
    image: "/icon/tecnologias/postman.svg",
    description:
      "Postman es una herramienta de colaboración para diseñar, probar y documentar las API. Con Postman puedes enviar solicitudes HTTP a un servidor web y recibir respuestas. Puedes organizar tus solicitudes en colecciones y agregar tests automatizados a tus solicitudes para asegurarte de que tus API funcionan correctamente.",
  },
  {
    id: 6,
    title: "Sass",
    image: "/icon/tecnologias/sass.svg",
    description:
      "Sass es un preprocesador de CSS que permite escribir código CSS de manera más eficiente y estructurada. Con Sass, puedes utilizar variables, anidamiento de selectores, mixins, funciones y operadores matemáticos, lo que facilita la escritura y el mantenimiento de hojas de estilo. Además, Sass permite la creación de archivos parciales que se pueden importar en otros archivos para una mayor modularidad y reutilización de código.",
  },
  {
    id: 7,
    title: "Figma",
    image: "/icon/tecnologias/figma.svg",
    description:
      "Figma es una herramienta de diseño de interfaz de usuario (UI) basada en la nube que permite a los diseñadores y equipos de diseño colaborar en tiempo real. Figma cuenta con una interfaz intuitiva y fácil de usar que permite crear diseños, prototipos y animaciones interactivas. Figma también ofrece una amplia variedad de recursos, como iconos, componentes, plantillas y complementos, que facilitan la creación de diseños de alta calidad de manera más rápida y eficiente.",
  },
  {
    id: 8,
    title: "TailwindCSS",
    image: "/icon/tecnologias/tailwindcss.svg",

    description:
      "Tailwind CSS es un framework de CSS de bajo nivel que te ayuda a crear diseños de interfaz de usuario (UI) de manera rápida y sencilla. Con Tailwind CSS, puedes crear diseños de interfaz de usuario (UI) personalizados sin tener que escribir CSS.",
  },
  {
    id: 10,
    title: "Spring Boot",
    image: "/icon/tecnologias/spring.svg",
    description:
      "Spring Boot es un framework de Java que se utiliza para crear aplicaciones web y servicios web. Spring Boot proporciona una configuración predeterminada para que puedas comenzar a desarrollar aplicaciones web de inmediato. Spring Boot también proporciona una amplia gama de bibliotecas y complementos que facilitan el desarrollo de aplicaciones web.",
  },
  {
    id: 12,
    title: "MongoDB",
    image: "/icon/tecnologias/mongo.svg",
    description:
      "MongoDB es una base de datos NoSQL de código abierto que se utiliza para almacenar datos en documentos JSON.",
  },

  {
    id: 15,
    title: "Cloudinary",
    image: "/icon/tecnologias/cloudinary.svg",

    description:
      "Cloudinary es un servicio de gestión de medios en la nube que permite a los usuarios almacenar, administrar y entregar imágenes y videos de manera eficiente.",
  },

  {
    id: 17,
    title: "Render",
    image: "/icon/tecnologias/render.svg",

    description:
      "Render.com es una plataforma en la nube que ofrece servicios de renderizado y despliegue de aplicaciones. Permite a los desarrolladores y diseñadores ejecutar y escalar fácilmente aplicaciones web, servicios backend y trabajos de renderizado en la nube, sin la necesidad de administrar la infraestructura subyacente.",
  },
];
