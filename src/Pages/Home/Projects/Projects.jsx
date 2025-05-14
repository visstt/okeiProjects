import { useState } from "react";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import Button from "../../../Global/components/Button/Button";
import { cards } from "../../../assets/info";
import useModal from "../../../Global/hooks/useModal";
import Modal from "../../../Global/components/Modal/Modal";

export default function Projects() {
  const [isShowing, toggle] = useModal();
  const [modalImage, setModalImage] = useState(null);
  const [visibleCards, setVisibleCards] = useState(6);

  const handleCardClick = (image) => {
    setModalImage(image);
    toggle();
  };

  const handleShowMore = () => {
    setVisibleCards(cards.length);
  };

  return (
    <div className={styles.homeCards} id="projects">
      <div className="container">
        <div className={styles.homeCards__wrapper}>
          <h2>
            Студенты получают реальный опыт, выполняя проекты под руководством
            наставников
          </h2>
          <div className={styles.cards_container}>
            {cards.slice(0, visibleCards).map((card, index) => (
              <ProjectCard
                key={index}
                developer={card.developer}
                description={card.description}
                tags={card.tags}
                name={card.name}
                image={card.image}
                onClick={() => handleCardClick(card.image)}
              />
            ))}
          </div>
          {visibleCards < cards.length && (
            <Button onClick={handleShowMore}>Показать еще</Button>
          )}
        </div>
      </div>
      <Modal isShowing={isShowing} onCloseButtonClick={toggle}>
        {modalImage && (
          <img
            src={modalImage}
            alt="Изображение"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}
      </Modal>
    </div>
  );
}
