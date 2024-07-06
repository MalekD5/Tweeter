"use client";

import { signUpSchema } from "@/lib/zod";
import { useContext } from "react";
import { StepContext } from "../_context";
import { useForm as useRHForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const StepSchema = signUpSchema.pick({
  username: true,
});

type StepSchemaType = z.infer<typeof StepSchema>;

export function StepOne() {
  const { state, dispatch } = useContext(StepContext);
  const form = useRHForm({
    defaultValues: {
      username: "",
    },
    values: {
      username: state.username,
    },
    resolver: zodResolver(StepSchema),
  });

  const onSubmit = (data: StepSchemaType) => {
    dispatch({
      type: "step1",
      payload: data.username,
    });

    dispatch({ type: "next" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 lg:w-2/3">
        <h3 className="text-center">Step 1 of 3</h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>This will be your @username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Next
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <p className="cursor-pointer self-start text-sm italic text-bluish-foreground">
              Why was I directed to this page?
            </p>
          </PopoverTrigger>
          <PopoverContent className="bg-zin-800 max-w-md text-sm">
            Our systems have detected that you did not complete the signup process. in order to
            proceed you must provide the following information: username, display name, birth day.
            you can also provide some optional information such as: location and bio.
          </PopoverContent>
        </Popover>
      </form>
    </Form>
  );
}
