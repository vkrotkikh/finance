import Header from '../../layout/header'
import { Typography, Container, Grid, Box } from '@mui/material';
import { Cost } from '../../../types';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  {removeCost } from '../../../reducers/costsReducer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Expenses, NewCost } from '../../../types';


const StatChart = () => {
  const costs = useSelector((state: RootState) => state.costs);
  const expenses = useSelector((state: RootState) => state.expenses);
  const colors = ['#2196F3', '#673AB7', '#C0CA33', '#F4511E', '#039BE5', '#43A047', '#FDD835', '#795548', '#607D8B', '#8BC34A']
  const statObj:any =  [];


  // NEED REFACTORING

  const mergeObjects = (obj1: any, obj2: any) => {
    const result:any = { ...obj1 };
    for (const key of Object.keys(obj2)) {
      if (typeof result[key] != "string" && result[key]) {
        result[key] = Number((result[key] + obj2[key]).toFixed(2));
      } else {
        result[key] = obj2[key];
      }
    }
    return result;
  }

  costs.map((item)=> {
    const itemDate = new Date(item.date).toLocaleString('en-EN', { month: 'long' });
    const itemCat = expenses.find((expense)=> expense.id === item.expenseId);

    if(!itemCat){ return null }

    const cost = {
      name: itemDate,
      [itemCat.name]: item.ammount
    }

    const costExists = statObj.find((item:any)=> item.name === cost.name)
    if(costExists){
      const mergedObject = mergeObjects(costExists, cost);
      const index = statObj.indexOf(costExists);
      statObj[index] = mergedObject;
    } else {
      statObj.push(cost)
    }
  })

  expenses.map((expense)=> {
    if(expense.type === 'fixed'){
      statObj.map((item:any, index:number)=> {
        statObj[index] = {...item, [expense.name]: expense.limit}
      })
    }
  })

  statObj.reverse()

  return (
    <BarChart width={600} height={300} data={statObj}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 'auto', backgroundColor: '#ccc' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    {expenses.map((item, index)=>
      <Bar key={item.id} dataKey={item.name} fill={colors[index]} barSize={30} />
    )}
  </BarChart>
  )
}

const CostItem = ({cost}:{cost:Cost}) => {
  const dispatch: AppDispatch = useAppDispatch(); 
  const expenses = useSelector((state: RootState) => state.expenses);
  const expense = expenses.find((expense)=> expense.id === cost.expenseId)
  if(!expense?.name){
    return null
  }
  const handleRemoveCost = (id:string) => {
    dispatch(removeCost(id))
  }
  return (
    <>
    <Grid container alignItems={'center'} justifyContent="center" className='table-row'>
      <Grid className='table-col' item xs={3}>{expense?.name}</Grid>
      <Grid className='table-col' item xs={3}>{cost.ammount}</Grid>
      <Grid className='table-col' item xs={3}>{cost.date}</Grid>
      <Grid className='table-col' item xs={1}><CloseIcon onClick={() => {handleRemoveCost(cost.id)}} /></Grid>
    </Grid>
    </>
  )
}

const CostsList = () => {
  const costs = useSelector((state: RootState) => state.costs);

  return (
    <>
    <Typography variant="h5" align='center'>Costs</Typography>
    <Box className='table costs-table'>
      <Box className='table-head'>
        <Grid container className='table-row' justifyContent="center">
          <Grid className='table-col' item xs={3}>Category</Grid>
          <Grid className='table-col' item xs={3}>Ammount</Grid>
          <Grid className='table-col' item xs={3}>Date</Grid>
          <Grid className='table-col' item xs={1}></Grid>
        </Grid>
      </Box>
      <Box className='table-body'>
        {costs.map((cost) =>
              <CostItem key={cost.id} cost={cost} />
        )}
      </Box>
    </Box>
    </>
  )
}

export const Stats = () => {
    return (
      <>
        <Header />
        
        <Container maxWidth="sm">
          <Typography variant="h4" align='center'> Statistic</Typography>
          <StatChart />
          <CostsList />
        </Container>
      </>
    )
  };