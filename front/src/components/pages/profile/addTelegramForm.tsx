import { useState, SyntheticEvent } from "react";
import {Button, Grid, TextField,  InputAdornment } from '@mui/material';
import  {updateUser } from '../../../reducers/userReducer';

import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import notification from '../../global/notification';
import { NotificationTypes } from '../../../types';



const TelegramForm = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch(); 
  const userData = useSelector((state: RootState) => state.user);
  const [telegramNames, setTelegramNames] = useState(userData.telegramNames?.toString());

  const updateTelegramNames = async (event: SyntheticEvent) => {
    event.preventDefault()
    const telegramNamesArray = telegramNames ? telegramNames.split(',') : [];
    await dispatch(updateUser({...userData , telegramNames: telegramNamesArray}))
    notification({text: 'Telegram Names updated.', type: NotificationTypes.Success});
  }

  return (
        <Grid container item>
            <Grid item xs={12}>
                <p className="subtitle">{`You can add your telegram Usernames to connect it with bot. do it without @ or # eg: "myusername, mysecondusername"`}</p>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                <form onSubmit={updateTelegramNames}>
                    <TextField
                        label="Telegram Names"
                        value={telegramNames} 
                        onChange={({ target }) => setTelegramNames(target.value)}
                        fullWidth
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <Button variant="contained" type="submit" color="primary">Save</Button>
                            </InputAdornment>
                        ),
                        }}
                    />
                </form>
                </Grid>
            </Grid>
      </Grid>
  )
}

export default TelegramForm;