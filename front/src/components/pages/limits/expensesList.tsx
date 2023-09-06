import { useState } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import {Select, MenuItem, InputLabel, Box, Button, Grid, Typography, TextField, FormControl} from '@mui/material';
import  { updateExpense, removeExpense } from '../../../reducers/expensesReducer';
import { Expenses, ExpenseType, NotificationTypes } from '../../../types';

import ExpensesAdd from "./expensesAdd";
import notification from '../../global/notification';


const ExpensesList = () => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const expenses = useSelector((state: RootState) => state.expenses);

    const expenseTypes: string[] = Object.values(ExpenseType) as string[];    
 

    const handleRemoveCategory = async (id:string) => {
        dispatch(removeExpense(id))
        notification({text: 'Expense Category is deleted.', type: NotificationTypes.Success});
    }

    const ExpenseItem = ({category, index}:{category:Expenses, index:number}) => {

        const [expItemName, setExpItemName] = useState(category.name)
        const [expItemType, setExpItemType] = useState(category.type)
        const [expItemLimit, setExpItemLimit] = useState(category.limit)
        const [expenseForm, showExpenseForm] = useState(false);


    const handleUpdateExpense = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(expItemName){
            const updatedExpense = {...category, name: expItemName, type: expItemType, limit: expItemLimit}
            dispatch(updateExpense(updatedExpense))
            notification({text: 'Expense Category is updated.', type: NotificationTypes.Success});
        } else {
            notification({text: `Name can't be empty.`, type: NotificationTypes.Error});
        }
    };
    
        return (
            <Grid container className={expenseForm ? `expenses-list-row show-form`:`expenses-list-row`}>
                <Grid container className="expenses-data" alignItems={'center'}>
                    <Grid item xs={4} className="expenses-list-item">
                        <p>{category.name}</p>
                    </Grid>
                    <Grid item xs={4} className="expenses-list-item select">
                        <p>{category.type}</p>                                 
                    </Grid> 
                    <Grid item xs={2} className="expenses-list-item">
                        <p>{category.limit}</p>
                    </Grid> 
                    <Grid item xs={2} textAlign={"right"}>
                        <Button onClick={()=>{showExpenseForm(!expenseForm)}}>Edit</Button>
                    </Grid> 
                </Grid>
                <form id={category.id} data-index={index} onSubmit={handleUpdateExpense} className="expenses-form">
                    <Grid container spacing={2}>
                        <Grid item xs={6} className="expenses-form-item">
                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    color="primary" 
                                    label="Name"
                                    name="name" 
                                    value={expItemName} 
                                    onChange={({target})=>{setExpItemName(target.value)}}
                                />
                            </FormControl> 
                        </Grid>
                        <Grid item xs={6} className="expenses-form-item select">
                            <FormControl fullWidth>
                                <InputLabel id={`type-${index}`}>Type</InputLabel>
                                <Select
                                    labelId={`type-${index}`}
                                    value={expItemType}
                                    name="type"
                                    onChange={({target})=>{setExpItemType(target.value)}}
                                    >       
                                    <MenuItem value={category.type}>{category.type}</MenuItem>
                                    {expenseTypes.map((item) => (
                                        category.type != item && <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))}
                                </Select> 
                            </FormControl>                                
                        </Grid> 
                        <Grid item xs={6} className="expenses-form-item">
                            <FormControl fullWidth>
                                <TextField
                                    type="number"
                                    color="primary" 
                                    label="Limit"
                                    name="Limit"
                                    value={expItemLimit} 
                                    id={category.id}
                                    onChange={({target})=>{setExpItemLimit(Number(target.value))}}
                                />
                            </FormControl> 
                        </Grid> 
                        <Grid container item xs={6} spacing={2} className="expenses-form-item buttons" justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item xs={6}><Button fullWidth size="large" variant="contained" type="submit" color="primary">Save</Button></Grid>
                            <Grid item xs={6}><Button fullWidth size="large" variant="contained" onClick={() => {handleRemoveCategory(category.id)}} color="secondary">Delete</Button></Grid>
                        </Grid> 
                    </Grid>
                </form>
            </Grid>
        )
    }



    return (
        <Box className='box-flat'>
            <Typography variant="h6" textAlign={'center'} margin={'25px 0 15px'}>Expense Categories</Typography>
            <Grid container className="expenses-list-head">
                <Grid item xs={4} className="expenses-list-item">Name</Grid>
                <Grid item xs={4} className="expenses-list-item">Type</Grid>
                <Grid item xs={2} className="expenses-list-item">Limit</Grid>
                <Grid item xs={2} textAlign={"right"}>
                    <ExpensesAdd />
                </Grid>
            </Grid>
            <Grid container className="expenses-list-body">
                {expenses.map((category, index) =>
                    <ExpenseItem key={category.id} category={category} index={index} /> 
                )}
            </Grid>
        </Box>
    )
}

export default ExpensesList;