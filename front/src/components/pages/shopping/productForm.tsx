import { useState, SyntheticEvent } from "react";
import {Button, Grid, Typography, TextField, Box, InputAdornment } from '@mui/material';

import { NewProduct, NotificationTypes } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  { createProduct } from '../../../reducers/shoppingReducer';
import notification from '../../global/notification';



const ProductForm = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const userData = useSelector((state: RootState) => state.user);
    const [productName, setProductName] = useState('');
  
  
    const addNewProduct = (event: SyntheticEvent) => {
        event.preventDefault()
        if(productName){
            const newProduct:NewProduct = {
                userId: userData.id,
                name: productName
            }
            dispatch(createProduct(newProduct));
            setProductName('');
            notification({text: 'New Product(s) is added.', type: NotificationTypes.Success});
        } else {
            notification({text: `List of Products can't be empty.`, type: NotificationTypes.Error});            
        }
    }
  
    return (
        <Box className='box-flat'>
            <form onSubmit={addNewProduct}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align='center'>Products can be added separated by commas</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                            label="List of Products"
                            value={productName} 
                            onChange={({ target }) => setProductName(target.value)} 
                            fullWidth
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <Button variant="contained" type="submit" color="primary">Add</Button>
                                </InputAdornment>
                            ),
                            }}
                        />
                      </Grid>
                </Grid>
            </form>
        </Box>
    )
  }


  export default ProductForm;