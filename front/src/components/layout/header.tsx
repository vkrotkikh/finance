import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Grid, Container, Fab } from '@mui/material';
import { Link } from "react-router-dom";
import { useAppDispatch, AppDispatch } from "./../../store";
import  {clearUser} from './../../reducers/userReducer';
import { clearExpenses } from './../../reducers/expensesReducer';
import { clearCosts } from './../../reducers/costsReducer';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (): JSX.Element   => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const dispatch: AppDispatch = useAppDispatch(); 
  
  const handleShowMenu = () => {
    setSideBarVisible(!sideBarVisible)
  }

  const handleLogout = () => {
    localStorage.setItem('userId', '')
    dispatch(clearUser());
    dispatch(clearExpenses());
    dispatch(clearCosts())
  }

  const SideBarMenu = () => {

    return (
      <>
        <Box className="sidebar-overlay"  onClick={handleShowMenu}></Box>
        <Box className="sidebar">
          <Grid container>
            <Grid item xs={12}>
            <Link to="/dashboard">
              <DashboardIcon />
              <Box component="span">Dashboard</Box>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/limits">
                <CreditCardIcon />
                <Box component="span">Limits</Box>
                
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/stats">
                <LegendToggleIcon />
                <Box component="span">Statistic</Box>
                
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/shopping">
                <ShoppingCartIcon />
                <Box component="span">Shopping List</Box>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/profile">
                <PersonIcon />
                <Box component="span">Profile</Box>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to="/" onClick={handleLogout}>
                <LogoutIcon />
                <Box component="span">Logout</Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }


    return (
      <>
        <Container className="main-header" maxWidth="sm">
          <Grid container justifyContent="flex-end">
            <Fab color="primary" aria-label="add" onClick={handleShowMenu}>
                {sideBarVisible ? <CloseIcon className="menu-icon" /> : <MenuIcon className="menu-icon" /> }
            </Fab>
          </Grid>
        </Container>
        {sideBarVisible && <SideBarMenu/>}
      </>
    )
  };


export default Header;