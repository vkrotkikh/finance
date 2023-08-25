import { useState } from "react";
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import {Select, MenuItem, Modal, InputLabel, Box, Button, Grid, Typography, TextField, FormControl} from '@mui/material';
import  { updateExpense, createExpense, removeExpense } from '../../../reducers/expensesReducer';
import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

import { Expenses, ExpenseType, NotificationTypes } from '../../../types';
import CloseIcon from '@mui/icons-material/Close';

import notification from '../../global/notification';


const ExpensesList = () => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const userId = useSelector((state: RootState) => state.user.id);
    const expenses = useSelector((state: RootState) => state.expenses);
    const [visibilityExpenseModal, setVisibilityExpenseModal] = useState(false);
    
    const [expenseName, setExpenseName] = useState('');
    const [expenseLimit, setExpenseLimit] = useState(0);
    const [expensesType, setExpensesType] = useState('');

    const expenseTypes: string[] = Object.values(ExpenseType) as string[];    

    const handleAddExpenseModal = () => {
        setVisibilityExpenseModal(!visibilityExpenseModal);
    }
    
    const handleCreateNewExpense = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!expenseName || !expensesType){
            notification({text: 'All fields are required.', type: NotificationTypes.Error});

        } else {
            const newExpense = {
                userId, 
                name: expenseName, 
                limit: expenseLimit,
                type: expensesType,
                date: dayjs(new Date).format('MM/DD/YYYY')
            }
    
            dispatch(createExpense(newExpense))
            notification({text: 'New Expense Category is created.', type: NotificationTypes.Success});
            setExpenseName('');
            setExpenseLimit(0);
            setExpensesType('')
            setVisibilityExpenseModal(false)
        }
    }

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
                        <p className="subtitle">Add Expense Category</p>
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
            <Typography variant="h6" textAlign={'center'} margin={'25px 0 15px'}>Expense Categories</Typography>
            <Grid container className="expenses-list-head">
                <Grid item xs={4} className="expenses-list-item">Name</Grid>
                <Grid item xs={4} className="expenses-list-item">Type</Grid>
                <Grid item xs={2} className="expenses-list-item">Limit</Grid>
                <Grid item xs={2} textAlign={"right"}>
                    <Button size="small" variant="contained" color="info"  onClick={handleAddExpenseModal} >Add</Button>
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