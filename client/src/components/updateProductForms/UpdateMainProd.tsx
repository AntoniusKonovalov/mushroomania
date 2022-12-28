import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'
import { useState } from 'react'

const UpdateMainProd = () => {
  const [changeDetails, setChangeDetails] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const productData = useAppSelector(addProductDataSelector)
  const { name, price, cat } = productData

  return (
    <div className='productFormCont'>
      <div className="productDetailsHeader">
        <p className="changePersonalDetails" 
        onClick={() => {
              setChangeDetails((prevState) => !prevState)
            }}>{changeDetails ? 'Done' : 'Change'}</p>
      </div>
      <form id='productForm'>
        <label htmlFor="productName">
          <p>Product Name</p>
          <input 
          type="text" 
          name="name" 
          id="name"
          value={name || ''}
          className= {!changeDetails ? 'inputNotActive' : 'inputActive' }
          disabled={!changeDetails}
          onChange = {(ev) => dispatch(setAddProductData({...productData, [ev.target.id]: ev.target.value}))}/>
        </label>
        <label htmlFor="categoty">
          <p>Category</p>
          <div className="categorySelect">
            <select name='category'
              value={cat || ''}
              id='cat'
              className= {!changeDetails ? 'inputNotActive' : 'inputActive' }
              disabled={!changeDetails}
              onChange={(ev) => dispatch(setAddProductData({...productData, [ev.target.id]: ev.target.value}))}>
                <option value="fungi">Fungi</option>
                <option value="grow-kit">Grow Kit</option>
            </select>
          </div>
        </label>
        <label htmlFor="price">
          <p>Price</p>
          <input 
          type="text" 
          name="price"
          id="price" 
          value={price || ''} 
          className= {!changeDetails ? 'inputNotActive' : 'inputActive' }
          disabled={!changeDetails}
          onChange = {(ev) => dispatch(setAddProductData({...productData, [ev.target.id]: ev.target.value}))}/>
        </label>
      </form>
    </div>
  )
}

export default UpdateMainProd
