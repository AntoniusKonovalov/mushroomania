import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'

const AddMainProd = () => {

  const dispatch = useAppDispatch()
  const productData = useAppSelector(addProductDataSelector)

  return (
    <div className='productFormCont'>
      <form id='productForm'>
        <label htmlFor="productName">
          <p>Product Name</p>
          <input type="text" 
          name="name" 
          value={productData.name || ''} 
          onChange = {(ev) => dispatch(setAddProductData({...productData, name: ev.target.value}))}/>
        </label>
        <label htmlFor="categoty">
          <p>Category</p>
          <div className="categorySelect">
            <select name='category'
              value={productData.cat || ''}
              id='selectCategory'
              onChange={(ev) => dispatch(setAddProductData({...productData, cat: ev.target.value}))}>
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
          value={productData.price || ''} 
          onChange = {(ev) => dispatch(setAddProductData({...productData, price: ev.target.value}))}/>
        </label>
      </form>
    </div>
  )
}

export default AddMainProd
