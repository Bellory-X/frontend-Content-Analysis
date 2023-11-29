import React, {useEffect} from 'react';
import {useRecoveryCodeMutation} from "../../redux/api/authApi";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Box, Container} from "@mui/material";
import WelcomeToContentAnalysisTypography from "../register/typography/WelcomeToContentAnalysisTypography";
import LoginTypograhy from "../register/LoginTypograhy";
import {LoadingButton} from "@mui/lab";
import InputRecoveryCodePage from "./InputRecoveryCodePage";
import GetRecoverCodeTypography from "./typography/GetRecoverCodeTypography";


export interface IRecoveryCodelInput {
    recovery_code: string
}

/**
 * Страничка Для ввода кода восстановления пароля с почты
 */
export const RecoveryCodeInputPage = () => {

    const [recoveryCode, { isLoading, isSuccess, error, isError }] = useRecoveryCodeMutation();
    const onSubmit: SubmitHandler<IRecoveryCodelInput> = (data) => {
        console.log(data)
        try {
            recoveryCode(data)
        } catch (e) {
            console.log("smth went wrong...");
        }

    }

    const methods = useForm<IRecoveryCodelInput>();
    // Создаем обработчика формы для типа IFormInput и получаем для этого необходимые методы.
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = methods;

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Recovery code sent to email successfully');
            navigate('/recoverycode');
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
        <div>
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
                    <GetRecoverCodeTypography /> {/* Надпись: "Input your email to get recovery code"*/}

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

                            <InputRecoveryCodePage />

                            <LoginTypograhy />  {/*кнопка с переходом на страничку логина*/}

                            <LoadingButton
                                variant='contained'
                                sx={{ mt: 1 }}
                                fullWidth
                                disableElevation
                                type='submit'
                                loading={isLoading}
                            >
                                Get recovery code
                            </LoadingButton>
                        </Box>

                    </FormProvider>
                </Box>
            </Container>
        </div>
    );
};
