import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice';

// store -- основной redux объект, котрый хранит состояние и действия
// в качестве редьюсеров указываем наши сервисы для запросов на сервер.
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,     // редьюсер для запросов
        [userApi.reducerPath]: userApi.reducer,     // редьюсер для запросов
        userState: userReducer,         // редьюсер для управления состоянием пользователя
    },
    devTools: process.env.NODE_ENV === 'development',

    // добавили сервисы в middleware, чтобы их можно было использовать.
    // Добавляем апи мидлвар, что даст нам кэширование, инвалидацию, полинг,
    // и другие полезные штуки
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;