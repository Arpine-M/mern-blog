import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {checkAuthStatusAPI} from '../../APIServices/users/usersAPI.js';
import {useDispatch} from 'react-redux';
import {isAuthenticated} from '../../redux/slices/authSlices.js';
import { use } from 'react';

const Profile = () => {
  const {isError, isLoading, data, error, isSuccess, refetch} = useQuery({
    queryKey:["user-auth"],
    queryFn: checkAuthStatusAPI

  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  },[data]);
  
    return (
    <div>Profile</div>
  )
}

export default Profile