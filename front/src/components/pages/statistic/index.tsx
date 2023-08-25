import Header from '../../layout/header'
import { Typography, Container } from '@mui/material';

import CostsChart from './costsChart';
import CostsList from './costsList';

export const Stats = () => {
    return (
      <>
        <Header />
        
        <Container maxWidth="sm">
          <Typography variant="h4" align='center'> Statistic</Typography>
          <CostsChart />
          <CostsList />
        </Container>
      </>
    )
  };