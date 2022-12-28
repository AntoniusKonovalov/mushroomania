import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks';
import { setLoggedIn } from '../features/authSlice';
//@ts-ignore
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
//@ts-ignore
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { signUp } from '../features/authAPI';
import { unwrapResult } from '@reduxjs/toolkit';
import useFetch from '../hooks/useFetch';
import Spinner from '../components/Spinner';


export interface FormDataProps {
  first_name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showStatus, setShowStatus] = useState<string>('')
  const [formData, setFormData] = useState<FormDataProps>({
    first_name: '',
    email:'',
    password:'',
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:3000/sign-up"
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
      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        type: "icon",
        // theme: "filled_black",
        size: "large",
        text: "signup_with",
        shape: "circle",
      })
    }
  }, [handleGoogle])


  const { first_name, email, password } = formData

  const handleSubmit = async(ev:any) => {
    ev.preventDefault()
    try {
      if(!first_name || !email || !password || (!email && !password && !first_name)) {
        setShowStatus('Please fill the form')
        throw new Error('No data')
      }

      await dispatch(signUp(formData))
        .then(unwrapResult)
        .then(() => {
          dispatch(setLoggedIn(true))
          navigate('/')
        })
        
      
    } catch (error:any) {
      console.error(error)
      if(error.message === 'Request failed with status code 409') {
        setShowStatus(`${email} already exists!`)
      }
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
          type="text" 
          id="first_name" 
          className="nameInput" 
          placeholder='Name'
          value={first_name}
          onChange={handleOnChange}
          />

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
          id="password" 
          className="passwordInput" 
          placeholder='Password'
          value={password}
          onChange={handleOnChange}
          />
          <img src={visibilityIcon} alt="showpassword"
          className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <div className='statusBar'>
          {showStatus.length > 0 && <p style={{color:'blue'}}>{showStatus}</p>}
          <Link to= '/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

        </div>

        <div className="signUpBar">
          <p className="signUpText">
            Sign Up
          </p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      <div style={{width:'200px', margin:'auto', color:'grey', padding:0, marginBottom:'-40px'}} className="googleDiv" >
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading ? (
            <Spinner />
            ) : (
              <div style={{ display: 'flex', alignItems:'center', gap:'20px' }}>
                <h3>Sign up with:</h3>
                <div id="signUpDiv" data-text="signup_with"></div>
              </div>
              )}
      </div>
            

      <Link to='/sign-in' className='registerLink' >
        Sign In Instead
      </Link>

    </div>
    </>
  )
}

export default SignUp