import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import expensesReducer from './reducers/expensesReducer'
import userReducer  from './reducers/userReducer'
import shoppingReducer  from './reducers/shoppingReducer'
import costsReducer  from './reducers/costsReducer'



const store = configureStore({
    reducer: {
      expenses: expensesReducer,
      user: userReducer,
      shopping: shoppingReducer,
      costs: costsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 


export default store