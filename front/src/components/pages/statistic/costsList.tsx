import { useState } from 'react';
import { Typography, Grid, Box,Link } from '@mui/material';
import { Cost } from '../../../types';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  {removeCost } from '../../../reducers/costsReducer';
import HeightIcon from '@mui/icons-material/Height';

const CostItem = ({cost}:{cost:Cost}) => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const expenses = useSelector((state: RootState) => state.expenses);
    const expense = expenses.find((expense)=> expense.id === cost.expenseId)
    if(!expense){ return null }
    
    const handleRemoveCost = (id:string) => {
      dispatch(removeCost(id))
    }
    
    return (
      <>
      <Grid container alignItems={'center'} justifyContent="center" className='table-row'>
        <Grid className='table-col' item xs={4}>{expense?.name}</Grid>
        <Grid className='table-col' item xs={3}>{cost.ammount}</Grid>
        <Grid className='table-col' item xs={3}>{cost.date}</Grid>
        <Grid className='table-col actions' item xs={2}><CloseIcon onClick={() => {handleRemoveCost(cost.id)}} /></Grid>
      </Grid>
      </>
    )
  }
  
  const CostsList = () => {
    const costs = useSelector((state: RootState) => state.costs)
    const [sortBy, setSortBy] = useState('date')
    const [costsList, setCostsList] = useState(costs.slice().sort((a, b) => new Date(a.date).getTime() - new Date( b.date).getTime()))

    const handleSortCosts = (name:string) => {
        switch(name){
            case 'category':
                sortBy === name ? setCostsList(costsList.slice().reverse())
                : setCostsList(costs.slice().sort((a, b) => a.expenseId.localeCompare(b.expenseId)))
                setSortBy('category')
            break;
            case 'ammount':
                sortBy === name ? setCostsList(costsList.slice().reverse())
                : setCostsList(costs.slice().sort((a, b) => a.ammount - b.ammount))
                setSortBy('ammount')
            break;
            case 'date':
                sortBy === name ? setCostsList(costsList.slice().reverse())
                : setCostsList(costs.slice().sort((a, b) => new Date(a.date).getTime() - new Date( b.date).getTime()))
                setSortBy('date')
            break
        }
    }
    
    return (
      <>
      <Typography variant="h5" align='center'>Costs</Typography>
      <Box className='table costs-table'>
        <Box className='table-head'>
          <Grid container className='table-row' justifyContent="center">
            <Grid className='table-col' item xs={4}>
                <Link component="button" className='table-col-sort-link' onClick={()=>{handleSortCosts('category')}}>
                    Category    
                    { sortBy == 'category' && <HeightIcon />}
                </Link>
            </Grid>
            <Grid className='table-col' item xs={3}>
                <Link component="button" className='table-col-sort-link' onClick={()=>{handleSortCosts('ammount')}}>
                    Sum    
                    { sortBy == 'ammount' && <HeightIcon />}
                </Link>
                </Grid>
            <Grid className='table-col' item xs={3}>
                <Link component="button" className='table-col-sort-link' onClick={()=>{handleSortCosts('date')}}>
                    Date
                    { sortBy == 'date' && <HeightIcon />}
                </Link>
            </Grid>
            <Grid className='table-col' item xs={2}></Grid>
          </Grid>
        </Box>
        <Box className='table-body'>
          {costsList.reverse().map((cost) =>
                <CostItem key={cost.id} cost={cost} />
          )}
        </Box>
      </Box>
      </>
    )
  }



  export default CostsList;