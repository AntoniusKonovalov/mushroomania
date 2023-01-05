import { useAppDispatch, useAppSelector } from '../app/hooks'
import { orderClientSideProps, ordersClientSideSelector, paidOrdersSelector, paidOrdersStatus, removeAllPrds } from '../features/ordersSlice'; 
import { mushroomSelector } from '../features/mushroomsSlice'
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import { addCartOrders, getPaidOrders } from '../features/ordersAPI';
import Spinner from '../components/Spinner';
import OrdersSlideOut from '../components/OrdersSlideOut';
//@ts-ignore
import { ReactComponent as ArrowIcon } from '../assets/svg/arrow.svg'
import { getMushrooms } from '../features/mushroomsAPI';
import { useLocation } from 'react-router-dom';


const Card = () => {
  const location = useLocation()
  const cat = location.search
  const [isVisible, setIsvisible] = useState<boolean>(false)
  const [price, setPrice] = useState<any>('')
  const ordersClient:any = useAppSelector(ordersClientSideSelector)
  const paidUserOrders = useAppSelector(paidOrdersSelector)
  const paidOrdersState = useAppSelector(paidOrdersStatus)
  const mushrooms:any = useAppSelector(mushroomSelector)
  const dispatch = useAppDispatch()
  
  const handleCheckoutCart = (orders:orderClientSideProps[]) => {
    dispatch(addCartOrders(orders))
    dispatch(removeAllPrds())
  }


  useEffect(() => {
    const fetchListings = async() => {
      let sum:any = 0
      try {
        await dispatch(getMushrooms(cat))
        await ordersClient.forEach((order:any) => {
          let item = (mushrooms?.find((mushroom:any) => mushroom.mushroom_id === order.mushroom_id)?.price * order.quantity)
          sum += item
        })
        setPrice(formatCurrency(sum)) 
      } catch (error) {
        console.error(error)
      }
    }
    fetchListings()
  }, [ordersClient, mushrooms])

  return (
    <div className='shoppingCart'>
        <div className={`paidOrdersMainCont ${isVisible ? 'active' : ''}`}>
            <div className="paidOrders">
              {paidOrdersState === 'loading' ? <Spinner /> : paidUserOrders?.map((paidOrder:any) => (
                <OrdersSlideOut key={paidOrder.order_id}  {...paidOrder} />
              ))}
            </div>
            <div className="tab" onClick={() => {
              setIsvisible((prev) => !prev)
              !isVisible && dispatch(getPaidOrders())
              }}>
              <div className="tabContent">
                <ArrowIcon className={`arrow ${isVisible ? 'rotated' : null}`} stroke="white" />
                <h4>My orders</h4>
              </div>
            </div>
        </div>
        <div className="cartMainCont">
          <h1>Shopping Cart</h1>
          <div className="projectCart">
            <div className="shop">
              {price && ordersClient?.map((order:any) => (
                <CartItem key={order.mushroom_id} {...order} />
                ))}
            </div>
            <div className="checkOutSect">
        
              {price && <p>Total: {price}</p>}
              <button onClick={() => handleCheckoutCart(ordersClient)}>Checkout</button>
            </div>
              
          </div>
        </div>
        <footer className='navbar'>
          
        </footer>

  </div>
  )
}

export default Card
