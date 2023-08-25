import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom";
import {Box, Button, Grid, TextField, FormControl, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import { LoginFormErrorsData} from '../../../types';
import  { loginUser, initializeUserData } from '../../../reducers/userReducer';
import  {initializeCostsData } from '../../../reducers/costsReducer';
import { initializeExpensesData } from '../../../reducers/expensesReducer';

const LoginForm = () => {
  const dispatch: AppDispatch = useAppDispatch(); 
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const userData = useSelector((state: RootState) => state.user);
  const [signupValidation, setSignupValidation] = useState<LoginFormErrorsData>({email:'', password:''});

  const handleLoginForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const formData = new FormData(formRef.current as HTMLFormElement);
    const userEmail = formData.get('email') as string;
    const userPassword = formData.get('password') as string;

    const validateForm = () => {
      const errors:LoginFormErrorsData = {};
      if(userEmail.trim() === ''){
        errors.email = `Email field Can't be  empty`
      } else if(!emailPattern.test(userEmail)){
        errors.email = `Email is not valid`
      } else {
        errors.email = ''
      }

      if(userPassword.trim() === ''){
        errors.password = `Please enter Password`
      } else {
        errors.password = ''
      }

      setSignupValidation(errors)
      return errors.email.length === 0 && errors.password.length === 0
    }

    if(validateForm()){
      await dispatch(loginUser(userEmail, userPassword))
      const userId = localStorage.getItem('userId');
      if(userId){
        await dispatch(initializeUserData(userId));
        await dispatch(initializeExpensesData(userId));
        await dispatch(initializeCostsData(userId))
        navigate("/dashboard");
      }
    }
  }


    return (
      <Box className="login-form">
      <Typography variant="h6" component="h2">Login</Typography>
        <form onSubmit={handleLoginForm}  ref={formRef}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <TextField name="email" label="Email" color="primary" size="small" />
              </FormControl>
              {signupValidation.email && <Typography component="p" className="text-error">{signupValidation.email}</Typography>}              
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <TextField type="password" name="password" label="Password" color="primary" size="small"  />
              </FormControl>
              {signupValidation.password && <Typography component="p" className="text-error">{signupValidation.password}</Typography>}              
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button style={{margin:'15px 0 0 0'}} size="medium"  variant="contained" color="primary" type="submit">Sign In</Button>
              </FormControl>
              {userData.error && <Typography component="p" className="text-error">{userData.error}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" textAlign={"center"}>OR</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button size="medium" component={Link} to="/signup" variant="contained" color="secondary">Register</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    )
  };

  export default LoginForm;