import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  Container,
  Button,
  Input,
  Checkbox,
  Spacer
} from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/features/auth/authServiceSlice';
import { setToken } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import validator from 'validator';
import style from '@/styles/form.module.css';
import { useState } from 'react';
import { Alert } from "@/components";

const loginSchema = z.object({
  email: z.string().refine(validator.isEmail),
  password: z.string(),
  persist: z.boolean().optional().default(false)
});

function Login() {
  const [loginRequest] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit: submit,
    formState: { errors },
    control
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const handleSubmit = async (data: any) => {
    setError('');
    const { email, password, persist } = data;
    try {
      const { token } = await loginRequest({ email, password }).unwrap();
      dispatch(
        setToken({
          token
        })
      );
      localStorage.setItem('persist', persist);
      navigate('/protected', { replace: true });
    } catch (err: any) {
      if ('originalStatus' in err && err?.originalStatus === 403) {
        setError('please verify your email.');
      } else {
        setError('An Internal server error has occured.')
      }
    }
  };

  return (
    <Container
        display='flex'
        direction='column'
        alignItems='center'
        justify='center'
        css={{gap: '1rem'}}
    >
      <Spacer y={1}/>

      <form className={style.container} onSubmit={submit(handleSubmit)}>
        <Alert error={error}/>

        <Text h1 css={{textAlign: 'center'}}>
          Login
        </Text>
        <Input
            label='Email'
            clearable
            bordered
            size='xl'
            type='email'
            placeholder='email@email.com'
            {...register('email')}
            aria-label='email'
        />
        <Input.Password
            label='Password'
            bordered
            clearable
            type='password'
            size='xl'
            placeholder='password'
            {...register('password')}
            aria-label='password'
            css={{m: '0'}}
        />

        <Controller
            render={({field}) => (
                <Checkbox {...field} color='gradient'>
                  Remember this device
                </Checkbox>
            )}
            control={control}
            name='persist'
            defaultValue={false}
        />

        <Button type='submit'>Login</Button>
      </form>
    </Container>
  );
}

export default Login;
