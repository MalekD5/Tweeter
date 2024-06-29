import { SignUpSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { StepContext } from "../_context";
import { useContext } from "react";
import { useForm as useRHForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeSignUp } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

const StepSchema = SignUpSchema.pick({
  bio: true,
  location: true,
});

export function StepThree() {
  const router = useRouter();
  const { state, dispatch } = useContext(StepContext);

  const form = useRHForm({
    defaultValues: {
      bio: "",
      location: "",
    },
    resolver: zodResolver(StepSchema),
  });

  const [formState, formAction] = useFormState<_StepServerAction, FormData>(completeSignUp, {
    success: true,
    redirect: false,
  });

  if (formState.success && formState.redirect) {
    setTimeout(() => router.push("/home"), 2000);
  }

  const onPrevious = () => dispatch({ type: "prev" });
  return (
    <Form {...form}>
      <form action={formAction} className="w-2/3 space-y-6">
        {!formState.success && (
          <Alert variant="destructive">
            <IoAlertCircle className="size-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>response: {formState.error}</AlertDescription>
          </Alert>
        )}
        <h3 className="text-center">Step 3 of 3 (Optional)</h3>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="write your bio"
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormDescription>This will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>This will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <input readOnly className="hidden" name="username" value={state.username} />
        <input readOnly className="hidden" name="displayName" value={state.displayName} />
        <input readOnly className="hidden" name="birthDay" value={state.birthDay.toISOString()} />

        <div className="flex w-full justify-between gap-2">
          <PreviousButton
            redirect={formState.success && formState.redirect}
            onPrevious={onPrevious}
          />
          <TrackButton
            isValid={form.formState.isValid}
            redirect={formState.success && formState.redirect}
          />
        </div>
      </form>
    </Form>
  );
}

function PreviousButton({ onPrevious, redirect }: { onPrevious: () => void; redirect: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || redirect} variant="ghost" onClick={onPrevious}>
      Previous
    </Button>
  );
}

function TrackButton({ redirect, isValid }: { redirect: boolean; isValid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={redirect ? "form_success" : "form_default"}
      type="submit"
      disabled={redirect || !isValid || pending}
    >
      {!redirect ? "Submit" : "Success"}
      {pending ? (
        <Spinner className="size-5" />
      ) : (
        redirect && <IoCheckmarkCircle className="size-5" />
      )}
    </Button>
  );
}
