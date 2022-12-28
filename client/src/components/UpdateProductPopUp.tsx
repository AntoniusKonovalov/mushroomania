import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Category, addProductDataSelector, productDataDetailsSelector, setAddProductData } from '../features/mushroomsSlice';
import UpdateMainProd from './updateProductForms/UpdateMainProd';
import UpdateDscrProd from './updateProductForms/UpdateDscrProd';
import UpdateImgProd from './updateProductForms/UpdateImgProd';
import { updateMushroom } from '../features/mushroomsAPI';



interface UpdateProductProps {
  setUpdateProduct:Function;
}

const UpdateProductPopUp = ({setUpdateProduct}:UpdateProductProps) => {
  const productData = useAppSelector(addProductDataSelector)
  const productDataDetails = useAppSelector(productDataDetailsSelector)
  const dispatch = useAppDispatch()
  const [formStep, setFormStep] = useState<number>(0)

  const formProductName = ["Main Information", "Description", "Please add Image"]
  const { mushroom_id, ...productDet } = productDataDetails
  useEffect(() => {
    dispatch(setAddProductData(productDet))
  }, [])


  const FormDisplay = () => {
    if(formStep === 0) {
      return <UpdateMainProd />
    } else if(formStep === 1) {
      return <UpdateDscrProd />
    } else { 
      return <UpdateImgProd />
    }
  }
  
  return (
  <div className='formMain'>
    <div className="close" onClick={() => setUpdateProduct(false)}>+</div>
    <div className="formHeader">
      
        <ul className="progressBar">
          <li className={formStep === 0 ? "stepItemActive" : "stepItem"}>
            <div className="circle"></div>
            <div className="progress-label">Main Information</div>
          </li>
          <li className={formStep === 1 ? "stepItemActive" : "stepItem"}>
            <div className="circle"></div>
            <div className="progress-label">Description</div>
          </li>
          <li className={formStep === 2 ? "stepItemActive" : "stepItem"}>
            <div className="circle"></div>
              <div className="progress-label">Image</div>
          </li>
        </ul>
    </div>

    <div className="formBody">
        {FormDisplay()}
    </div>
    <div className="formFooter">
      <button
      disabled = {formStep === 0}
      onClick={() => {
        setFormStep((currFormStep) => currFormStep - 1)
      }}>BACK</button>
    <button
      onClick={() => {
        if(formStep === formProductName.length - 1) {
          dispatch(updateMushroom({mushroomId: mushroom_id, inputs: productData}))
          dispatch(setAddProductData({
            cat: Category.FUNGI,
            image: null,
            name: null,
            price: null,
            description: null
          }))
          setUpdateProduct(false)  
        } else {
          setFormStep((currFormStep) => currFormStep + 1)
        }
      }}
      >{formStep === formProductName.length -1 ? 'DONE' : 'NEXT'}</button>
    </div>
  </div>
  )
}

export default UpdateProductPopUp