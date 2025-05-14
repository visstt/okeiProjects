import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import Button from "../../../Global/components/Button/Button";
import { cards } from "../../../assets/info";

export default function HomeCards() {
  return (
    <div className={styles.homeCards} id="projects">
      <div className="container">
        <div className={styles.homeCards__wrapper}>
          <h2>
            Студенты получают реальный опыт, выполняя проекты под руководством
            наставников
          </h2>
          <div className={styles.cards_container}>
            {cards.map((card, index) => (
              <ProjectCard
                key={index}
                developer={card.developer}
                description={card.description}
                tags={card.tags}
                name={card.name}
                image={card.image}
              />
            ))}
          </div>
          <Button>Показать еще</Button>
        </div>
      </div>
    </div>
  );
}
