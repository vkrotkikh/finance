import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';
import { Cost, NewCost } from "../types";
import costsService from '../services/costsService';

const initialState: Cost[] = []

const costsSlice = createSlice({
    name: 'costs',
    initialState,
    reducers: {
        setCosts(state:Cost[], action){
            return action.payload
        },
        clearCosts(){
          return initialState
        }
    }
})

export const { setCosts, clearCosts } = costsSlice.actions

export const initializeCostsData = (userId:string) => async (dispatch: Dispatch) => {
  const costs = await costsService.getAll(userId);
  dispatch(setCosts(costs))
  return costs;
};

export const createCost = (data: NewCost) => async (dispatch: Dispatch) => {
  const costs = await costsService.create(data);
  dispatch(setCosts(costs));
  return costs;
};

export const removeCost = (id:string) => async (dispatch: Dispatch) =>  {
  const costs = await costsService.remove(id);
  dispatch(setCosts(costs));
  return costs;
}

export default costsSlice.reducer