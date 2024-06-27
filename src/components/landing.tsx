import { BsTwitterX } from "react-icons/bs";
import Treadmark from "./treadmark";

export default function Landing({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="grid min-h-screen w-full grid-cols-1 gap-0 px-6 md:grid-cols-2 md:gap-4 md:px-0">
        <div
          className="hidden h-full w-full px-4 pt-4 md:grid md:place-content-center md:px-0 md:pt-0"
          aria-hidden
        >
          <BsTwitterX className="hidden size-80 md:block" aria-hidden />
        </div>
        <div className="container md:p-5">{children}</div>
      </main>
      <Treadmark />
    </>
  );
}
