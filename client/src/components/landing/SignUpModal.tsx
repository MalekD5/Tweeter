import type { FieldValues } from 'react-hook-form';
import type { SignProps } from './Landing';

import { Button, FormControl, Label } from '@/components';
import { useForm } from 'react-hook-form';
import { useRegisterServiceMutation } from '@/redux/features/auth/authService';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { registerSchema } from '@/utils/schemas';
import { Modal, Input, Checkbox, InputGroup } from 'react-daisyui';

function SignUpModal({ open, setOpen }: SignProps) {
  const [useRegister] = useRegisterServiceMutation();
  const [tos, setTOS] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const navigate = useNavigate();

  const handleMenu = () => {
    setOpen((v) => !v);
  };

  const onSubmit = async (data: FieldValues) => {
    const { email, password, username, displayname } = data;
    try {
      const { id } = await useRegister({
        email,
        password,
        username,
        displayname
      }).unwrap();
      navigate(`/verifyEmail?verificationId=${id}`, { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} className='w-1/2'>
      <Modal.Header>
        <div className='text-3xl font-bold text-center'>Sign Up</div>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-3 justify-start items-center mt-3'>
          <FormControl>
            <Label>
              <Label.Text text='Username:' />
            </Label>
            <InputGroup>
              <span className='border border-[#232323]'>@</span>
              <Input
                type='text'
                required
                placeholder='mysuperdooperusername'
                {...register('username')}
                className='w-full'
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <Label>
              <Label.Text text='Email:' />
            </Label>
            <Input
              type='email'
              required
              placeholder='example@email.com'
              {...register('email')}
            />
          </FormControl>
          <FormControl>
            <Label>
              <Label.Text text='Password: ' />
            </Label>
            <Input
              type='password'
              required
              placeholder='password'
              {...register('password')}
            />
          </FormControl>
          <FormControl>
            <Label>
              <Label.Text text='Confirm Password: ' />
            </Label>
            <Input
              type='password'
              required
              placeholder='confirm password'
              {...register('repeatPassword')}
            />
          </FormControl>
          <FormControl>
            <div className='flex items-center gap-2'>
              <Checkbox
                required
                onClick={() => setTOS((v) => !v)}
                {...register('tos')}
              />
              <span>I agree to Terms of Service</span>
            </div>
          </FormControl>
        </div>
      </Modal.Body>
      <Modal.Actions>
        <Button disabled={!tos} type='submit' onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
        <Button color='danger' onClick={handleMenu}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default SignUpModal;
