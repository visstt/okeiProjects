import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import styles from "./Modal.module.css";

export default function Modal({ children, isShowing, onCloseButtonClick }) {
  if (!isShowing) {
    return null;
  }

  // Варианты анимации для overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Варианты анимации для контента модального окна
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return ReactDOM.createPortal(
    <div className={styles.modalWrapper}>
      <motion.div
        className={styles.modalOverlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onCloseButtonClick}
      />
      <motion.div
        className={styles.modalContent}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
      <button className={styles.modalCloseButton} onClick={onCloseButtonClick}>
        <img src="/Group 184.svg" alt="" />
      </button>
    </div>,
    document.body
  );
}
