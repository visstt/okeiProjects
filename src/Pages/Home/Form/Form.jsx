import { useState } from "react";
import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Form.module.css";
import Button from "../../../Global/components/Button/Button";

export default function HomeForm() {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    phoneNumber: "+7 (",
    email: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  // Функция форматирования номера телефона
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return "+7 (";
    const [, areaCode, firstPart, secondPart, thirdPart] = match;
    return `+7 (${areaCode}${areaCode ? ")" : ""}${
      firstPart ? ` ${firstPart}` : ""
    }${secondPart ? `-${secondPart}` : ""}${thirdPart ? `-${thirdPart}` : ""}`;
  };

  // Обработка изменения полей
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber") {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));

      // Проверка формата номера телефона
      if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Некорректный номер телефона",
        }));
      } else {
        setErrors((prevErrors) => {
          const { phoneNumber, ...rest } = prevErrors;
          return rest;
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Обработка загрузки файла
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = [".txt", ".doc", ".docx", ".pdf"];
    const fileExtension = file
      ? file.name.slice(file.name.lastIndexOf("."))
      : "";

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(
        "Можно добавлять только файлы форматов: .txt, .doc, .docx, .pdf"
      );
      setFormData((prevData) => ({
        ...prevData,
        file: null,
      }));
      setFileName("");
    } else {
      setFileName(file ? file.name : "");
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { file, ...data } = formData;
    const formDataToSend = new FormData();

    Object.keys(data).forEach((key) => {
      formDataToSend.append(key, data[key]);
    });

    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const response = await fetch(
        "http://localhost:4200/api/requests/sendRequest",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success("Данные успешно отправлены!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при отправке данных.");
    }
  };

  return (
    <motion.div
      className={styles.wrapper}
      id="order"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.inner}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              id="organization"
              name="organizationName"
              onChange={handleChange}
              placeholder="Наименование организации"
            />
            <input
              type="text"
              id="contact-person"
              name="contactPerson"
              onChange={handleChange}
              placeholder="Контактное лицо"
            />
            <input
              type="text"
              id="phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+7 (XXX) XXX-XX-XX"
              maxLength={18}
            />
            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber}</span>
            )}
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Электронная почта"
            />
            <input
              type="text"
              id="deadline"
              name="deadline"
              onChange={handleChange}
              placeholder="Сроки выполнения"
            />

            <div className={styles.file_input}>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className={styles.fileUpload}>
                <span>{fileName || "Добавить техническое задание"}</span>
                <img src="/download.png" alt="download" />
              </label>
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Отправить
            </Button>
          </form>
          <div className={styles.text}>
            <div>
              <h2>Ваша заявка</h2>
              <h3>— первый шаг к нашей совместной работе!</h3>
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
