import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Expenses } from '../../../types';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";



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
        if(dayjs(shownDate).diff(dayjs(userRegistrationDate), 'month', true) >= 1){
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
            return a + Number(e.limit);
        } else {
            return a;
        }
    }, 0)

    const choosenMonth = shownDate.toLocaleString('en-EN', { month: 'long' });
    const totalCosts = currentMonthCosts.reduce((a, c) => {return a + c.ammount}, 0) + Number(fixedExpensesAmount);

    const handleDate = (direction:number) => {
        const newDate = new Date(shownDate.setMonth(shownDate.getMonth() + direction ));

        Math.round(dayjs(date).diff(dayjs(shownDate), 'month', true)) > 0 ? setisNextDisabled(false) : setisNextDisabled(true)
        Math.round(dayjs(userRegistrationDate).diff(dayjs(shownDate), 'month', true)) < 0 ? setisPrevDisabled(false) : setisPrevDisabled(true)
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
                <Grid container item alignItems={'end'} className="limit-category" justifyContent={'space-between'}>
                    <Grid item>
                        <p><b>{category.name}</b> - ${category.limit}</p>
                    </Grid>
                    <Grid item textAlign={'right'}>
                        <p><b>${category.type === 'fixed' ? category.limit.toFixed(2) : categorySpent.toFixed(2)}</b></p>
                    </Grid>
                    <Grid item xs={12}>
                        <BorderLinearProgress className="progress-bar" variant="determinate" value={progressPercentages} />
                    </Grid>
                </Grid>
            )
        } else {
            return <></>
        }
    }
 
    return (
        <>
        <Box className='box-flat'>
            <Grid container spacing={2}>
                <Grid container item xs={12}>
                    <Grid item xs={3}>
                        <Button onClick={()=>{handleDate(-1)}} disabled={isPrevDisabled}>prev</Button>
                    </Grid>
                    <Grid item xs={6}><Typography variant="h6" align='center'> {choosenMonth}</Typography></Grid>
                    <Grid item xs={3} textAlign={'right'}>
                        <Button onClick={()=>{handleDate(1)}}  disabled={isNextDisabled}>next</Button>
                    </Grid>
                </Grid>
                <Grid container item alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                    <p>Spendings</p>
                    </Grid>
                    <Grid item textAlign={'right'}>
                    <p>${totalCosts} of ${userData.mylimit}</p>
                    </Grid>
                </Grid>
                <Grid container className='box-limits'>
                    {expensesData.map((category) => 
                        <Category key={category.id} category={category} />
                    )} 
                </Grid>
            </Grid>
        </Box>      
        </>
    )
}


export default MyExpenses;