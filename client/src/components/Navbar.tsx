import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { loginSelector } from '../features/authSlice'
import { ordersClientSideSelector } from "../features/ordersSlice"
//@ts-ignore
import { ReactComponent as CartIcon } from '../assets/svg/shopping-cart.svg'
//@ts-ignore
import { ReactComponent as ExploreIcon } from '../assets/svg/Store.svg'
//@ts-ignore
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const loggedIn = useAppSelector(loginSelector)
  const cartArray:any = useAppSelector(ordersClientSideSelector)
  let quantity = 0
   cartArray?.forEach((item:any) => {
    quantity += item.quantity 
  })

  const pathMatchRoute = (path:string) => {
    if (path === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon fill={ pathMatchRoute('/') ? '#3f3f3f' : '#8f8f8f' } width='36px' height='36px'/>
            <p 
            className={ pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName' }
            >Store</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/cart')}>
            <div className='iconCart' >
              <CartIcon 
              fill={ pathMatchRoute('/cart') ? '#3f3f3f' : '#8f8f8f' } stroke = { pathMatchRoute('/cart') ? '#3f3f3f' : '#8f8f8f' } width='36px' height='36px'/>
              {quantity > 0 ? <div className='iconCartNumber'> {quantity} </div> : null}
            </div>
            <p 
            className={ pathMatchRoute('/cart') ? 'navbarListItemNameActive' : 'navbarListItemName' }
            >Cart</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill={ (!loggedIn ? pathMatchRoute('/sign-in'): pathMatchRoute('/profile')) ? '#3f3f3f' : '#8f8f8f' } width='36px' height='36px'/>
            <p 
            className={ (!loggedIn ? pathMatchRoute('/sign-in'): pathMatchRoute('/profile')) ? 'navbarListItemNameActive' : 'navbarListItemName' }
            >Profile</p>
          </li>
        </ul>
      </nav>
      
    </footer>
  )
}

export default Navbar
