import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Login, Signup, Dashboard, Stats, Limits} from './components/pages';
import { useAppDispatch, AppDispatch } from "./store";
import { initializeUserData } from './reducers/userReducer';
import { initializeExpensesData } from './reducers/expensesReducer';
import { initializeCostsData } from './reducers/costsReducer';

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
      }
      setIsStoreReady(true)
    }
    fetchData()
  }, [dispatch]);

// find out if it is possible to use react routers await for store ready
// https://reactrouter.com/en/main/components/await

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
          <Route path="/stats" element={<PrivateRoute component={Stats} />} />
        </Routes>
    </Router>
    </>
  );

}

export default App;