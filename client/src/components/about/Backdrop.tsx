import { motion } from 'framer-motion';

interface BackdropProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

const Backdrop = ({ children, onClick }:BackdropProps) => {
  return (
    <motion.div 
      className='backdrop'
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className="textContainer">
     {children} 
    </div>
    </motion.div>
  )
}

export default Backdrop
