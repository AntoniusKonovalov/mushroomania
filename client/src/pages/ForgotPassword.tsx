import { useState } from "react";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
//@ts-ignore
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')

  const handleOnChange = (ev:any) => {
    setEmail(ev.target.value)
  }

  const handleSubmit = (ev:any) => {
    ev.preventDefault()
    try {
      
    } catch (error) {
      console.error(error)
      toast.error(`${error}`)
    }
  }


  return (
    <div className="'pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input 
          type='email' 
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleOnChange}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' /> 
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
