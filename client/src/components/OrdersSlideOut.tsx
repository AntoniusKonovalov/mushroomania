import { useAppSelector } from '../app/hooks'
import { mushroomSelector } from '../features/mushroomsSlice'
import { formatCurrency } from '../utilities/formatCurrency'
import { convertToDate, convertToTime } from '../utilities/splittingDate'

const OrdersSlideOut = ({order_date, mushroom_id, quantity}:any) => {
  const mushrooms:any = useAppSelector(mushroomSelector)
  const item = mushrooms?.find((mushroom:any) => mushroom.mushroom_id === mushroom_id)

  return (
    <>
      <div className="paidProductCont">
        <img src={item?.image} alt="" />
        <div className="content">
          <div className="textCont">
            <h4>{item?.name}</h4>
            <p>Date: {convertToDate(order_date)}</p>
            <p>Time: {convertToTime(order_date)}</p>
            <div className="price">
              <h4>Price: {formatCurrency(item?.price)}</h4>
              <p>x {quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersSlideOut
