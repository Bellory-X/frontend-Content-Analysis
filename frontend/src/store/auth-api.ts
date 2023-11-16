import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthRequest} from "../models/AuthRequest";
import {RegistrationRequest} from "../models/RegistrationRequest";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/'
    }),
    endpoints: build => ({

        login: build.mutation<string, AuthRequest>({
            // query: (request: AuthRequest) => $api.post<AuthResponse>('/login', {request})
            query: (request: AuthRequest) => ({
                method: 'POST',
                url: '/logout',
                body: request
            })
        }),

        registration: build.mutation<string, RegistrationRequest>({
            // query: (request: RegistrationRequest) => $api.post<AuthResponse>('/login', {request})
            query: (request: RegistrationRequest) => ({
                method: 'POST',
                url: '/logout',
                body: request
            })
        }),

        logout: build.mutation<void, string>({
            query: (request: string) => ({
                method: 'POST',
                url: '/logout',
                body: request
            })
        })

    })
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation
} = authApi