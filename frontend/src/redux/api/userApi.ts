import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import { IUser } from './types';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;


/**
 * API для получения данных об уже авторизованном пользователе.
 */
// сервис для получения пользователя с бэка.
// его можно как редьюсера добавлять в наш redux store.
// RTK query генерирует хук, с помощью которого можно получать данные
export const userApi = createApi({
    reducerPath: 'userApi', // уникальный ключ, который однозначно определяет текущий сервис
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/users/`,  // базовый URL, на который сервис будет отправлять запросы.
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({

        // builder.query -- чтобы получать данные с сервера.
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'me',
                    credentials: 'include',
                };
            },

            // достаем нужное поле из ответа от сервера
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));    // в случае успеха отправляем данные в Redux Store.
                } catch (error) {}
            },
        }),
    }),
});