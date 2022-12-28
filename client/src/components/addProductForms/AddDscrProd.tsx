import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'

const AddDscrProd = () => {
  const dispatch = useAppDispatch()
  const productData = useAppSelector(addProductDataSelector)
  return (
    <div className='productFormCont'>
      <label htmlFor="description">
        <p>Description:</p> 
        <textarea 
        name="name" 
        value={productData.description || ''} 
        onChange = {(ev) => dispatch(setAddProductData({...productData, description: ev.target.value}))}
        />
      </label>
    </div>
  )
}

export default AddDscrProd
