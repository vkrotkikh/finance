import { useEffect } from "react";

import { useAppDispatch, AppDispatch } from "../../../store";
import {clearUser} from './../../../reducers/userReducer';
import { clearExpenses } from './../../../reducers/expensesReducer';
import { clearCosts } from './../../../reducers/costsReducer';

import LoginForm from "./loginForm";

export const Login = () => {
  const dispatch: AppDispatch = useAppDispatch(); 

  useEffect(()=>{  
    localStorage.setItem('userId', '')
    dispatch(clearUser());
    dispatch(clearExpenses());
    dispatch(clearCosts())
  })
    
  return (
    <LoginForm/>
  )
  };