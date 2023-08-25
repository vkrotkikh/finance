import { Grid, Typography, Box } from '@mui/material';

import { Product, NotificationTypes } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import  { removeProduct } from '../../../reducers/shoppingReducer';
import CloseIcon from '@mui/icons-material/Close';

import notification from '../../global/notification';


const ProductItem = ({product}:{product:Product}) => {
    const dispatch: AppDispatch = useAppDispatch(); 
  
    const handleRemoveProduct = (id:string) => {
      dispatch(removeProduct(id))
      notification({text: 'Product is removed.', type: NotificationTypes.Info});
    }
    
    return (
      <>
      <Grid container alignItems={'center'} justifyContent="center" className='table-row'>
        <Grid className='table-col' item xs={10}>{product.name}</Grid>
        <Grid className='table-col' item xs={2}><CloseIcon onClick={() => {handleRemoveProduct(product.id)}} /></Grid>
      </Grid>
      </>
    )
  }
  
  const ProductsList = () => {
    const products = useSelector((state: RootState) => state.shopping);
  
    return (
      <Box className='box-flat'>
      <Typography variant="h5" align='center'>Products List</Typography>
      <Box className='table products-table'>
        <Box className='table-head'>
          <Grid container className='table-row' justifyContent="center">
            <Grid className='table-col' item xs={10}>Name</Grid>
            <Grid className='table-col' item xs={2}></Grid>
          </Grid>
        </Box>
        <Box className='table-body'>
          {products.map((product) =>
                <ProductItem key={product.id} product={product} />
          )}
        </Box>
      </Box>
      </Box>
    )
  }


export default ProductsList;