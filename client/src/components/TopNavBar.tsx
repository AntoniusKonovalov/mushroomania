import { useNavigate, useLocation } from "react-router-dom"
//@ts-ignore
import { ReactComponent as MushroomIcon } from '../assets/svg/mushroomsCat.svg'
//@ts-ignore
import { ReactComponent as GrowKitIcon } from '../assets/svg/grow-kit-mushrooms.svg'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { userSelector } from "../features/authSlice"
import { useState } from "react"
import { Category, setAddProductData } from "../features/mushroomsSlice"
import AddProduct from '../components/AddProduct'

const TopNavBar = () => {
  const dispatch = useAppDispatch()
  const location = useLocation().search
  const navigate = useNavigate()
  const user:any = useAppSelector(userSelector)
  const [addProduct, setAddProduct] = useState<boolean>(false)

  const pathMatchRoute = (path:string) => {
    if (path === location) {
      return true
    }
  }

  return (
    <div className="topNavBar">
             {user?.role === 'Admin' && <button id={addProduct ? 'addProductActive' : 'addProduct'  } onClick={() => {
           dispatch(setAddProductData({
              cat: Category.FUNGI,
              image: null,
              name: null,
              price: null,
              description: null
            }))
            setAddProduct((prev) => !prev)}}>Add Product</button>}
          {addProduct && <AddProduct setAddProduct={setAddProduct}/>}
      <nav className="topNavBarNav">
        <ul className="navbarListCat">
          <li className="topNavCont" onClick={() => navigate('/?cat=fungi')}>
              <MushroomIcon fill={ pathMatchRoute('?cat=fungi') ? '#3f3f3f': '#8f8f8f'} width='32px' height='32px'/>
              <p className={ pathMatchRoute('?cat=fungi') ? 'topNavBarItemNameActive' : 'topNavBarItemName'}>Mushrooms</p>
          </li>
          <li className="topNavCont" onClick={() => navigate('/?cat=grow-kit')}>
              <GrowKitIcon fill={ pathMatchRoute('?cat=grow-kit') ? '#3f3f3f': '#8f8f8f'} width='32px' height='32px'/>
              <p className={ pathMatchRoute('?cat=grow-kit') ? 'topNavBarItemNameActive' : 'topNavBarItemName'}>
                Mushroom Kits
                </p>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default TopNavBar