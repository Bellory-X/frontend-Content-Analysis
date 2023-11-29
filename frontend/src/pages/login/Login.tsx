import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authApi';
import WelcomeBackTypography from "./typography/WelcomeBackTypography";
import LoginToHaveAccessTypography from "./typography/LoginToHaveAccessTypography";
import SignUpTypography from "./typography/SignUpTypography";

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;


const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {

    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    // 👇 API Login Mutation
    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/profile';

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSuccess) {
            toast.success('You successfully logged in');
            navigate(from);
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        // 👇 Executing the loginUser Mutation
        loginUser(values);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'rgb(58,58,77)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <WelcomeBackTypography />
                <LoginToHaveAccessTypography />

                <FormProvider {...methods}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete='off'
                        maxWidth='27rem'
                        width='100%'
                        sx={{
                            backgroundColor: '#e5e7eb',
                            p: { xs: '1rem', sm: '2rem' },
                            borderRadius: 2,
                        }}
                    >
                        <FormInput name='email' label='User Name' type='email' />
                        <FormInput name='password' label='Password' type='password' />

                        <SignUpTypography />

                        <LoadingButton
                            variant='contained'
                            sx={{ mt: 1 }}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            Login
                        </LoadingButton>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default Login;