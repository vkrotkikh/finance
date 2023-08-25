import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { UserData, NewUser } from './../types';
import usersService from './../services/usersService';
import dayjs from 'dayjs';

const initialState: UserData = {
    id: '',
    name: '',
    mylimit: 0,
    regDate: '',
    email: '',
    password: '',
    error: '',
    isLoggedIn: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action:PayloadAction<UserData>){
            return {...action.payload, isLoggedIn: true };
        },
        setError(state:UserData, action){
            return {
                ...state, error: action.payload
            }
        },
        clearUser(){
            return initialState
        }
    }
})

export const { setUserData, setError, clearUser } = userSlice.actions

export const createUser = (email: string, password: string) => async(dispatch: Dispatch) => {
    const name = email.split('@')[0];
    const regDate = dayjs(new Date()).format('MM/DD/YYYY');
    const newUser:NewUser = { email, password, name, mylimit: 0, regDate }

    try {
        const response = await usersService.create(newUser)
        localStorage.setItem('userId', response.data.user.id);
        dispatch(setUserData(response.data.user))
        dispatch(setError(''))
    } catch (error:any) {
        if (error.response.status === 409) {
            dispatch(setError(error.response.data.message))
        }
    }
};

export const loginUser = (email: string, password: string) => async(dispatch: Dispatch) => {
    try {
        const response = await usersService.login(email, password);
        localStorage.setItem('userId', response.data.user.id);
        dispatch(setUserData(response.data.user))
        dispatch(setError(''))
    } catch (error:any) {
        if (error.response.status === 401) {
            dispatch(setError(error.response.data.message))
        }
    }
};

export const changeUserPassword = ( id: string, oldPassword: string, newPassword: string ) => async(dispatch: Dispatch) => {
    try {
        await usersService.changePassword(id, oldPassword, newPassword)
        dispatch(setError(""))
        return true;
    } catch (error:any) {
        dispatch(setError(error.response.data.message))
        return false;
    } 
};

export const updateUser = (object: UserData) => async(dispatch: Dispatch) => {
    const user = await usersService.update(object);
    dispatch(setUserData(user))
};
 
export const initializeUserData = (id:string) => {
    return async (dispatch: Dispatch) => {
        const user = await usersService.getSingle(id);
        dispatch(setUserData(user))
    }
};

export default userSlice.reducer