import { Header, Main, Footer } from "@/components";

type Props = {
  children: React.ReactNode;
};

export default function LayoutPublic({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
