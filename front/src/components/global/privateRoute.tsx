import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { RootState } from "./../../store";
import { useSelector } from 'react-redux';


  const PrivateRoute = ({component: Component }: {component: React.ComponentType<any>}) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    if(!user.isLoggedIn){
      useEffect(()=>{
        navigate('/')
      },[])
      return null
    }

    return (
      <Component />
    );
  };

export default PrivateRoute;