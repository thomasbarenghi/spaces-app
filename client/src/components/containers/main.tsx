import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Main: React.FC<Props> = ({ children, className }) => {
  return (
    <main className="min-w-screen flex min-h-screen w-full max-w-[100vw] flex-col items-center bg-slate-50 ">
      {children}
    </main>
  );
};

export default Main;
