import { motion } from "motion/react";
import styles from "./Projects.module.css";

export default function ProjectCard({
  developer,
  description,
  tags,
  name,
  image,
  onClick,
}) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      <div className={styles.card_img}>
        <img src={image} alt={name} />
        <div className={styles.card_overlay}>
          <div className={styles.overlay_content}>
            <h4>{developer}</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.card_text}>
        <div className={styles.card_text__tags}>
          <p>{tags}</p>
        </div>
        <div className={styles.card_text__title}>
          <h3>{name}</h3>
        </div>
      </div>
    </motion.div>
  );
}
