import { useForm, Controller } from 'react-hook-form';
import { Text, Container, Button, Input, Checkbox } from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/features/auth/authServiceSlice';
import { setToken } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import validator from 'validator';
import style from '@/styles/form.module.css';

const loginSchema = z.object({
  email: z.string().refine(validator.isEmail),
  password: z.string(),
  persist: z.boolean().optional().default(false)
});

function Login() {
  const [loginRequest] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submit,
    formState: { errors },
    control
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const handleSubmit = async (data: any) => {
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
      console.error(err);
    }
  };

  return (
    <Container
      display='flex'
      direction='column'
      alignItems='center'
      justify='center'
      css={{ gap: '1rem' }}
    >
      <Text
        h1
        css={{
          mt: '7rem'
        }}
      >
        Login
      </Text>
      <form
        className={style.container}
        style={{ gap: '2.5rem' }}
        onSubmit={submit(handleSubmit)}
      >
        <Input
          label='Email'
          clearable
          bordered
          size='xl'
          type='email'
          helperText='Required'
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
          helperText='Required'
          placeholder='password'
          {...register('password')}
          aria-label='password'
          css={{ m: '0' }}
        />

        <Controller
          render={({ field }) => (
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
