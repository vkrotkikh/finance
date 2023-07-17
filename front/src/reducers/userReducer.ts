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
        setUserLimit(state:UserData, action){
            return {
                ...state, mylimit: action.payload
            }
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

export const { setUserLimit, setUserData, setError, clearUser } = userSlice.actions

/* 
gives possibility to get exact parameter in useSelector. can be useful for refactoring
export const selectData = (state:RootState): UserData | null => state.user.mylimit
*/
export const createUser = (email: string, password: string) => async(dispatch: Dispatch) => {
    const name = email.split('@')[0];
    const regDate = dayjs(new Date()).format('MM/DD/YYYY');
    const newUser:NewUser = { email, password, name, mylimit: 0, regDate }

    try {
        dispatch(setError(''))
        const response = await usersService.create(newUser)
        localStorage.setItem('userId', response.data.user.id);
        dispatch(setUserData(response.data.user))
    } catch (error:any) {
        if (error.response.status === 409) {
            dispatch(setError(error.response.data.message))
        } else {
          console.log(error.message);
        }
    }
};
export const loginUser = (email: string, password: string) => async(dispatch: Dispatch) => {
    try {
        dispatch(setError(''))
        const response = await usersService.login(email, password);
        localStorage.setItem('userId', response.data.user.id);
        dispatch(setUserData(response.data.user))
    } catch (error:any) {
        if (error.response.status === 401) {
            dispatch(setError(error.response.data.message))
        }
    } 
};

export const updateUser = (id: string, fieldName: string, fieldValue: any) => async(dispatch: Dispatch) => {
    try {
        const user = await usersService.update(id, fieldName, Number(fieldValue));
        dispatch(setUserData(user))
    } catch (error:any) {
        console.log('user was not update')
    } 
};
 
export const initializeUserData = (id:string) => {
    return async (dispatch: Dispatch) => {
        const user = await usersService.getSingle(id);
        dispatch(setUserData(user))
    }
};

export default userSlice.reducer