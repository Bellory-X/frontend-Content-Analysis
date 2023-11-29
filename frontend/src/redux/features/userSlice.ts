import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../api/types';

interface IUserState {
    user: IUser | null;
}


// начальное состояние слайса
const initialState: IUserState = {
    user: null,
};

/**
 * Слайс хранит информацию об уже авторизованном пользователе.
 */
// Redux Toolkit combines reducers, actions, and constants in a single file called a slice.
// создает slice из начального состояния, имени слайса и редьюсеров
export const userSlice = createSlice({
    initialState,
    name: 'userSlice',

    // Действия, с помощью которых мы можем менять состояние нашего пользователя.
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;