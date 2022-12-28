import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'
import { useState } from 'react'

const UpdateDscrProd = () => {
  const [changeDetails, setChangeDetails] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const productData = useAppSelector(addProductDataSelector)
  const { description } = productData
  return (
    <div className='productFormCont'>
        <div className="productDetailsHeader">
        <p className="changePersonalDetails" onClick={() => {
              setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'Done' : 'Change'}
        </p>
      </div>
      <label htmlFor="description">
        <p>Descriptio:</p>
        <textarea 
        name="description"
        id="description" 
        className= {!changeDetails ? 'inputNotActive' : 'inputActive' }
        value={description || ''}
        disabled={!changeDetails} 
        onChange = {(ev) => dispatch(setAddProductData({...productData, [ev.target.id]: ev.target.value}))}/>
      </label>
    </div>
  )
}

export default UpdateDscrProd
