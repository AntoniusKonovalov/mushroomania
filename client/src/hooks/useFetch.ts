import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login, signUp } from "../features/authAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoggedIn } from "../features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const useFetch = (url:any) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const typeAuth = url.split('/').pop()
  console.log(typeAuth)
  const handleGoogle = async(response:any) => {
  // Sign up user 
    if(typeAuth === 'sign-in') {
    await dispatch(login(response))
    .then(unwrapResult)
    .then(() => {
      dispatch(setLoggedIn(true))
      navigate('/')
    })
    .catch((obj) => {
      alert('User does not exists')
      throw new Error(obj.error)
    })

  // Sign up user 
  } else if (typeAuth === 'sign-up') {
    await dispatch(signUp(response))
    .then(unwrapResult)
    .then(() => {
      dispatch(setLoggedIn(true))
      navigate('/')
    })
    .catch((obj) => {
      alert('User does not exists')
      throw new Error(obj.error)
    })
  }
    console.log(response)
    dispatch(setLoggedIn(true))
    navigate('/')
  };
  return { loading, error, handleGoogle };
};

export default useFetch;