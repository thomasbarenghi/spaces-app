import { LayoutPublic, Members } from "@/components";
import ImageNext from "next/image";
import Link from "next/link";
import Head from "next/head";

const items = [
  {
    title: "+50.000",
    body: "Clientes nos eligen en todo el mundo",
    image: "/icon/home/f1.svg",
  },
  {
    title: "Siéntete seguro",
    body: "Fuimos premiados 7 veces como plataforma mas segura",
    image: "/icon/home/f2.svg",
  },
  {
    title: "100% Garantizado",
    body: "Si no te gusta, te devolvemos tu dinero",
    image: "/icon/home/f3.svg",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>

      <LayoutPublic>
        <section className=" relative flex h-[70vh]  min-h-[500px] w-full  flex-col items-center justify-center  lg:h-[70vh] lg:min-h-[350px] ">
          <div className="h-ful absolute bottom-0 left-0 top-0 z-0 w-full ">
            <ImageNext
              src="/image/hero-home.png"
              alt="hero-home"
              fill
              className="z-[0] object-cover "
            />
          </div>
          <div className="seccion2-x z-[1] w-full">
            <div className=" ">
              <h1 className="titulo-1 text-white ">
                Organiza mejor, disfruta mas con aquellos que amas.
              </h1>
              <p className="bodyText  text-white">
                Con herramientas poderosas y fáciles de usar, podrás gestionar
                tus proyectos de manera eficiente, liberando tiempo para
                compartir momentos especiales con tu familia y amigos.
              </p>
              <button className="primaryButton mt-4 ">
                <Link href={"/auth/register"}>Regístrate ahora, es gratis</Link>
              </button>
            </div>
          </div>
        </section>
        <section className="centerInner bg-white">
          <div className="seccion2-x centerInner gap-10 py-[80px]">
            <div>
              <p className="bodyText font-normal text-blue-700">
                Conozcámonos mejor
              </p>
              <h1 className="titulo-1">
                Simplificamos la vida de miles de personas al rededor del mundo
                🗺️🪐
              </h1>
              <p className="bodyText mt-1">
                Con nuestras herramientas intuitivas y funciones personalizadas,
                podrás planificar, colaborar y realizar un seguimiento de tus
                proyectos de manera más eficiente que nunca. Desde tareas
                individuales hasta grandes proyectos de equipo, nuestra
                aplicación te permite mantener todo en orden y alcanzar tus
                metas con facilidad.
              </p>
            </div>
            <div className=" flex flex-col items-start gap-10  lg:flex-row">
              {items.map((item, index) => {
                return <ItemFeature data={item} />;
              })}
            </div>
          </div>
        </section>
        <Members />
      </LayoutPublic>
    </>
  );
}

type ItemFeatureProps = {
  data: any;
};

function ItemFeature({ data }: ItemFeatureProps) {
  return (
    <div className="flex items-center justify-center gap-3" key={data.title}>
      <div className="relative min-h-[80px] min-w-[80px] ">
        <ImageNext
          src={data.image}
          alt="hero-home"
          layout="fill"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <h3 className="titulo-3">{data.title}</h3>
        <p className="bodyText">{data.body}</p>
      </div>
    </div>
  );
}
