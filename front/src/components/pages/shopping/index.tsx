import Header from '../../layout/header'
import { Container, Typography } from '@mui/material';

import ProductForm from "./productForm";
import ProductsList from "./productList";

export const Shopping = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" align='center'> Shopping</Typography>
        <ProductForm />
        <ProductsList />
      </Container>
    </>
  )
};