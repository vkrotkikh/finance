import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Grid, Container, Fab } from '@mui/material';
import { Link } from "react-router-dom";
import { linksLoggedIntUser } from "../../constants";

import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import LogoutIcon from '@mui/icons-material/Logout';

const iconComponents:any = {
  DashboardIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  PersonIcon,
  LegendToggleIcon,
  LogoutIcon
}


const Header = (): JSX.Element   => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  
  const handleShowMenu = () => {
    setSideBarVisible(!sideBarVisible)
  }

  const SideBarMenu = () => {

    return (
      <>
        <Box className="sidebar-overlay"  onClick={handleShowMenu}></Box>
        <Box className="sidebar">
          <Grid container>
            {linksLoggedIntUser.map((item) => {
              const SvgIcon = iconComponents[item.icon]
                return (
                <Grid key={item.link} item xs={12}>
                <Link to={item.link}>
                  <SvgIcon />
                  <Box component="span">{item.name}</Box>
                  </Link>
                </Grid> 
                )   
              })}
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