import type { FieldValues } from 'react-hook-form';
import type { SignProps } from './Landing';

import { Button, FormControl, Label } from '@/components';
import { useForm } from 'react-hook-form';
import { useLoginServiceMutation } from '@/redux/features/auth/authService';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Input, Checkbox } from 'react-daisyui';
import { loginSchema } from '@/utils/schemas';

function SignInModal({ open, setOpen }: SignProps) {
  const [useLogin, result] = useLoginServiceMutation();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate();

  const resetResult = () => {
    if (result && result.error) {
      result.reset();
    }
  };

  const handleMenu = () => {
    setOpen((v) => !v);
    resetResult();
  };

  const onSubmit = async (data: FieldValues) => {
    const { email, password, agree: persist } = data;

    try {
      const { token } = await useLogin({ email, password }).unwrap();
      if (persist) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      localStorage.setItem('persist', persist);
      navigate('/explore', { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal open={open} className='w-1/2 max-w-xs'>
        <Modal.Header>
          <h1 className='text-3xl text-white font-bold text-center'>Login</h1>
        </Modal.Header>
        <Modal.Body>
          <div className='flex flex-col gap-3 justify-center mt-3'>
            {}
            <FormControl>
              <Label>
                <Label.Text
                  error={result && result.error ? true : false}
                  text='Email:'
                />
                {result && result.error && (
                  <Label.Text error alt text='Incorrect Email or Password' />
                )}
              </Label>
              <Input
                type='email'
                required
                placeholder='email'
                {...register('email', {
                  onChange: resetResult
                })}
                color={result && result.error ? 'error' : 'ghost'}
              />
            </FormControl>
            <FormControl>
              <Label>
                <Label.Text
                  error={result && result.error ? true : false}
                  text='Password:'
                />
                {result && result.error && (
                  <Label.Text error alt text='Incorrect Email or Password' />
                )}
              </Label>
              <Input
                type='password'
                required
                placeholder='password'
                {...register('password', {
                  onChange: resetResult
                })}
                color={result && result.error ? 'error' : 'ghost'}
              />
            </FormControl>
            <div className='flex gap-2'>
              <Checkbox color='primary' required {...register('agree')} />
              <span>Remember this device</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button type='submit' onClick={handleSubmit(onSubmit)}>
            Sign In
          </Button>
          <Button color='danger' onClick={handleMenu}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default SignInModal;
