import Header from '../../layout/header'
import { Container } from '@mui/material';
import CostForm from "./costForm";
import MyExpenses from "./myExpenses";

export const Dashboard = (): JSX.Element => { 
    return (
        <>
            <Header />
            <Container  maxWidth="sm">
                <MyExpenses />
                <CostForm />
            </Container>
        </>
    )
}