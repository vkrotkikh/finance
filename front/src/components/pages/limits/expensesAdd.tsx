import { useState, useCallback } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import {Select, MenuItem, Modal, InputLabel, Box, Button, Grid, Typography, TextField, FormControl} from '@mui/material';
import  { createExpense } from '../../../reducers/expensesReducer';
import dayjs from 'dayjs';

import { ExpenseType, NotificationTypes } from '../../../types';
import CloseIcon from '@mui/icons-material/Close';

import notification from '../../global/notification';


const ExpensesAdd = () => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const userId = useSelector((state: RootState) => state.user.id);
    const [visibilityExpenseModal, setVisibilityExpenseModal] = useState(false);
    
    const [expenseName, setExpenseName] = useState('');
    const [expenseLimit, setExpenseLimit] = useState(0);
    const [expensesType, setExpensesType] = useState('');

    const expenseTypes: string[] = Object.values(ExpenseType) as string[];    

    const handleAddExpenseModal = () => {
        setVisibilityExpenseModal(!visibilityExpenseModal);
    }
    
    const handleCreateNewExpense = useCallback( (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!expenseName || !expensesType){
            return notification({text: 'All fields are required.', type: NotificationTypes.Error});
        } else {

            const newExpense = {
                userId, 
                name: expenseName, 
                limit: expenseLimit,
                type: expensesType,
                date: dayjs(new Date).format('MM/DD/YYYY')
            }
    
            dispatch(createExpense(newExpense))
            setExpenseName('');
            setExpenseLimit(0);
            setExpensesType('')
            setVisibilityExpenseModal(false)
            
            return notification({text: 'New Expense Category is created.', type: NotificationTypes.Success});

        }
    }, [] )

    return (
        <>
            <Modal
            open={visibilityExpenseModal}
            onClose={handleAddExpenseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="modal">
                    <Box className="modal-header">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Expense Category
                        </Typography>
                        <CloseIcon onClick={handleAddExpenseModal} />
                    </Box>
                    <Box className="modal-body">
                        <form onSubmit={handleCreateNewExpense}>
                            <Grid container className="form-contaniner">
                                <Grid item xs={12} className="form-row">
                                    
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={expensesType}
                                            label="Type"
                                            size="small"
                                            onChange={({ target }) => setExpensesType(target.value)}
                                        >
                                            {expenseTypes.map((item) => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className="form-row">
                                    <FormControl fullWidth>
                                        <TextField name="newCatName" size="small" type="text" label="Name" color="primary" value={expenseName} onChange={({target})=>setExpenseName(target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className="form-row">
                                    <FormControl fullWidth>
                                        <TextField name="newCatLimit" size="small" type="number" label="Limit" color="primary" value={expenseLimit} onChange={({target})=> setExpenseLimit(Number(target.value))} />
                                    </FormControl>
                                </Grid>
                                <Grid item container textAlign={"right"} className="form-row">
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <Button size="large" variant="contained" color="secondary" onClick={handleAddExpenseModal}>Cancel</Button>
                                        </FormControl>
                                        <FormControl>
                                            <Button size="large" variant="contained" color="primary" type="submit">Add</Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Modal> 
            <Button size="small" variant="contained" color="info"  onClick={handleAddExpenseModal} >Add</Button>
        </>
    )
}

export default ExpensesAdd;