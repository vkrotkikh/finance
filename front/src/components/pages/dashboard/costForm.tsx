import { useState, SyntheticEvent } from "react";
import {MenuItem, Select, Button, Grid, Typography, TextField, FormControl, InputLabel, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { NewCost, NotificationTypes } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  { createCost } from '../../../reducers/costsReducer';

import notification from '../../global/notification';


const CostForm = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const expensesData = useSelector((state: RootState) => state.expenses);
    const userData = useSelector((state: RootState) => state.user);
    const date = new Date(); 
    const prevMonth = new Date(date.getFullYear(), (date.getMonth() - 1), 1);

    const [spendingCategoryId, setSpendingCategoryId] = useState('');
    const [spendingAmount, setSpendingAmount] = useState('');
    const [spendingDate, setSpendingDate] = useState<Dayjs | null>(dayjs(new Date()));

    const minCostDate = dayjs(prevMonth).diff(dayjs(userData.regDate), 'days', true) < 0 ? userData.regDate : prevMonth

    const addNewCost = (event: SyntheticEvent) => {
        event.preventDefault()

        if(!spendingCategoryId || !setSpendingAmount){
            setSpendingDate(dayjs(date));notification({text: `All fields are required.`, type: NotificationTypes.Error});
        } else {
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
                setSpendingDate(dayjs(date));notification({text: 'New Spending is added.', type: NotificationTypes.Success});
            }
    }

    return (
        <Box className='box-flat'>
            <form onSubmit={addNewCost}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align='center'> Add Spending</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                type="number"
                                label="Ammount" 
                                color="primary" 
                                value={spendingAmount} 
                                onChange={({ target }) => setSpendingAmount(target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="cost-form-category">Category</InputLabel>
                            <Select
                                labelId="cost-form-category"
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
                                minDate={dayjs(minCostDate)}
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
        </Box>
    )
}


export default CostForm;