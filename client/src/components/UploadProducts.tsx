import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { userSelector } from '../features/authSlice';
import { removeMushroom, updateMushroom } from '../features/mushroomsAPI';
import { setProductDataDetails } from '../features/mushroomsSlice';
import { incrPrdctClientSide, decrPrdctClientSide, ordersClientSideSelector, removePrd } from '../features/ordersSlice'; 
import { formatCurrency } from '../utilities/formatCurrency';
import UpdateProductPopUp from './UpdateProductPopUp';
// import Button from './Button';


export interface UserProps {
  user_id:number;
  first_name:string;
  email:string;
}

const UploadProducts = ({mushroom_id, image, name, price, description, cat}: any) => {
  const dispatch = useAppDispatch()
  const listedProducts = useAppSelector(ordersClientSideSelector)
  const user:any = useAppSelector(userSelector)
  const quantity = listedProducts?.find((item:any) => item.mushroom_id === mushroom_id)?.quantity || 0
  const [updateProduct, setUpdateProduct] = useState<boolean>(false)
  
      return (
          <>
          {updateProduct && <UpdateProductPopUp 
          setUpdateProduct={setUpdateProduct}
          /> }
            <div id="productImageID" className="productImage">
            {user?.role === 'Admin' &&  
              <div className="editProduct">
                <button id={updateProduct ? 'editPrdtBtnActive' : 'editPrdtBtn'} 
                onClick={() => {
                  setUpdateProduct((prev) => !prev)
                  dispatch(setProductDataDetails({mushroom_id, image, name, price, description,cat}))
                  }}>
                  Update
                </button>
                <button id='editPrdtBtn' 
                onClick={() => {dispatch(removeMushroom(mushroom_id))}}>
                  Delete
                </button>
              </div>}
              
              <img src={image} alt="" />
            </div>
            
            <div id="productDetailsID" className="productDetails">
              <div className="productTextCont">
                <h2>{name}</h2>
                <p>Category: {cat}</p>
                <p>{description}</p>
                <p id="priceText">{formatCurrency(price)}</p>
              </div>

              {quantity === 0 ? (
                <div className="addToCardDiv">
                  <button
                  onClick={() => {
                    dispatch(incrPrdctClientSide(mushroom_id))
                  }}
                  >Add to Cart</button>
                </div>
                ) : (
                <div className="addToCart">
                  <div className="signsCont">
                    <button onClick={() => {
                      dispatch(decrPrdctClientSide(mushroom_id))
                    }}>-</button>

                    <button 
                    onClick={() => {
                      dispatch(removePrd(mushroom_id))
                      }}>Remove</button> 
                  
                    <button 
                    onClick={() => {
                      dispatch(incrPrdctClientSide(mushroom_id))
                      }}>+</button>
                  </div>
                </div>)}
            </div>
          </>
        
        )
}

export default UploadProducts
