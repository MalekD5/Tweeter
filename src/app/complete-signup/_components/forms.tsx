'use client';

import { useContext, useState } from 'react';
import { MultiStepFormContext } from '../_context/multi-step-form-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUp, SignUpSchema } from '@/lib/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IoAlertCircle } from 'react-icons/io5';
import { signOut } from '@/lib/auth';
import { logout } from '@/actions';

export function MultiStepForm() {
  const { state } = useContext(MultiStepFormContext);

  return state.index === 0 ? <Step1 /> : state.index === 1 ? <Step2 /> : <Step3 />;
}

function Step1() {
  const { state, dispatch } = useContext(MultiStepFormContext);
  const form = useForm({
    defaultValues: {
      username: '',
    },
    values: {
      username: state.steps[0].username,
    },
    resolver: zodResolver(
      SignUpSchema.pick({
        username: true,
      }),
    ),
  });

  const handleSubmit = (data: { username: string }) => {
    console.log('yes');

    dispatch({
      type: 'username',
      payload: data.username,
    });

    dispatch({
      type: 'incrementIndex',
      payload: '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>This is your public @username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Next
        </Button>
      </form>
    </Form>
  );
}
function Step2() {
  const { state, dispatch } = useContext(MultiStepFormContext);
  const schema = SignUpSchema.pick({
    displayName: true,
    birthDay: true,
  });

  const form = useForm({
    defaultValues: {
      displayName: '',
      birthDay: '',
    },
    values: {
      displayName: state.steps[1].displayName,
      birthDay: state.steps[1].birthDate,
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    dispatch({
      type: 'displayName',
      payload: data.displayName,
    });

    dispatch({
      type: 'birthDate',
      payload: data.birthDay,
    });

    dispatch({
      type: 'incrementIndex',
      payload: '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Day</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between gap-2">
          <Button variant="ghost" onClick={() => dispatch({ type: 'decrementIndex', payload: '' })}>
            Previous
          </Button>
          <Button type="submit" disabled={!form.formState.isValid}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
function Step3() {
  const router = useRouter();
  const { state, dispatch } = useContext(MultiStepFormContext);
  const schema = SignUpSchema.pick({
    bio: true,
    location: true,
  });
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      bio: '',
      location: '',
    },
    values: {
      bio: state.steps[2].bio,
      location: state.steps[2].location,
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          username: state.steps[0].username,
          displayName: state.steps[1].displayName,
          birthDay: state.steps[1].birthDate,
          bio: data.bio,
          location: data.location,
        } satisfies SignUp),
      });

      if (res.ok) {
        localStorage.removeItem('ally-supports-cache');

        window.location.href = '/home';
      } else {
        const err = await res.json();
        setError(err.error || 'no error?');
      }
    } catch (err) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
        {error && (
          <Alert variant="destructive">
            <IoAlertCircle className="size-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>response: {error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="write your bio" maxLength={200} {...field} />
              </FormControl>
              <FormDescription>This will be displayed on your portfolio.</FormDescription>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between gap-2">
          <Button variant="ghost" onClick={() => dispatch({ type: 'decrementIndex', payload: '' })}>
            Previous
          </Button>
          <Button type="submit" disabled={!form.formState.isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
