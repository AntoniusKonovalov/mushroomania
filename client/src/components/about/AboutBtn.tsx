import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
//@ts-ignore
import { ReactComponent as Question } from '../../assets/svg/question-mark.svg';
import Modal from "./Modal";

const About = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <motion.button 
      whileHover={{ scale: 2.5 }}
      whileTap={{ scale: 2 }}
      className='save-button'
      onClick={() => (modalOpen ? close() : open())}
      >
        <Question />
      </motion.button>

      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  )
}

export default About