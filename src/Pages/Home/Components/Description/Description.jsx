// import { useState } from "react";
import { motion } from "framer-motion";
import { specialists } from "../../../../assets/info";
import styles from "./Description.module.css";
import { useState } from "react";

export default function HomeDescription() {
  const [activePopup, setActivePopup] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <div className={styles.gradient} id="managers"></div>

      <div className={styles.desc_container}>
        <div className="container">
          <motion.div
            className={styles.desc_wrapper}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.desc_wrapper__block}>
              <h2>Наша команда готова к любым задачам</h2>
            </div>

            <div className={styles.about_wrapper}>
              <div className={styles.about_wrapper__block}>
                <h3>Наша команда</h3>
                <p>
                  Мы собрали опытных преподавателей и специалистов в IT, дизайне
                  и других областях, чтобы помочь студентам раскрыть их
                  потенциал.
                </p>
              </div>
              <div className={styles.about_wrapper__block}>
                <h3>Наш колледж</h3>
                <p>
                  Наш колледж предлагает современное образование и практические
                  навыки, которые позволяют создавать качественные проекты и
                  успешно начинать карьеру.
                </p>
              </div>
            </div>
          </motion.div>

          <div className={styles.hero_wrapper}>
            {specialists.map((specialist, index) => (
              <motion.div
                key={specialist.id}
                className={styles.image_container}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={specialist.photo}
                  alt={specialist.fullname}
                  className={styles.wrapper__img}
                />
                <div className={styles.popup}>
                  <h4 className={styles.popup_title}>{specialist.fullname}</h4>
                  <p className={styles.popup_desc}>{specialist.area}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <span className={styles.gradientStripe}></span>
      </div>
    </>
  );
}
