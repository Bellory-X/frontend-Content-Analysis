import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/login/Login';
import { IGenericResponse } from './types';
import { userApi } from './userApi';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

interface IFormInput {
    login: string
    email: string
    password: string
    password_confirmation: string
}


// API с базовым адресом и несколькими запросами к разным его эндпоинтам.
// это RTK Query библиотека.
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/auth/`,
    }),

    // builder.mutation -- чтобы изменять данные на сервере.
    // RegisterInput - тело запроса
    // IGenericResponse - тело ответа
    endpoints: (builder) => ({

        registerUser: builder.mutation<IGenericResponse, IFormInput>({
            query(data) {
                console.log("log")
                return {
                    url: 'register',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        loginUser: builder.mutation<
            { access_token: string; status: string },
            LoginInput
            >({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));     // если авторизация успешна, то еще и данные о пользователе подтягиваем через этот запрос.
                } catch (error) {}
            },
        }),

        verifyEmail: builder.mutation<
            IGenericResponse,
            { verificationCode: string }
            >({
            query({ verificationCode }) {
                return {
                    url: `verifyemail/${verificationCode}`,
                    method: 'GET',
                };
            },
        }),

        // Запрос для восстановления пароля по почте.
        recoveryEmail: builder.mutation<IGenericResponse, { recovery_email: string }>({
            query({ recovery_email }) {
                return {
                    url: `recoveryemail/${recovery_email}`,
                    method: 'GET',
                };
            },
        }),

        // Запрос для восстановления пароля по почте.
        recoveryCode: builder.mutation<IGenericResponse, { recovery_code: string }>({
            query({ recovery_code }) {
                return {
                    url: `recoverycode/${recovery_code}`,
                    method: 'GET',
                };
            },
        }),

        logoutUser: builder.mutation<void, void>({
            query() {
                return {
                    url: 'logout',
                    credentials: 'include',
                };
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useVerifyEmailMutation,
    useRecoveryEmailMutation,
    useRecoveryCodeMutation,
} = authApi;