import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login } from '../features/authAPI';
//@ts-ignore
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
//@ts-ignore
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { setLoggedIn, userStatus } from '../features/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import useFetch from '../hooks/useFetch';
import Spinner from '../components/Spinner';

export interface FormDataProps {
  email: string;
  userPassword?: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showStatus, setShowStatus] = useState<any>('')
  const [formData, setFormData] = useState<FormDataProps>({
    email:'',
    userPassword:'',
  })
  const navigate = useNavigate()
  const { email, userPassword } = formData

  const dispatch = useAppDispatch()
  const userStat = useAppSelector(userStatus)

  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:3000/sign-in"
  );

  useEffect(() => {
    //@ts-ignore
    if (window.google) {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id: '967649685760-me00b277djkgmuce7pcjfuqbgrkqh7vn.apps.googleusercontent.com',
        callback: handleGoogle,
      })
      
      //@ts-ignore
      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        type: "standart",
        // theme: "filled_black",
        size: "large",
        text: "signin_with",
        shape: "pill",
      })
    }
  }, [handleGoogle])

  const handleSubmit = async(ev:any) => {
    ev.preventDefault()
    try {
      if(!email || !userPassword || (!email && !userPassword)) {
        setShowStatus('Please fill the form')
        throw new Error('No data')
      } 

    await dispatch(login(formData))
      .then(unwrapResult)
      .then(() => {
        setShowStatus('Welcome')
        dispatch(setLoggedIn(true))
        navigate('/')
      })
      .catch((obj) => {
        setShowStatus('User does not exists')
        throw new Error(obj.error)
      })
      
      } catch (error:any) {
        console.error(error)
        setShowStatus(`${error.response.data}`)
      }
  }


  const handleOnChange = (ev:any) => {
    
    setFormData((prevState) => ({
      ...prevState,
      [ev.target.id]: ev.target.value
    }))
  }

  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome back </p>
      </header>

      <form onSubmit={handleSubmit}>
          <input 
          type="email" 
          id="email" 
          className="emailInput" 
          placeholder='Email'
          value={email}
          onChange={handleOnChange}
          />
        <div className="passwordInputDiv">
          <input 
          type={showPassword ? "text" : "password"} 
          id="userPassword" 
          className="passwordInput" 
          placeholder='Password'
          value={userPassword}
          required
          onChange={handleOnChange}
          />
          <img src={visibilityIcon} alt="showpassword"
          className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>

        <Link to= '/forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">
            Sign In
          </p>
          <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      {/*  Google Auth  */}
    <div style={{width:'250px', margin:'auto'}} className="googleDiv">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? <Spinner /> : <div id="loginDiv"></div>}
    </div>

      {userStat === 'loading' ? <Spinner />  : <p style={{color:'blue'}}>{showStatus}</p>}

      <Link to='/sign-up' className='registerLink' >
        Sign Up Instead
      </Link>

    </div>
    </>
  )
}

export default SignIn