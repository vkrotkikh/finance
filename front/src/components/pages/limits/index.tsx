import { useState } from "react";
import Header from '../../layout/header';
import {Link} from "react-router-dom";
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import {Select, MenuItem, Modal, InputLabel, Box, Button, Grid, Container, Typography, TextField, FormControl} from '@mui/material';
import  { updateUser } from '../../../reducers/userReducer';
import  { updateExpense, createExpense, removeExpense } from '../../../reducers/expensesReducer';
import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

import { Expenses, ExpenseType } from '../../../types';
import CloseIcon from '@mui/icons-material/Close';

export const Limits = (): JSX.Element  => {
    const dispatch: AppDispatch = useAppDispatch(); 

    const userLimit = useSelector((state: RootState) => state.user.mylimit);
    const userId = useSelector((state: RootState) => state.user.id);
    const expensesData = useSelector((state: RootState) => state.expenses);
    const [myLimit, setMyLimit] = useState<number>(userLimit);
    const [myExpCat, setMyExpCat] = useState<Expenses[]>(expensesData);
    const [visibilityExpenseModal, setvisibilityExpenseModal] = useState(false);
    
    const [expenseName, setExpenseName] = useState('');
    const [expenseLimit, setExpenseLimit] = useState(0);
    const [expensesType, setExpensesType] = useState('');

    const expenseTypes: string[] = Object.values(ExpenseType) as string[];
    
    const handleUpdateLimit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const limit = event.currentTarget.limit.value;
        dispatch(updateUser(userId, 'mylimit', limit))
    };

    
    const handleUpdateExpenseLimit = (event: any): void => {
        event.preventDefault();
        const expense = myExpCat.find(item => item.id === event.target.id);
        if(expense){
            dispatch(updateExpense(expense))
        }
    };


    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const limit = Number(event.currentTarget.value);
        setMyLimit(limit)
    } 

    const handleAddExpenseModal = ():void => {
        setvisibilityExpenseModal(!visibilityExpenseModal);
    }
    
    const handleCreateNewExpense = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newExpense = {
            userId, 
            name: expenseName, 
            limit: expenseLimit,
            type: expensesType,
            date: dayjs(new Date).format('MM/DD/YYYY')
        }

        const updatedExpenses = await dispatch(createExpense(newExpense))
        setMyExpCat(updatedExpenses)
        setExpenseName('');
        setExpenseLimit(0);
        setvisibilityExpenseModal(false)
        setExpensesType('')
    }

    const handleRemoveCategory = async (id:string) => {
        const updatedExpenses = await dispatch(removeExpense(id))
        setMyExpCat(updatedExpenses)
    }

    const handleExpenseFieldUpdate = (expenseId:string, value: string, name: string) => {
        const updatedExpensesCategories:Expenses[] = myExpCat.map(item=> {
            if(item.id === expenseId){
                return {...item, [name]: value}
            }
            return item;
        })
        setMyExpCat(updatedExpensesCategories)
    }

    return (
        <>
        <Header />
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
                    <p className="subtitle">Need explanation text: what is the difference between fixed and household expenses?</p>
                    <form onSubmit={handleCreateNewExpense}>
                        <Grid container className="form-contaniner">
                            <Grid item xs={12} className="form-row">
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" size="small">Type</InputLabel>
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

        <Container maxWidth="sm">
        <Typography variant="h4" align='center' mb={'15px'}>Settings</Typography>
            <form onSubmit={handleUpdateLimit}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField name="limit" size="small" type="number" label="Limit" color="primary"  value={myLimit} onChange={handleLimitChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <Button size="large" variant="contained" color="primary" type="submit">Change</Button>
                    </FormControl>
                </Grid>
            </Grid>
            </form>
                    <Typography variant="h5" textAlign={'center'} margin={'25px 0 15px'}>Your Expenses</Typography>

                    <Grid container className="expenses-list-head">
                        <Grid item xs={4}>Name</Grid>
                        <Grid item xs={2}>Limit</Grid>
                        <Grid item xs={4}>Type</Grid>
                        <Grid item xs={2} textAlign="right">
                            <Button size="small" variant="contained" color="info"  onClick={handleAddExpenseModal} >Add</Button>
                        </Grid>
                    </Grid>
                    <Grid container className="expenses-list-body">
                        {myExpCat.map((category) => 
                        <form key={category.id} id={category.id} onSubmit={handleUpdateExpenseLimit}>
                            <Grid container className="expenses-list-row">
                                    <Grid item xs={4} className="expenses-list-item">
                                        <TextField
                                            type="text"
                                            color="primary" 
                                            value={category.name} 
                                            onChange={({target})=>{handleExpenseFieldUpdate(category.id, target.value, 'name')}}
                                        />
                                    </Grid>
                                    <Grid item xs={2} className="expenses-list-item">
                                        <TextField
                                            type="number"
                                            color="primary" 
                                            value={category.limit} 
                                            id={category.id}
                                            onChange={({target})=>{handleExpenseFieldUpdate(category.id, target.value, 'limit')}}
                                        />
                                    </Grid> 
                                    <Grid item xs={4} className="expenses-list-item select">
                                        <Select
                                            fullWidth
                                            value={category.type}
                                            onChange={({target})=>{handleExpenseFieldUpdate(category.id, target.value, 'type')}}
                                            >       
                                            <MenuItem value={category.type}>{category.type}</MenuItem>
                                            {expenseTypes.map((item) => (
                                                category.type != item && <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>                                 
                                    </Grid> 
                                    <Grid item xs={2} container alignItems={'center'}>
                                        <Box className='nav-menu'>
                                            <Button type="submit">Save</Button>
                                            <CloseIcon onClick={() => {handleRemoveCategory(category.id)}} />
                                        </Box>
                                    </Grid> 
                            </Grid>
                        </form>
                        )}   
                    </Grid>
                    
                <Grid>
                    <FormControl fullWidth>
                        <Button component={Link} to={'/dashboard'} style={{margin:'25px 0 0 0'}}  size="large" variant="contained" color="secondary" >Back</Button>
                    </FormControl>
                </Grid>
        </Container>
        </>
      
    )
  };
