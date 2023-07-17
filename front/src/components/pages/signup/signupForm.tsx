import { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import {Box, Button, Grid, Typography, TextField } from '@mui/material';

import  { createUser} from '../../../reducers/userReducer';
import { useAppDispatch, RootState, AppDispatch } from "../../../store";
import { LoginFormErrorsData} from '../../../types';
import { setError } from '../../../reducers/userReducer';


const SignupForm = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch(); 

  useEffect(()=> {
    dispatch(setError(''))
  }, [])

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const userData = useSelector((state: RootState) => state.user);
  const [signupValidation, setSignupValidation] = useState<LoginFormErrorsData>({email:'', password:''});

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const formData = new FormData(formRef.current as HTMLFormElement);
      const userEmail = formData.get('email') as string;
      const userPassword = formData.get('password') as string;
      const userPasswordRepat = formData.get('repeat-password') as string;

      const validateForm = () => {
        const errors:LoginFormErrorsData = {};
        if(userEmail.trim() === ''){
          errors.email = `Email field Can't be  empty`
        } else if(!emailPattern.test(userEmail)){
          errors.email = `Email is not valid`
        } else {
          errors.email = ''
        }

        if(userPassword.trim() === '' || userPasswordRepat.trim() === ''){
          errors.password = `Please enter Password`
        } else if(userPassword != userPasswordRepat){
          errors.password = `Password does not match`
        } else {
          errors.password = ''
        }
        setSignupValidation(errors)
        return errors.email.length === 0 && errors.password.length === 0
      }

      if(validateForm()){
        await dispatch(createUser(userEmail, userPassword))
        navigate("/dashboard");
      }
  }

    return (
      <Box className="login-form">
      <Typography variant="h6" component="h2">Register</Typography>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Email" name="email" color="primary" size="small" />
              {signupValidation.email && <Typography component="p" className="text-error">{signupValidation.email}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField type="password" name="password" label="Password" color="primary" size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="password" name="repeat-password" label="Confirm Password" color="primary" size="small" />
              {signupValidation.password && <Typography component="p" className="text-error">{signupValidation.password}</Typography>}
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="medium" component={Link} to={'/'} >Back</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="medium" type="submit">Submit</Button>
              </Grid>
              {userData.error && <Typography component="p" className="text-error">{userData.error}</Typography>}
            </Grid>
          </Grid>
        </form>
      </Box>
    )
  };


  export default SignupForm;