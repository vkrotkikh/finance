import { useState, SyntheticEvent } from "react";
import { useSelector } from 'react-redux';
import {Modal, Box, Button, Grid, Typography, TextField, FormControl} from '@mui/material';
import  {changeUserPassword, setError } from '../../../reducers/userReducer';

import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";

import notification from '../../global/notification';
import { NotificationTypes } from '../../../types';


const ChangeUserPassword = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch(); 
  const userData = useSelector((state: RootState) => state.user);
  const [userOldPassword, setUserOldPassword] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPasswordRepeat, setUserNewPasswordRepeat] = useState('')
  const [visibilityChangePasswordModal, setVisibilityChangePasswordModal] = useState(false);
  const [changePasswordValidation, setChangePasswordValidation] = useState('');

  
  const handleChangePasswordModal = () => {
    setVisibilityChangePasswordModal(!visibilityChangePasswordModal);
    setUserOldPassword('')
    setUserNewPassword('')
    setUserNewPasswordRepeat('')
    setChangePasswordValidation('');
    dispatch(setError(''))
}

  const handleChangePassord = async (event: SyntheticEvent) => {
    event.preventDefault()
    let error;
    const validateForm = () => {
      if(userNewPassword.trim() === '' || userNewPasswordRepeat.trim() === ''){
        error = `Please enter Password`;
      } else if(userNewPassword != userNewPasswordRepeat){
        error = `Password does not match`
      } else {
        error = '';
      }
      setChangePasswordValidation(error)
      return error.length === 0
    }
    
    if(validateForm()){
      const result = await dispatch(changeUserPassword(userData.id, userOldPassword, userNewPassword))
      result && handleChangePasswordModal() 
      notification({text: 'Password is changed.', type: NotificationTypes.Success});
    }

    
  }

  return (
      <>
      <Grid item container justifyContent={'end'} margin={'0 0 16px 0'}>
          <Button variant="contained" color="secondary"  onClick={handleChangePasswordModal} >Change Password</Button>
      </Grid>
        <Modal
        open={visibilityChangePasswordModal}
        onClose={handleChangePasswordModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box className="modal">
                <Box className="modal-header">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Change Password
                    </Typography>
                    <CloseIcon onClick={handleChangePasswordModal} />
                </Box>
                <Box className="modal-body">
                    <form onSubmit={handleChangePassord}>
                        <Grid container className="form-contaniner">
                            <Grid item container textAlign={"right"} className="form-row">
                              <Grid item xs={12} margin={'0 0 16px 0'}>
                                <FormControl fullWidth>
                                  <TextField
                                      type="text"
                                      label="Old Password" 
                                      color="primary" 
                                      value={userOldPassword} 
                                      onChange={({ target }) => setUserOldPassword(target.value)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} margin={'0 0 16px 0'}>
                                <FormControl fullWidth>
                                  <TextField
                                      type="text"
                                      label="New Password" 
                                      color="primary" 
                                      value={userNewPassword} 
                                      onChange={({ target }) => setUserNewPassword(target.value)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} margin={'0 0 16px 0'}>
                                <FormControl fullWidth>
                                  <TextField
                                      type="text"
                                      label="Repeat Password" 
                                      color="primary" 
                                      value={userNewPasswordRepeat} 
                                      onChange={({ target }) => setUserNewPasswordRepeat(target.value)}
                                  />
                                </FormControl>
                              </Grid>
                                <Grid item xs={12}>
                                  {(changePasswordValidation || userData.error) && <Typography component="p" className="text-error"> {changePasswordValidation} {userData.error} </Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <Button size="large" variant="contained" color="secondary" onClick={handleChangePasswordModal}>Cancel</Button>
                                    </FormControl>
                                    <FormControl>
                                        <Button size="large" variant="contained" color="primary" type="submit">Add</Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Modal>
      </>
  )
}

export default ChangeUserPassword;