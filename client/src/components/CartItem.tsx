import { useAppSelector, useAppDispatch } from '../app/hooks'
import { mushroomSelector } from '../features/mushroomsSlice'
import { removePrd, incrPrdctClientSide, decrPrdctClientSide } from '../features/ordersSlice'
import { formatCurrency } from '../utilities/formatCurrency'
import { useEffect, useState } from 'react'

const CartItem = ({mushroom_id, quantity}:any) => {
  const mushrooms:any = useAppSelector(mushroomSelector)
  const item = mushrooms?.find((mushroom:any) => mushroom.mushroom_id === mushroom_id)
  const dispatch = useAppDispatch()
  const [sum, setSum] = useState<string>('')
  
  useEffect(() => {
    let sumNum = 0
    const sumPrice = (price:any, qty:any) => {
      return (sumNum = price * qty)
    }
    sumPrice(item?.price, quantity)
    setSum(formatCurrency(sumNum))
  }, [quantity])



  if(item == null) return null
  return (
   
    <div className = 'cartItem'>
        <img src={item.image} alt="" />
   
      <div className="contCartItem">
        <h3>{item.name}</h3>
        <div className="price">
          <h4>{formatCurrency(item.price)}</h4>
          <p className='unit'>x {quantity}</p>
        </div>
          <h5>Sum: {sum}</h5>
        
        <div className="incrDecrCartItemQty">
          <div className="signs">
            <button id='test'
            onClick={() => dispatch(decrPrdctClientSide(mushroom_id))}>-</button>   
         
         <button  
         onClick={()=> {
           dispatch(removePrd(mushroom_id))
           }}>Remove</button>
            <button 
            onClick={() => dispatch(incrPrdctClientSide(mushroom_id))}>+</button>
        </div>
          
        </div>
      </div>
    </div>
    
  )
}

export default CartItem