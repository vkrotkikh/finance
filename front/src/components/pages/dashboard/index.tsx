import { useState, SyntheticEvent, useEffect } from "react";
import Header from '../../layout/header'
import { styled } from '@mui/material/styles';
import {MenuItem, Select, Button, Grid, Container, Typography, TextField, FormControl, InputLabel } from '@mui/material';

import { concatYearMonth } from '../../../constants'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Expenses, NewCost } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  { createCost } from '../../../reducers/costsReducer';


const BorderLinearProgress = styled(LinearProgress)(({ theme }: {theme:any}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

const MyExpenses = (): JSX.Element => {
    const date = new Date();
    const costsData = useSelector((state: RootState) => state.costs);
    const userData = useSelector((state: RootState) => state.user);
    const expensesData = useSelector((state: RootState) => state.expenses);
    const userRegistrationDate = new Date(userData.regDate);

    const [shownDate, setShownDate] = useState(date);
    const [isPrevDisabled, setisPrevDisabled] = useState(true);
    const [isNextDisabled, setisNextDisabled] = useState(true);

    useEffect(()=>{
        if(concatYearMonth(userRegistrationDate) < concatYearMonth(shownDate)){
            setisPrevDisabled(false)
        }
    },[])

    const currentMonthCosts = costsData.filter((c) => {
        const costMonth = new Date(c.date).getMonth()
        const currentMonth = shownDate.getMonth();
        if(costMonth ===  currentMonth){
            return c
        }
    })

    const fixedExpensesAmount = expensesData.reduce((a, e) => {
        if(e.type === 'fixed'){
            return a + e.limit;
        } else {
            return 0;
        }
    }, 0)

    const choosenMonth = shownDate.toLocaleString('en-EN', { month: 'long' });
    const totalCosts = currentMonthCosts.reduce((a, c) => {return a + c.ammount}, 0) + Number(fixedExpensesAmount);

    const handleDate = (type:string) => {
        let newDate;
        if(type === 'next'){
            newDate = new Date(shownDate.setMonth(shownDate.getMonth() + 1));
        } else {
            newDate = new Date(shownDate.setMonth(shownDate.getMonth() - 1));
        }

        concatYearMonth(shownDate) < concatYearMonth(date) ? setisNextDisabled(false) : setisNextDisabled(true)
        concatYearMonth(userRegistrationDate) < concatYearMonth(shownDate) ? setisPrevDisabled(false) : setisPrevDisabled(true)
        setShownDate(newDate)
    }


    const Category = ({category}: {category:Expenses}) => {
        const categoryCosts = currentMonthCosts.filter((cost) => cost.expenseId === category.id)
        const categorySpent = categoryCosts.reduce((a,c) => {return  a + c.ammount}, 0);
        let progressPercentages;
        if(category.type === 'fixed'){
            progressPercentages = 100;
        } else {
            progressPercentages = Math.round(categorySpent / (category.limit/100)) > 100 ? 100 : Math.round(categorySpent / (category.limit/100));
        }
        
        if(categorySpent || category.type === 'fixed'){
            return (
                <Grid container item alignItems={'end'} className="limit-category">
                <Grid item xs={9}>
                    <p>{category.name} - {category.limit.toFixed(2)} $</p>
                    <BorderLinearProgress variant="determinate" value={progressPercentages} />
                </Grid>
                <Grid item xs={3} textAlign={'right'}>
                    <p>{category.type === 'fixed' ? category.limit.toFixed(2) : categorySpent.toFixed(2)} $</p>
                </Grid>
            </Grid>
            )
        } else {
            return <></>
        }
    }
 
    return (
        <>
        <div className='box-flat'>
        <Grid container spacing={2}>
            <Grid container item xs={12}>
                <Grid item xs={3}>
                    <Button onClick={()=>{handleDate('prev')}} disabled={isPrevDisabled}>prev</Button>
                </Grid>
                <Grid item xs={6}><Typography variant="h4" align='center'> {choosenMonth}</Typography></Grid>
                <Grid item xs={3} textAlign={'right'}>
                    <Button onClick={()=>{handleDate('next')}}  disabled={isNextDisabled}>next</Button>
                    </Grid>
            </Grid>
            <Grid container item alignItems={'center'}>
                <Grid item xs={6}>
                <Typography variant="h6">Limits</Typography>
                </Grid>
                <Grid item xs={6} textAlign={'right'}>
                <p>{totalCosts} of {userData.mylimit} $</p>
                </Grid>
            </Grid>
            <Grid container className='box-limits'>
                {expensesData.map((category) => 
                    <Category key={category.id} category={category} />
                )} 
            </Grid>
        </Grid>
        </div>      
        </>
    )
}

export const CostForm = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const expensesData = useSelector((state: RootState) => state.expenses);
    const userData = useSelector((state: RootState) => state.user);
    const date = new Date(); 
    const prevMonth = new Date(date.getFullYear(), (date.getMonth() - 1), 1);

    const [spendingCategoryId, setSpendingCategoryId] = useState('');
    const [spendingAmount, setSpendingAmount] = useState('');
    const [spendingDate, setSpendingDate] = useState<Dayjs | null>(dayjs(new Date()));


    const addNewCost = (event: SyntheticEvent) => {
        event.preventDefault()
        const formattedDate = dayjs(spendingDate).format('MM/DD/YYYY');

        const newCost:NewCost = {
            userId: userData.id,
            expenseId: spendingCategoryId,
            ammount: Number(spendingAmount),
            date: formattedDate
        }
        dispatch(createCost(newCost));
        setSpendingCategoryId('');
        setSpendingAmount('');
        setSpendingDate(dayjs(date));
    }

    return (
        <div className='box-flat'>
            <form onSubmit={addNewCost}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align='center'> Add Spending</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                type="number"
                                label="Amount" 
                                color="primary" 
                                value={spendingAmount} 
                                onChange={({ target }) => setSpendingAmount(target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={spendingCategoryId}
                                label="Category"
                                onChange={({ target }) => setSpendingCategoryId(target.value)}
                            >
                                {expensesData.map((item) => (
                                    item.type != "fixed" && <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> 
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                            <DatePicker 
                            minDate={dayjs(prevMonth)}
                            maxDate={dayjs(date)}
                            label="Date" 
                            onChange={(spendingDate) => setSpendingDate(spendingDate)} 
                            value={spendingDate} /> 
                        </LocalizationProvider>
                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Button size="large" variant="contained" color="primary" type="submit">Submit</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}


export const Dashboard = (): JSX.Element => { 
    return (
        <>
            <Header />
            <Container  maxWidth="sm">
                <MyExpenses />
                <CostForm />
            </Container>
        </>
    )
}