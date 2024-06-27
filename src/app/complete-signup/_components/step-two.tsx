"use client";

import { SignUpSchema } from "@/lib/zod";
import { useContext, useState } from "react";
import { z } from "zod";
import { StepContext } from "../_context";
import { Controller, useForm as useRHForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, isInvalidDate } from "@/lib/utils";
import { BsCalendar } from "react-icons/bs";

const StepSchema = SignUpSchema.pick({
  displayName: true,
  birthDay: true,
});

type StepSchemaType = z.infer<typeof StepSchema>;

export function StepTwo() {
  const [date, setDate] = useState<Date | null>(null);
  const [dateChanged, setDateChanged] = useState(false);

  const { state, dispatch } = useContext(StepContext);
  const form = useRHForm({
    values: {
      displayName: state.displayName,
      birthDay: state.birthDay,
    },
    resolver: zodResolver(StepSchema),
  });

  const onDateSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.valueAsDate!;
    if (isInvalidDate(date)) {
      return;
    }
    form.setValue("birthDay", date);
    setDate(date);
    setDateChanged(true);
  };

  const onSubmit = (payload: StepSchemaType) => {
    dispatch({
      type: "step2",
      payload,
    });

    dispatch({ type: "next" });
  };

  const onPrevious = () => dispatch({ type: "prev" });

  const dateValue = () => {
    const date = form.getValues().birthDay;
    if (isInvalidDate(date)) return "Pick a Date";
    try {
      return format(form.getValues().birthDay, "PPP");
    } catch (err) {
      return "Pick a Date";
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 lg:w-2/3"
      >
        <h3 className="text-center">Step 2 of 3</h3>

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Display Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="birthDay"
          rules={{
            validate: (value) => isInvalidDate(value),
            required: true,
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Date of Birth <span className="text-destructive">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? dateValue() : <span>Pick a date</span>}
                      <BsCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="flex w-auto flex-col space-y-2 p-2"
                  align="start"
                >
                  <Input type="date" onChange={onDateSelect} />
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date ?? field.value}
                      onSelect={(day) => {
                        setDateChanged(true);
                        field.onChange(day);
                      }}
                      month={date ?? field.value}
                      disabled={isInvalidDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between gap-2">
          <Button type="button" variant="ghost" onClick={onPrevious}>
            Previous
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid || !dateChanged}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
