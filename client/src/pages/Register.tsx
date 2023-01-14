import {zodResolver} from '@hookform/resolvers/zod';
import {type FieldValues, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useRegisterMutation} from '@/redux/features/auth/authServiceSlice';
import validator from 'validator';
import zod from 'zod';
import {
    Button,
    Container,
    Input,
    Spacer,
    Text
} from '@nextui-org/react';
import style from '@/styles/form.module.css';

const registerSchema = zod
    .object({
        username: zod.string().min(4).max(16).refine(validator.isAlphanumeric),
        email: zod
            .string()
            .refine(validator.isEmail, {message: 'invalid email address'}),
        password: zod.string().min(8).refine(validator.isStrongPassword),
        confirmPassword: zod.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

function Register() {
    const {
        register,
        setError,
        handleSubmit,
        reset,
        formState: error,
        clearErrors
    } = useForm({
        resolver: zodResolver(registerSchema)
    });
    const navigate = useNavigate();
    const [registerRequest] = useRegisterMutation();

    const onSubmit = async (data: FieldValues) => {
        const {email, password, username} = data;
        try {
            await registerRequest({username, email, password});
            navigate('/login');
        } catch (err: any) {
            if (err.status === 409) {
                setError('apiCall', constructErr(err.message));
            } else if (err.status === 500) {
                setError('apiCall', constructErr('internal server error'));
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
            <Spacer y={2.5}/>

            <Text h1 b>
                Register
            </Text>

            <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    color='primary'
                    label='Username'
                    clearable
                    bordered
                    placeholder='username'
                    {...register('username')}
                    size='lg'
                    aria-label='username'
                />
                <Input
                    color='primary'
                    label='Email'
                    clearable
                    bordered
                    type='email'
                    placeholder='email@email.com'
                    {...register('email')}
                    size='lg'
                    aria-label='email'
                />
                <Input.Password
                    color='primary'
                    label='Password'
                    bordered
                    clearable
                    type='password'
                    placeholder='password'
                    {...register('password')}
                    aria-label='password'
                    size='lg'
                    css={{m: '0'}}
                />
                <Input.Password
                    color='primary'
                    label='Confirm Password'
                    bordered
                    clearable
                    type='confirmPassword'
                    placeholder='confirm password'
                    {...register('confirmPassword')}
                    aria-label='confirm password'
                    size='lg'
                    css={{m: '0'}}
                />
                <Button size='lg' type='submit'>
                    Register
                </Button>
            </form>
        </Container>
    );
}

function constructErr(message: string) {
    return {
        type: 'custom',
        message
    };
}

export default Register;
