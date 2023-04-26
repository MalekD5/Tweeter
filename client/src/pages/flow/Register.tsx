import { findByEmail, registerUser } from '@/api/authAPI';
import { Button } from '@/components';
import { handleLocalStorage } from '@/utils/storage';
import {
  Box,
  Checkbox,
  Flex,
  Modal,
  PasswordInput,
  Progress,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { TransformedValues, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { BiAt, BiCheck, BiX } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function SignUp() {
  const [opened, handlers] = useDisclosure(true);
  const navigate = useNavigate();
  const findMutation = useMutation({
    mutationFn: findByEmail
  });
  const form = useForm({
    initialValues: {
      email: '',
      name: ''
    },
    validate: {
      email: (value) => (validator.isEmail(value) ? null : 'invalid email'),
      name: (value) =>
        validator.isLength(value, { min: 4, max: 25 })
          ? null
          : 'Name must be between 4-25 character long'
    }
  });

  type Transformed = TransformedValues<typeof form>;

  const handleSubmit = async (values: Transformed) => {
    const { email } = values;
    try {
      await findMutation.mutateAsync(email);
      handlers.close();
    } catch (err: any) {
      form.setErrors({ email: 'email already used' });
      throw err;
    }
  };

  const handleModalClose = () => {
    handlers.close();
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className='w-full h-screen bg-slate-700'></div>
      <Modal.Root
        opened={opened}
        onClose={handleModalClose}
        size='lg'
        centered
        transitionProps={{ transition: 'slide-right', duration: 400 }}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Step 1 out of 3</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div className='mx-auto p-10 w-9/12'>
              <form className='w-11/12' onSubmit={form.onSubmit(handleSubmit)}>
                <Flex gap='md' className='w-full' direction='column'>
                  <Title>Create your account</Title>
                  <TextInput
                    data-autofocus
                    label='Name'
                    placeholder='Your name'
                    required
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    label='Email'
                    placeholder='example@email.com'
                    required
                    {...form.getInputProps('email')}
                  />
                </Flex>
                <div className='mt-10'>
                  <Button size='xl' color='white' type='submit' auto>
                    Next
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {!opened && (
        <SignUpStep2 email={form.values.email} displayname={form.values.name} />
      )}
    </>
  );
}

function PasswordRequirement({
  meets,
  label
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text sx={{ display: 'flex', alignItems: 'center' }} mt={7} size='sm'>
      {meets ? (
        <BiCheck className='fill-teal-500' size='0.9rem' />
      ) : (
        <BiX className='fill-red-500' size='0.9rem' />
      )}
      <Box className={meets ? '!text-teal-500' : '!text-red-500'} ml={10}>
        {label}
      </Box>
    </Text>
  );
}

type Step2Props = {
  email: string;
  displayname: string;
};

function SignUpStep2(props: Step2Props) {
  const [opened, handlers] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      password: '',
      repeat: ''
    },
    validate: {
      password: (value) =>
        validator.isStrongPassword(value) ? null : 'Password is weak',
      repeat: (value, form_values) =>
        form_values.password === value ? null : 'Passwords do not match'
    },
    validateInputOnChange: ['repeat']
  });
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  useEffect(() => {
    handlers.open();
  }, []);

  const handleModalClose = () => {};

  const handleSubmit = () => {
    handlers.close();
  };

  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={handleModalClose}
        size='lg'
        transitionProps={{ transition: 'slide-right', duration: 400 }}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Step 2 out of 3</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div className='mx-auto p-10 w-9/12'>
              <form className='w-11/12' onSubmit={form.onSubmit(handleSubmit)}>
                <Flex gap='md' className='w-full' direction='column'>
                  <Title>Choose a password</Title>
                  <div>
                    <PasswordInput
                      data-autofocus
                      withAsterisk
                      label='Your password'
                      placeholder='Your password'
                      {...form.getInputProps('password')}
                    />
                    <Progress color={color} value={strength} size={5} mt='xs' />
                    {checks}
                  </div>
                  <PasswordInput
                    required
                    label='repeat password'
                    {...form.getInputProps('repeat')}
                  />
                  <div className='mt-10'>
                    <Button size='xl' color='white' type='submit' auto>
                      Next
                    </Button>
                  </div>
                </Flex>
              </form>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {!opened && <SignUpStep3 {...props} password={form.values.password} />}
    </>
  );
}

type Step3Props = Step2Props & {
  password: string;
};

function SignUpStep3(props: Step3Props) {
  const { email, password, displayname } = props;
  const [opened, handlers] = useDisclosure(false);
  const registerMutation = useMutation({
    mutationFn: registerUser,
    useErrorBoundary: false
  });
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: ''
    },
    validate: {
      username: (value) =>
        validator.isAlphanumeric(value)
          ? null
          : 'username must contain only characters and/or numbers'
    }
  });

  useEffect(() => {
    handlers.open();
  }, []);

  const handleModalClose = () => {};

  const handleSubmit = async (values: TransformedValues<typeof form>) => {
    const { username } = values;
    try {
      const response = await registerMutation.mutateAsync({
        email,
        password,
        username,
        displayname
      });

      if (!response) {
        form.setErrors({ username: 'username already in use' });
        return;
      }
      const { token } = response;

      handleLocalStorage(token, username, displayname, true, undefined);
      navigate('/explore', { replace: true });
    } catch (err: any) {
      form.setErrors({ username: 'username already in use' });
      throw err;
    }
  };

  return (
    <Modal.Root
      opened={opened}
      onClose={handleModalClose}
      centered
      size='lg'
      transitionProps={{ transition: 'slide-left', duration: 400 }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Step 3 out of 3</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className='mx-auto p-10 w-9/12'>
            <form className='w-11/12' onSubmit={form.onSubmit(handleSubmit)}>
              <Flex gap='md' className='w-full' direction='column'>
                <Title>Choose a username</Title>
                <TextInput
                  data-autofocus
                  icon={<BiAt />}
                  label='Username'
                  {...form.getInputProps('username')}
                  required
                />
                <Checkbox label='I agree to the Terms of service' required />
                <div className='mt-10'>
                  <Button size='xl' color='white' type='submit' auto>
                    Sign Up
                  </Button>
                </div>
              </Flex>
            </form>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default SignUp;
