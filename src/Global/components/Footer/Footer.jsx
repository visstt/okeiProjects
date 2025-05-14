import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footer_wrapper}>
          <img src="/logoOKEI.svg" alt="logoOKEI" className={styles.img} />

          <div className={styles.nav}>
            <a href="#managers">Руководители</a>
            <a href="#directions">Направления</a>
            <a href="#projects">Работы</a>
            <a href="#order">Заявка</a>
          </div>
          <div className={styles.contacts}>
            {/* <a href="mailto:oksei24@mail.ru">oksei24@mail.ru</a> */}
            {/* <a href="tel:+7 (3532) 31-72-39">+7 (3532) 31-72-39</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
