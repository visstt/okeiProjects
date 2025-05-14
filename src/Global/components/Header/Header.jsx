import { motion } from "framer-motion";
import {
  logoVariants,
  navVariants,
  itemVariants,
} from "../../../assets/animation/headerAnimation";
import { navigateTo } from "../../../assets/functions";
import styles from "./Header.module.css";
import Button from "../Button/Button";

export default function Header() {
  return (
    <motion.header
      className={styles.header_wrapper}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.img
        src="/logoOKEI.svg"
        alt="logo"
        className={styles.logo}
        variants={logoVariants}
      />
      <motion.nav className={styles.navigation} variants={navVariants}>
        <ul>
          <motion.li className={styles.crumb} variants={itemVariants}>
            <a href="#managers">Руководители</a>
          </motion.li>
          <motion.span className={styles.separator} variants={itemVariants} />
          <motion.li className={styles.crumb} variants={itemVariants}>
            <a href="#directions">Направления</a>
          </motion.li>
          <motion.span className={styles.separator} variants={itemVariants} />
          <motion.li className={styles.crumb} variants={itemVariants}>
            <a href="#projects">Работы</a>
          </motion.li>
        </ul>
      </motion.nav>
      <Button
        onClick={() => {
          navigateTo("order");
        }}
      >
        Заказать
      </Button>
    </motion.header>
  );
}
