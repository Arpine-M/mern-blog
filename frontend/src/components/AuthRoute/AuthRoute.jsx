import React from 'react'
import Login from '../User/Login'
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';
import { useQuery } from '@tanstack/react-query';
import {Navigate} from 'react-router-dom'
import AuthCheckingComponent from '../Home/AuthCheckingComponent';

const AuthRoute = ({children}) => {

    const {isError, isLoading, data, error, isSuccess, refetch} = useQuery({
        queryKey:["user-auth"],
        queryFn: checkAuthStatusAPI
    
      });

    if (isLoading) {
        return <AuthCheckingComponent/>
    }
    if (!data) {
        return <Navigate to="/login"/>
    }

    return children
   
}

export default AuthRoute
