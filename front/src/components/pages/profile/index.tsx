import {Container, Typography } from '@mui/material';

import Header from '../../layout/header'

import TelegramForm from "./addTelegramForm";
import ChangeUserPassword from "./changePasswordForm";
import ProfileForm from "./profileUserDataForm";

export const Profile = () => {

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" align='center'> Profile</Typography>
        <div className='box-flat'>
          <ChangeUserPassword />
          <ProfileForm />
          <TelegramForm />   
        </div>
      </Container>
    </>
  )
};