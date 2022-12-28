import Lottie from 'lottie-react'
import spinner from '../assets/svg/loader.json'


const Spinner = () => {
  
  return (
    <div style={{margin: 'auto'}} className='loadingSpinnerContainers'>
      <div className="loadingSpinners">
        <Lottie 
        style={{width: '300px', margin: 'auto', display: 'block'}} 
        animationData={spinner} 
        loop={true} />
      </div>
    </div>
  )
}

export default Spinner
