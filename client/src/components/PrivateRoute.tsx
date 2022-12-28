import {Navigate, Outlet} from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { loginSelector } from '../features/authSlice'

const PrivateRoute = () => {
  const loggedIn = useAppSelector(loginSelector)
  
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute