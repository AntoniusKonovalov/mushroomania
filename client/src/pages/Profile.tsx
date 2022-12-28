import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLoggedIn, userSelector } from '../features/authSlice';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { logoutUser, updateUser } from '../features/authAPI';
import { removeAllPrds } from '../features/ordersSlice';
import { removeOrders } from '../features/ordersAPI';


export interface UserProps {
  userId?: string;
  name: string;
  email: string;
}


const Profile = () => {
  const dispatch = useAppDispatch()
  const user:any = useAppSelector(userSelector)
  const [changeDetails, setChangeDetails] = useState<boolean>(false)
  const [formData, setFormData] = useState<UserProps>({
    userId:'',
    name: '',
    email: '',
  })

  const { email, name } = formData

  useEffect(() => {
    setFormData({
      userId: user.user_id,
      name: user.first_name,
      email: user.email
    })
 
  }, [])


  const handleLogout = async() => {
    const userId = user.user_id?.toString()
    await dispatch(logoutUser(userId))
    console.log(user)
    await dispatch(removeOrders())
    dispatch(setLoggedIn(false))
    dispatch(removeAllPrds())
  }

  const handleSubmit = async() => {
    try {
      if(user.first_name !== name || user.email !== email) {

        await dispatch(updateUser(formData))
      }
      
    } catch (error) {
      console.error(error)
      toast.error(`${error}`)
    }
  }

  const handleChange = (ev:any) => {
    ev.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [ev.target.id]: ev.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type='button' className="logOut" onClick={handleLogout}>Logout</button>
      </header>

      <main>      
        <div className='profileDetailsHeader'>
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && handleSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
          {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input 
            type="text"
            id='name'
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={name}
            onChange={handleChange}        
            />

            <input 
            type="email"
            id='email'
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={email}
            onChange={handleChange}        
            />

          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile