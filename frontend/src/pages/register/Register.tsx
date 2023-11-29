import { Box, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/FormInput';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/api/authApi';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import LoginTypograhy from "./LoginTypograhy";
import WelcomeToContentAnalysisTypography from "./typography/WelcomeToContentAnalysisTypography";
import SignUpToGetStartedTypography from "./typography/SignUpToGetStartedTypography";

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


const registerSchema = object({
    login: string().min(1, 'Full name is required').max(100),
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    password_confirmation: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.password_confirmation, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

type Inputs = {
    login: string
    email: string
    password: string
    password_confirmation: string
}

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    // 👇 Calling the Register Mutation
    const [registerUser, { isLoading, isSuccess, error, isError }] =
        useRegisterUserMutation();

    const navigate = useNavigate();

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    /*const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            login: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
    });*/

    useEffect(() => {
        if (isSuccess) {
            toast.success('User registered successfully');
            navigate('/verifyemail');
        }

        if (isError) {
            console.log(error);
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

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        // 👇 Executing the RegisterUser Mutation
        console.log("login = ", values?.login)
        console.log("email = ", values?.email)
        console.log("password = ", values?.password)
        console.log("passwordConfirm = ", values?.password_confirmation)
        registerUser(values);
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

                <WelcomeToContentAnalysisTypography /> {/* Надпись: "Welcome to Content Analysis!"*/}
                <SignUpToGetStartedTypography /> {/* Надпись: "Sign Up To Get Started!"*/}

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
                        <FormInput name='login' label='User Name' />
                        <FormInput name='email' label='Email Address' type='email' />
                        <FormInput name='password' label='Password' type='password' />
                        <FormInput
                            name='password_confirmation'
                            label='Confirm Password'
                            type='password'
                        />

                        <LoginTypograhy />  {/*кнопка с переходом на страничку логина*/}

                        <LoadingButton
                            variant='contained'
                            sx={{ mt: 1 }}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                            onClick={handleSubmit(onSubmitHandler)}
                        >
                            Sign Up
                        </LoadingButton>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default Register;