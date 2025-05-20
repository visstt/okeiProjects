import { useState, useEffect } from "react";
import styles from "./Directions.module.css";
import { directions, directionImages } from "../../../assets/info";

export default function Directions() {
	const [activeDirection, setActiveDirection] = useState("Веб-разработка");
	const [itemHeight, setItemHeight] = useState(60);
	const [imagesLoaded, setImagesLoaded] = useState(false);

	const updateItemHeight = () => {
		const width = window.innerWidth;
		if (width <= 450) {
			setItemHeight(40);
		} else if (width <= 840) {
			setItemHeight(50);
		} else {
			setItemHeight(60);
		}
	};

	useEffect(() => {
		const preloadImages = async () => {
			const imageUrls = Object.values(directionImages);
			const promises = imageUrls.map((url) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = url;
					img.srcset = `${url} 1x, ${url.replace(".png", "@2x.png")} 2x, ${url.replace(".png", "@3x.png")} 3x`;
					img.onload = () => {
						console.log(`Изображение загружено: ${url}`);
						resolve();
					};
					img.onerror = () => {
						console.error(`Ошибка загрузки изображения: ${url}`);
						resolve();
					};
				});
			});

			await Promise.all(promises);
			console.log("Все изображения загружены");
			setImagesLoaded(true);
		};

		preloadImages();
		updateItemHeight();
		window.addEventListener("resize", updateItemHeight);
		return () => window.removeEventListener("resize", updateItemHeight);
	}, []);

	const handleClick = (direction) => {
		console.log("Active direction:", direction);
		setActiveDirection(direction);
	};

	const topPosition = directions.indexOf(activeDirection) * itemHeight;

	return (
		<div className="container" id="directions">
			<div className={styles.wrapper}>
				{imagesLoaded ? (
					<div className={styles.wrapper__photo}>
						{directions.map((direction) => (
							<img
								key={direction}
								src={directionImages[direction]}
								srcSet={`${directionImages[direction]} 1x, ${directionImages[direction].replace(".png", "@2x.png")} 2x, ${directionImages[direction].replace(".png", "@3x.png")} 3x`}
								sizes="(max-width: 840px) 350px, 545px"
								alt={direction}
								className={`${styles.image} ${direction === activeDirection ? styles.active : ""}`}
							/>
						))}
					</div>
				) : (
					<div className={styles.placeholder}>Загрузка...</div>
				)}

				<div className={styles.wrapper__info}>
					<div
						className={styles.background}
						style={{
							top: `${topPosition}px`,
							height: itemHeight,
						}}
					/>
					<div
						className={styles.indicator}
						style={{
							top: `${topPosition}px`,
							height: itemHeight,
						}}
					/>
					{directions.map((direction) => (
						<p
							key={direction}
							onClick={() => handleClick(direction)}
							style={{
								height: itemHeight,
							}}
							className={styles.direction}
						>
							{direction}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}
