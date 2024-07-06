import Landing from "@/components/landing";
import { redirect } from "next/navigation";
import { MultiStepForm } from "./_components/multi-step-form";
import MultiStepFormContextContainer from "./_context";
import { getSession } from "@/lib/session";
import { BsTwitterX } from "react-icons/bs";

export default async function CompleteSignup() {
  const user = await getSession();

  if (!user.id) {
    return redirect("/");
  }

  if (user.username) {
    return redirect("/home");
  }

  return (
    <Landing>
      <div className="flex flex-col gap-5 py-7 pb-10 md:pt-20">
        <BsTwitterX className="block size-16 md:hidden" aria-hidden />
        <h1 className="flex py-0 text-5xl font-bold">Complete Signup</h1>
      </div>
      <MultiStepFormContextContainer>
        <MultiStepForm />
      </MultiStepFormContextContainer>
    </Landing>
  );
}
