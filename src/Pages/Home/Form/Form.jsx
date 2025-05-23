import { useState, useRef } from "react"; // Добавлен useRef
import { motion } from "framer-motion"; // Обновлен импорт
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Form.module.css";
import Button from "../../../Global/components/Button/Button";
import { style } from "motion/react-client";

export default function HomeForm() {
	const [fileName, setFileName] = useState("");
	const [formData, setFormData] = useState({
		organizationName: "",
		contactPerson: "",
		phoneNumber: "+7 ",
		email: "",
		category: "",
		file: null,
	});
	const [errors, setErrors] = useState({});
	const formRef = useRef(null); // Создаем ref для формы

	const formatPhoneNumber = (value) => {
		const cleaned = value.replace(/\D/g, "");
		const match = cleaned.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
		if (!match) return "+7 (";
		const [, areaCode, firstPart, secondPart, thirdPart] = match;
		return `+7 (${areaCode}${areaCode ? ")" : ""}${
			firstPart ? ` ${firstPart}` : ""
		}${secondPart ? `-${secondPart}` : ""}${thirdPart ? `-${thirdPart}` : ""}`;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "phoneNumber") {
			const formattedValue = formatPhoneNumber(value);
			setFormData((prevData) => ({
				...prevData,
				[name]: formattedValue,
			}));
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
		} else if (name === "email") {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (value && !emailRegex.test(value)) {
				setErrors((prevErrors) => ({
					...prevErrors,
					email: "Некорректный email",
				}));
			} else {
				setErrors((prevErrors) => {
					const { email, ...rest } = prevErrors;
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

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const allowedExtensions = [".txt", ".doc", ".docx", ".pdf"];
		const fileExtension = file
			? file.name.slice(file.name.lastIndexOf("."))
			: "";
		if (file && !allowedExtensions.includes(fileExtension)) {
			toast.error(
				"Можно добавлять только файлы форматов: .txt, .doc, .docx, .pdf",
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = {};
		if (!formData.contactPerson)
			newErrors.contactPerson = "Укажите контактное лицо";
		if (!formData.phoneNumber || errors.phoneNumber)
			newErrors.phoneNumber = "Укажите корректный номер телефона";
		if (!formData.email) newErrors.email = "Укажите email";
		if (!formData.category) newErrors.category = "Укажите категорию";
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error("Заполните обязательные поля");
			return;
		}

		const { file, ...data } = formData;
		const formDataToSend = new FormData();
		Object.keys(data).forEach((key) => {
			// Не добавляем organizationName, если оно пустое
			if (key === "organizationName" && !data[key]) return;
			formDataToSend.append(key, data[key]);
		});
		if (file) {
			formDataToSend.append("file", file);
		}

		// Отладка: вывести отправляемые данные
		for (let [key, value] of formDataToSend.entries()) {
			console.log(`${key}: ${value instanceof File ? value.name : value}`);
		}

		try {
			const response = await fetch(
				"http://localhost:4200/api/requests/sendRequest",
				{
					method: "POST",
					body: formDataToSend,
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				console.error("Server error response:", errorData);
				throw new Error(
					`Network response was not ok: ${JSON.stringify(errorData)}`,
				);
			}
			const result = await response.json();
			console.log("Success:", result);
			toast.success("Данные успешно отправлены!");
		} catch (error) {
			console.error("Error:", error);
			toast.error(`Ошибка: ${error.message || "Не удалось отправить данные"}`);
		}
	};

	// Функция для второй кнопки
	const handleExternalSubmit = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(
				new Event("submit", { cancelable: true, bubbles: true }),
			);
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
					<form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
						<p className={styles.hint}>* необязательное поле</p>
						<input
							type="text"
							id="organization"
							name="organizationName"
							onChange={handleChange}
							placeholder="Наименование организации"
							aria-describedby="organization-error"
						/>
						{errors.organizationName && (
							<span id="organization-error" className={styles.error}>
								{errors.organizationName}
							</span>
						)}
						<input
							type="text"
							id="contact-person"
							name="contactPerson"
							onChange={handleChange}
							placeholder="Контактное лицо"
							required
							aria-describedby="contact-person-error"
						/>
						{errors.contactPerson && (
							<span id="contact-person-error" className={styles.error}>
								{errors.contactPerson}
							</span>
						)}
						<input
							type="text"
							id="phone"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							placeholder="+7 (XXX) XXX-XX-XX"
							maxLength={18}
							required
							aria-describedby="phone-error"
						/>
						{errors.phoneNumber && (
							<span id="phone-error" className={styles.error}>
								{errors.phoneNumber}
							</span>
						)}
						<input
							type="email"
							id="email"
							name="email"
							onChange={handleChange}
							placeholder="Электронная почта"
							required
							aria-describedby="email-error"
						/>
						{errors.email && (
							<span id="email-error" className={styles.error}>
								{errors.email}
							</span>
						)}
						<input
							type="text"
							id="category"
							name="category"
							onChange={handleChange}
							placeholder="Категория"
							required
							aria-describedby="category-error"
						/>
						{errors.category && (
							<span id="category-error" className={styles.error}>
								{errors.category}
							</span>
						)}
						<p className={styles.hint}>* необязательное поле</p>
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
								<img src="/download.png" alt="Загрузить файл" />
							</label>
						</div>
						<Button type="submit">Отправить</Button>
					</form>
					<div className={styles.text}>
						<div>
							<h2>Ваша заявка</h2>
							<h3>— первый шаг к нашей совместной работе!</h3>
						</div>
						<Button type="button" onClick={handleExternalSubmit}>
							Отправить
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
