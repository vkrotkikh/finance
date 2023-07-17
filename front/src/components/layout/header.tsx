import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Grid, Container } from '@mui/material';
import { Link } from "react-router-dom";
import { useAppDispatch, AppDispatch } from "./../../store";
import  {clearUser} from './../../reducers/userReducer';
import { clearExpenses } from './../../reducers/expensesReducer';
import { clearCosts } from './../../reducers/costsReducer';

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
      <Box className="sidebar">
        <Grid container>
          <Grid item xs={12}>
          <Link to="/dashboard">Dashboard</Link>
          </Grid>
          <Grid item xs={12}>
                <Link to="/limits">Limits</Link>
          </Grid>
          <Grid item xs={12}>
                <Link to="/stats">Stats</Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </Grid>
        </Grid>
      </Box>
    )
  }


    return (
      <>
        <Container className="main-header" maxWidth="sm">
          <Grid container justifyContent="flex-end">
            <MenuIcon onClick={handleShowMenu} />
          </Grid>
        </Container>
        {sideBarVisible && <SideBarMenu/>}
      </>
    )
  };


export default Header;