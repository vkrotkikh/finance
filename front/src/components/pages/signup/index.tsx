import { useEffect } from "react";

import { useAppDispatch, AppDispatch } from "../../../store";
import {clearUser} from './../../../reducers/userReducer';
import { clearExpenses } from './../../../reducers/expensesReducer';
import { clearCosts } from './../../../reducers/costsReducer';

import SignupForm from "./signupForm";


export const Signup = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch(); 
  useEffect(()=>{  
    localStorage.setItem('userId', '')
    dispatch(clearUser());
    dispatch(clearExpenses());
    dispatch(clearCosts())
  })

    return (
      <SignupForm/>
    )
  };