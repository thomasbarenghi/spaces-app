import { Main, HelpHero, LayoutPublic } from "@/components";
import Head from "next/head";

type Terms = {
  id: number;
  title: string;
  subParrafos: string[];
};

const terms: Terms[] = [
  {
    id: 1,
    title: "Uso de la Aplicación",
    subParrafos: [
      "La aplicación es proporcionada para tu uso personal y no comercial. No puedes utilizar la aplicación con fines ilegales o no autorizados. Al utilizar la aplicación, te comprometes a cumplir con todas las leyes y regulaciones aplicables.",
      "Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta. Si sospechas que tu cuenta ha sido comprometida, debes notificarnos de inmediato.",
      "Nos reservamos el derecho de modificar, suspender o interrumpir la aplicación en cualquier momento sin previo aviso. No seremos responsables por cualquier pérdida, daño o inconveniente causado por dicha modificación, suspensión o interrupción.",
    ],
  },
  {
    id: 2,
    title: "Propiedad intelectual",
    subParrafos: [
      "Todos los derechos de propiedad intelectual de la aplicación y su contenido (textos, imágenes, logotipos, etc.) son propiedad nuestra o de nuestros licenciantes. Está estrictamente prohibido copiar, modificar, distribuir, transmitir, mostrar, vender, licenciar o utilizar cualquier parte de la aplicación sin nuestro consentimiento previo por escrito.",
      "Al utilizar la aplicación, nos otorgas una licencia limitada, no exclusiva, no transferible y revocable para acceder y utilizar el contenido de la aplicación únicamente con fines personales y no comerciales.",
    ],
  },
  {
    id: 3,
    title: "Privacidad",
    subParrafos: [
      "Respetamos tu privacidad y nos comprometemos a proteger la información personal que recopilamos. Nuestra Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal. Al utilizar la aplicación, aceptas nuestra Política de Privacidad.",
    ],
  },
  {
    id: 4,
    title: "Limitación de Responsabilidad",
    subParrafos: [
      'La aplicación se proporciona "tal cual" y no ofrecemos garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que la aplicación sea segura, esté libre de errores, virus u otros componentes dañinos, o que funcione de manera ininterrumpida o libre de interrupciones.',
      "No seremos responsables de ningún daño directo, indirecto, incidental, especial, consecuente o punitivo que surja del uso o la imposibilidad de uso de la aplicación, incluso si hemos sido informados de la posibilidad de dichos daños.",
    ],
  },
  {
    id: 5,
    title: "Ley Aplicable",
    subParrafos: [
      "Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que operamos. Cualquier disputa relacionada con la aplicación o estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de dicho país.",
    ],
  },
];

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terminos y condiciones | Spaces</title>
        <meta name="theme-color" content="#1e40af" />
      </Head>
      <Main>
        <LayoutPublic>
          <HelpHero
            title="Terminos de Spaces"
            body="Los siguientes términos y condiciones establecen el acuerdo legal entre Spaces y los usuarios del sitio web. Al acceder y utilizar el sitio web, usted acepta estos términos y condiciones en su totalidad."
            image="/image/hero-home.png"
            height="h-[55vh]"
          />

          <section className="seccion1-y seccion2-x ">
            {terms.map((term) => (
              <TermItems key={term.title} term={term} />
            ))}
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
      <h3 className="titulo-3 mb-5 text-blue-700">{title}</h3>
      <ol>
        {subParrafos.map((item, index) => (
          <li className="mb-5" key={item}>
            <span className="text-blue-700">
              {id}.{index + 1}
            </span>{" "}
            {item}
          </li>
        ))}
      </ol>
    </>
  );
};
