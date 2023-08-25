import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";
import { XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { Checkbox, Grid, FormControlLabel } from '@mui/material';

import { mergeObjects, monthsList } from '../../../utils/helpers';
import { chartStatItem, Cost } from '../../../types';

const CostsChart = () => {
    const costs = useSelector((state: RootState) => state.costs);
    const expenses = useSelector((state: RootState) => state.expenses);
    const [sohwFixedCosts, setFixedCosts] = useState(false);


    const colors = ['#2196F3', '#673AB7', '#C0CA33', '#F4511E', '#039BE5', '#43A047', '#FDD835', '#795548', '#607D8B', '#8BC34A']


    const costsArray = costs.reduce((result:chartStatItem[], item:Cost)=> {
        const itemDate = new Date(item.date).toLocaleString('en-EN', { month: 'long' });
        const itemCat = expenses.find((expense)=> expense.id === item.expenseId);

        if(!itemCat){ return result }
  
        const cost = {
            name: itemDate,
            [itemCat.name]: item.ammount
          }

          const costExists = result.find((item:chartStatItem)=> item.name === cost.name)
          
          if(costExists){
            const mergedObject = mergeObjects(costExists, cost);
            const index = result.indexOf(costExists);
            result[index] = mergedObject;
          } else {
            result.push(cost)
          }        
          
        return result;
      }, [])
    
    if(sohwFixedCosts){  
        expenses.map((expense)=> {
          if(expense.type === 'fixed'){
            costsArray.map((item:chartStatItem, index:number)=> {
                costsArray[index] = {...item, [expense.name]: expense.limit}
            })
          }
        })
    }

    costsArray.sort((a:chartStatItem, b:chartStatItem) => {
      return monthsList.indexOf(a.name.toString()) - monthsList.indexOf(b.name.toString());
    });
  
    return (
        <Grid container>
            <Grid item xs={12} className="chartWrapper">
            <LineChart width={500} height={300} data={costsArray}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <Tooltip wrapperStyle={{ width: 'auto', backgroundColor: '#ccc' }} />
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                {expenses.map((item, index)=>
                    <Line key={item.id} type="monotone" dataKey={item.name} stroke={colors[index]} />
                )}
            </LineChart>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} justifyContent={"space-around"}>
                <FormControlLabel control={<Checkbox checked={sohwFixedCosts} onChange={(event)=> {setFixedCosts(event.target.checked)}} inputProps={{ 'aria-label': 'controlled' }} />} label="Show Fixed Costs" />
            </Grid>
        </Grid>
    )
  }


  export default CostsChart;