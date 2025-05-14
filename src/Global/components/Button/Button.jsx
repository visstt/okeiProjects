import { motion } from "motion/react";
import styles from "./Button.module.css";
import { buttonVariants } from "../../../assets/animation/buttonAnimation";

export default function Button({ children, onClick, type }) {
  return (
    <motion.button
      className={styles.button}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
