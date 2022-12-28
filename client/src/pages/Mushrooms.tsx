
import TopNavBar from '../components/TopNavBar'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getMushrooms } from '../features/mushroomsAPI'
import { useLocation } from 'react-router-dom'
import { mushroomSelector, mushroomsProps, mushroomStatusSelector } from '../features/mushroomsSlice'
import Spinner from '../components/Spinner'
import UploadProducts from '../components/UploadProducts'


//@ts-ignore
import AnimationScroll from '../components/AnimationScroll'
import { unwrapResult } from '@reduxjs/toolkit'
// import { unwrapResult } from '@reduxjs/toolkit'



const Mushrooms = () => {
  const location = useLocation()
  const cat = location.search
  const dispatch = useAppDispatch()
  const mushrooms:mushroomsProps[] | null |any = useAppSelector(mushroomSelector)
  const mushroomsStatus = useAppSelector(mushroomStatusSelector)

  
  useEffect(() => {
    const fetchListings = async() => {
      try {
        await dispatch(getMushrooms(cat))
        .then(unwrapResult)
        .catch((obj) => {
          throw new Error(obj.error)
        })        
      } catch (error) {
        console.error(error)
      }
    }
    fetchListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  return (
    <div className='explore'>
      <header>
        <TopNavBar />
      </header>

      <main className='mainExplore'>
      {/* @ts-ignore */}
        <AnimationScroll />
        <div id='productPageID' className='productPage' >
          {mushroomsStatus === 'loading' ? <Spinner /> : mushrooms?.map((item:any) => 
          <div key={item.mushroom_id} id="productID" className="product">
            <UploadProducts {...item}/>
          </div>)}
        </div>
      </main>

    </div>
  )
}

export default Mushrooms