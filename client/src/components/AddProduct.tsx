import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addMushroom } from '../features/mushroomsAPI';
import { Category, addProductDataSelector, setAddProductData } from '../features/mushroomsSlice';
import AddDscrProd from './addProductForms/AddDscrProd';
import AddImgProd from './addProductForms/AddImgProd';
import AddMainProd from './addProductForms/AddMainProd';

interface AddProductProps {
  setAddProduct:Function;
}

const AddProduct = ({setAddProduct}:AddProductProps) => {
  const productData = useAppSelector(addProductDataSelector)
  const dispatch = useAppDispatch()
  const [formStep, setFormStep] = useState<number>(0)

  const formProductName = ["Main Information", "Description", "Please add Image"]

  const FormDisplay = () => {
    if(formStep === 0) {
      return <AddMainProd />
    } else if(formStep === 1) {
      return <AddDscrProd />
    } else { 
      return <AddImgProd />
    }
  }
  
  return (
  <div className='formMain'>
    <div className="close" onClick={() => setAddProduct(false)}>+</div>

    <div className="formHeader">

        <ul className="progressBar">
          <li className={formStep === 0 ? "stepItemActive" : "stepItem"}>
            <div className="circle"></div>
            <div className="progress-label">Main </div>
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
          console.log(productData)
          dispatch(addMushroom(productData))
          dispatch(setAddProductData({
            cat: Category.FUNGI,
            image: null,
            name: null,
            price: null,
            description: null
          }))
          setAddProduct(false)  
        } else {
          setFormStep((currFormStep) => currFormStep + 1)
        }
      }}
      >{formStep === formProductName.length -1 ? 'DONE' : 'NEXT'}</button>
    </div>
  </div>
  )
}

export default AddProduct
