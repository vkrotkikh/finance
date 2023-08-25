import Header from '../../layout/header';
import { Container, Typography } from '@mui/material';

import LimitForm from "./limitForm";
import ExpensesList from "./expensesList";

export const Limits = (): JSX.Element  => {
    return (
        <>
            <Header />
            <Container maxWidth="sm">
                <Typography variant="h4" align='center' mb={'15px'}>Settings</Typography>
                <LimitForm />
                <ExpensesList />
            </Container>
        </>
    )
  };
