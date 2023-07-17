import { createSlice } from '@reduxjs/toolkit'

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: '',
    reducers: {
        updateShopping(state, action){
            console.log(`${state} ${action}`)
        }
    }
})

export const { updateShopping } = shoppingSlice.actions
export default shoppingSlice.reducer