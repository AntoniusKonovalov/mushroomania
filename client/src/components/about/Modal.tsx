import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import Text from './Text';

interface ModalProps {
  handleClose: Function;
  text: string;
}

const Modal = ({ handleClose, text }:any) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
          duration: 0.1,
          type: "string",
          damping: 25,
          stiffness: 500,
        }
      },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        drag
        onClick={(ev) => ev.stopPropagation()}
        className='modal orange-gradient'
        variants={dropIn}
        initial="hidden"
        exit="exit"
      >
      </motion.div>
        <Text />
    </Backdrop>
  )
}

export default Modal