import { loginUser } from '@/api/authAPI';
import { Button } from '@/components';
import { handleLocalStorage } from '@/utils/storage';
import {
  Modal,
  Divider,
  Flex,
  Title,
  Text,
  Anchor,
  TextInput,
  Checkbox
} from '@mantine/core';
import { useForm, TransformedValues } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function SignIn() {
  const navigate = useNavigate();
  const [opened, handlers] = useDisclosure(true);

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (validator.isEmail(value) ? null : 'Invalid email')
    }
  });

  const handleSubmit = () => {
    handlers.close();
  };

  const handleModalClose = () => {
    handlers.close();
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className='h-screen bg-slate-700'></div>
      <Modal.Root
        opened={opened}
        onClose={handleModalClose}
        size='lg'
        centered
        transitionProps={{ transition: 'slide-right', duration: 300 }}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className='w-full'>
            <Modal.CloseButton className='mx-none' />
          </Modal.Header>
          <Modal.Body>
            <div className='w-9/12 mx-auto p-10'>
              <Flex gap='lg' direction='column' align='center' justify='center'>
                <FaTwitter size='2rem' />
                <form
                  className='w-11/12'
                  onSubmit={form.onSubmit(handleSubmit)}
                >
                  <Flex gap='md' className='w-full' direction='column'>
                    <Title order={1} className='text-gray-200'>
                      Sign in to Tweeter
                    </Title>
                    <Button style={{ padding: '0.3rem 2rem' }} color='white'>
                      <div className='flex items-center justify-center gap-2'>
                        <AiFillGithub size='1.5rem' className='fill-black ' />
                        <span className='text-black font-medium leading-loose'>
                          Sign in with Github
                        </span>
                      </div>
                    </Button>
                    <Divider
                      label='or'
                      labelProps={{
                        style: {
                          fontSize: '1.1rem'
                        }
                      }}
                      labelPosition='center'
                    />
                    <TextInput
                      label='Login via email'
                      placeholder='example@email.com'
                      className='bg-black'
                      required
                      data-autofocus
                      {...form.getInputProps('email')}
                    />
                    <Flex gap='lg' direction='column' className='mt-3'>
                      <Button auto color='white' type='submit'>
                        Next
                      </Button>
                      <Text className='text-neutral-500'>
                        Don't have an account? <Anchor>Sign Up</Anchor>
                      </Text>
                    </Flex>
                  </Flex>
                </form>
              </Flex>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {!opened && <LoginModal email={form.values.email} />}
    </>
  );
}

type LoginModalProps = {
  email: string;
};

function LoginModal(props: LoginModalProps) {
  const [opened, handlers] = useDisclosure(false);
  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    useErrorBoundary: false
  });

  const nav = useNavigate();

  useEffect(() => {
    handlers.open();
  }, []);

  const form = useForm({
    initialValues: {
      email: props.email,
      password: '',
      persist: false
    },
    validate: {
      email: (value) => (validator.isEmail(value) ? null : 'Invalid email')
    }
  });

  const handleModalClose = () => {
    handlers.close();
    nav('/', { replace: true });
  };

  type Transformed = TransformedValues<typeof form>;

  const handleSubmit = async (values: Transformed) => {
    try {
      const { email, password, persist } = values;
      const data = await mutateAsync({
        email,
        password
      });

      if (!data) {
        form.setErrors({
          password: 'Incorrect email or password'
        });
        return;
      }

      const { token, username, displayname, pfp } = data;

      handleLocalStorage(token, username, displayname, persist, pfp);
      nav('/explore', { replace: true });
    } catch (err: any) {
      form.setErrors({
        password: 'Incorrect email or password'
      });
      throw err;
    }
  };

  return (
    <Modal.Root
      opened={opened}
      onClose={handleModalClose}
      centered
      closeOnClickOutside={false}
      transitionProps={{ transition: 'slide-left', duration: 400 }}
      size='lg'
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className='w-11/12 mx-auto p-10'>
            <Flex gap='lg' direction='column' align='center' justify='center'>
              <FaTwitter size='2rem' />
              <form className='w-11/12' onSubmit={form.onSubmit(handleSubmit)}>
                <Flex className='w-full' gap='xl' direction='column'>
                  <Title className='text-gray-200'>Enter your password</Title>
                  <TextInput
                    disabled
                    required
                    label='Email:'
                    {...form.getInputProps('email')}
                  />
                  <TextInput
                    type='password'
                    label='Password:'
                    placeholder='password'
                    data-autofocus
                    required
                    {...form.getInputProps('password')}
                  />
                  <Checkbox
                    label='remember this device?'
                    {...form.getInputProps('persist')}
                  />
                  <Button color='white' size='lg' type='submit'>
                    Log in
                  </Button>
                  <Text className='text-neutral-500'>
                    Don't have an account? <Anchor>Sign Up</Anchor>
                  </Text>
                </Flex>
              </form>
            </Flex>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default SignIn;
