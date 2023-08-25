import { useState, SyntheticEvent } from "react";
import { useSelector } from 'react-redux';
import {Button, Grid, TextField, FormControl} from '@mui/material';
import  {updateUser } from '../../../reducers/userReducer';

import { useAppDispatch, RootState, AppDispatch } from "../../../store";

import notification from '../../global/notification';
import { NotificationTypes } from '../../../types';

const ProfileForm = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch(); 
  const userData = useSelector((state: RootState) => state.user);
  const [userName, setUserName] = useState(userData.name)

  const updateUserData = (event: SyntheticEvent) => {
    event.preventDefault()
    if(!userName){
        notification({text: `Name can't be empty`, type: NotificationTypes.Error})
    } else {
      dispatch(updateUser({...userData , name: userName}))
      notification({text: 'User Data is updated', type: NotificationTypes.Success})
    }
  }


  return (
    <Grid container>
      <form onSubmit={updateUserData}>
        <Grid container>
          <Grid item xs={12} margin={'0 0 16px 0'}>
            <FormControl fullWidth>
              <TextField
                  type="text"
                  label="Email" 
                  color="primary" 
                  disabled
                  value={userData.email} 
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} margin={'0 0 16px 0'}>
            <FormControl fullWidth>
              <TextField
                  type="text"
                  label="Name" 
                  color="primary" 
                  value={userName} 
                  onChange={({ target }) => setUserName(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} margin={'0 0 32px 0'}>
              <FormControl fullWidth>
                  <Button size="large" variant="contained" color="primary" type="submit">Update</Button>
              </FormControl>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default ProfileForm;