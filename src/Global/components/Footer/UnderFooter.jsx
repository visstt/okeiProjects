import React from "react";
import styles from "./Footer.module.css";

export default function UnderFooter() {
  return (
    <div className={styles.UnderFooter}>
      <div className="container">
        <p>
          © 2009-2024 . Официальный сайт Государственного автономного
          профессионального образовательного учреждения "Оренбургский колледж
          экономики и информатики"
        </p>
      </div>
    </div>
  );
}
