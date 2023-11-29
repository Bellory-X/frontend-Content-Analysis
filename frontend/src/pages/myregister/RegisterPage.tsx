import React, {useEffect} from 'react';
import {Path, SubmitHandler, useForm, UseFormRegister, Controller, FormProvider} from "react-hook-form";
import {useRegisterUserMutation} from "../../redux/api/authApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import LoginInput from "./inputFields/LoginInput";
import EmailInput from "./inputFields/EmailInput";
import PasswordInput from "./inputFields/PasswordInput";
import PasswordConfirmationInput from "./inputFields/PasswordConfirmationInput";
import {Box, Container} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import WelcomeToContentAnalysisTypography from "../register/typography/WelcomeToContentAnalysisTypography";
import SignUpToGetStartedTypography from "../register/typography/SignUpToGetStartedTypography";
import FormInput from "../../components/FormInput";
import LoginTypograhy from "../register/LoginTypograhy";

export interface IFormInput {
    login: string
    email: string
    password: string
    password_confirmation: string
}


const RegisterPage = () => {
    const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        try {
            registerUser(data)
        } catch (e) {
            console.log("smth went wrong...");
        }

    }

    const methods = useForm<IFormInput>();
    // Создаем обработчика формы для типа IFormInput и получаем для этого необходимые методы.
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = methods;

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success('User registered successfully');
            navigate('/verifyemail');
        }

        if (isError) {
            console.log(error);

            // это всплывающее окно с ошибками, которое неправильно работает.
            if (Array.isArray((error as any))) {
                (error as any).forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any), {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);


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
                    onSubmit={handleSubmit(onSubmit)}
                    // noValidate
                    autoComplete='off'
                    maxWidth='27rem'
                    width='100%'
                    sx={{
                        backgroundColor: '#e5e7eb',
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 2,
                    }}
                >
                    <LoginInput />
                    <EmailInput />
                    <PasswordInput label="password" register={register} errors={errors} />
                    <PasswordConfirmationInput label="password_confirmation" register={register} errors={errors} />


                    <LoginTypograhy />  {/*кнопка с переходом на страничку логина*/}

                    <LoadingButton
                        variant='contained'
                        sx={{ mt: 1 }}
                        fullWidth
                        disableElevation
                        type='submit'
                        loading={isLoading}
                        // onClick={handleSubmit(onSubmitHandler)}
                    >
                        Sign Up
                    </LoadingButton>
                </Box>

            </FormProvider>
        </Box>
    </Container>
    );
};

export default RegisterPage;