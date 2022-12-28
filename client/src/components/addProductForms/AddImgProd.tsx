import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'

const AddImgProd = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const dispatch = useAppDispatch()
  const productData = useAppSelector(addProductDataSelector)
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if(ev.target.files != null) {
      const file = ev.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImageUrl(reader.result)
        dispatch(setAddProductData({...productData, image: reader.result}))
      }
    }
  }
  return (
    <div className='productFormCont'>
      {/* <input type="file" accept="image/*" onChange={handleChange}  /> */}
      {imageUrl && 
        <div className='imageProduct'>
          <img src={imageUrl} alt="Product" />
        </div>}
      <label id='addPrdtLabelImage' htmlFor="image-input">
        <input type="file" id="image-input" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        Add Image
      </label>
    </div>
  )
}

export default AddImgProd
