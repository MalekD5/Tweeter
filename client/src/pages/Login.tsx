import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  Container,
  Button,
  Input,
  Checkbox,
  Spacer,
  Modal
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
import { Alert } from '@/components';

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
  const [visible, setVisible] = useState(false);

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
      navigate('/explore', { replace: true });
    } catch (err: any) {
      if ('originalStatus' in err && err?.originalStatus === 403) {
        setError('please verify your email.');
      } else {
        setError('An Internal server error has occured.');
      }
    }
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Container
      display='flex'
      direction='column'
      alignItems='center'
      justify='center'
      css={{ gap: '1rem' }}
    >
      <Spacer y={1} />
      <Button onPress={() => setVisible(true)}>Login</Button>
      <Modal closeButton open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text h1>Login</Text>
        </Modal.Header>
        <Modal.Body>
          <form className={style.container}>
            <Alert error={error} />
            <Input
              label='Email'
              clearable
              bordered
              size='lg'
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
              size='lg'
              placeholder='password'
              {...register('password')}
              aria-label='password'
              css={{ m: '0' }}
            />

            <Controller
              render={({ field }) => (
                <Checkbox size='sm' {...field} color='gradient'>
                  Remember this device
                </Checkbox>
              )}
              control={control}
              name='persist'
              defaultValue={false}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: 'flex',
              margin: '0 auto',
              gap: '1rem'
            }}
          >
            <Button size='lg' auto flat color='error' onPress={closeHandler}>
              Close
            </Button>
            <Button
              size='lg'
              auto
              flat
              color='success'
              type='submit'
              onClick={submit(handleSubmit)}
            >
              Login
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
