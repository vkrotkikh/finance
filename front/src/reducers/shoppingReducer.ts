import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';
import { Product, NewProduct } from "../types";
import shoppingService from '../services/shoppingService';

const initialState: Product[] = []

const shoppingSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state:Product[], action){
            return action.payload
        },
        clearProducts(){
          return initialState
        }
    }
})

export const { setProducts, clearProducts } = shoppingSlice.actions

export const initializeShoppingData = (userId:string) => async (dispatch: Dispatch) => {
  const product = await shoppingService.getAll(userId);
  dispatch(setProducts(product))
  return product;
};

export const createProduct = (data: NewProduct) => async (dispatch: Dispatch) => {
  const product = await shoppingService.create(data);
  dispatch(setProducts(product));
  return product;
};

export const removeProduct = (id:string) => async (dispatch: Dispatch) =>  {
  const product = await shoppingService.remove(id);
  dispatch(setProducts(product));
  return product;
}

export default shoppingSlice.reducer