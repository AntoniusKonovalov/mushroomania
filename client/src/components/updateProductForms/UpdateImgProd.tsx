import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProductDataSelector, setAddProductData } from '../../features/mushroomsSlice'
import { useState } from 'react'

const UpdateImgProd = () => {
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
      {productData.image &&
      <div className='imageProduct'>
        <img src={productData.image} alt="Product" />
      </div>}
      <label id='addPrdtLabelImage' htmlFor="image-input">
        <input type="file" id="image-input" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
         Update Image
      </label>
    </div>
  )
}

export default UpdateImgProd
