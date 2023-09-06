import { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {Login, Signup, Dashboard, Stats, Limits, Shopping, Profile} from './components/pages';
import { useAppDispatch, AppDispatch } from "./store";
import { initializeUserData } from './reducers/userReducer';
import { initializeExpensesData } from './reducers/expensesReducer';
import { initializeCostsData } from './reducers/costsReducer';
import { initializeShoppingData } from './reducers/shoppingReducer';

import PrivateRoute from "./components/global/privateRoute";

function App() { 
  const [isStoreReady, setIsStoreReady] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchData = async () => {
      if(userId){
        await dispatch(initializeUserData(userId));
        await dispatch(initializeExpensesData(userId));
        await dispatch(initializeCostsData(userId))
        await dispatch(initializeShoppingData(userId))
      }
      setIsStoreReady(true)
    }
    fetchData()
  }, []);

if(!isStoreReady){
  return <></>
}

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/limits" element={<PrivateRoute component={Limits} />} />
          <Route path="/shopping" element={<PrivateRoute component={Shopping} />} />
          <Route path="/statistic" element={<PrivateRoute component={Stats} />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        </Routes>
    </Router>
    </>
  );

}

export default App;