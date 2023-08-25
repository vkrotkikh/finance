import { useState } from "react";
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import { Button, Grid, TextField, InputAdornment, Box} from '@mui/material';
import  { updateUser } from '../../../reducers/userReducer';
import { useSelector } from 'react-redux';

import notification from '../../global/notification';
import { NotificationTypes } from '../../../types';

const LimitForm = () => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const userData = useSelector((state: RootState) => state.user);
    const [myLimit, setMyLimit] = useState<number>(userData.mylimit);

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const limit = Number(event.currentTarget.value);
        setMyLimit(limit)
    } 

    const handleUpdateLimit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(updateUser({...userData, mylimit: myLimit}))
        notification({text: 'Your total limit is saved.', type: NotificationTypes.Success});
    };

    return (
        <Box className='box-flat'>
            <form onSubmit={handleUpdateLimit}>
                <Grid container>
                    <Grid item xs={12}>
                    <TextField
                        label="Total Limit"
                        value={myLimit} 
                        onChange={handleLimitChange} 
                        fullWidth
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <Button variant="contained" type="submit" color="primary">Save</Button>
                            </InputAdornment>
                        ),
                        }}
                    />
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}


export default LimitForm;