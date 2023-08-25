import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';
import { Expenses, NewExpenses } from './../types';
import expensesService from '../services/expensesService';

const initialState: Expenses[] = []

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses(state:Expenses[], action){
            return action.payload
        },
        changeExpense(state:Expenses[], action){
          const updatedState = state.map((item) => item.id === action.payload.id ? action.payload : item )
          return updatedState
        },
        clearExpenses(){
          return initialState
        }
    }
})

export const { setExpenses, changeExpense, clearExpenses } = expensesSlice.actions

export const initializeExpensesData = (userId:string) => async (dispatch: Dispatch) => {
  const expenses = await expensesService.getAll(userId);
  dispatch(setExpenses(expenses))
};

export const updateExpense = (object: Expenses) => async(dispatch: Dispatch) => {
  const expenses = await expensesService.update(object);
  dispatch(setExpenses(expenses))
};

export const createExpense = (data: NewExpenses) => async (dispatch: Dispatch) => {
  const expenses = await expensesService.create(data);
  dispatch(setExpenses(expenses));
  return expenses;
};

export const removeExpense = (id:string) => async (dispatch: Dispatch) =>  {
  const expenses = await expensesService.remove(id);
  dispatch(setExpenses(expenses));
  return expenses;
}

export default expensesSlice.reducer