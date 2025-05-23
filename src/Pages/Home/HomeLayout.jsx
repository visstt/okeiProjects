import Description from "./Components/Description/Description";
import Directions from "./Directions/Directions";
import Projects from "./Projects/Projects";
import Form from "./Form/Form";
import Footer from "../../Global/components/Footer/Footer";
import UnderFooter from "../../Global/components/Footer/UnderFooter";
import Hero from "./Components/Hero/Hero";
import { Helmet } from "react-helmet";

export default function HomeLayout() {
	return (
		<>
			<Helmet>
				<title>Витрина проектов ОКЭИ</title>
				<meta
					name="description"
					content="Портфолио студенческих проектов колледжа ОКЭИ по направлениям: веб-разработка, графический дизайн, видеосъемка, VR/AR, разработка игр и другим."
				/>
				<meta
					name="keywords"
					content="ОКЭИ, студенческие проекты, веб-разработка, графический дизайн, видеосъемка, анимация, VR/AR, разработка игр, цифровой дизайн, бизнес-решения, фотосъемка, 3D разработка"
				/>
				<meta
					property="og:description"
					content="Ознакомьтесь с лучшими студенческими проектами колледжа ОКЭИ по всем направлениям."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://oksei-projects.oksei.ru/" />
				<script type="application/ld+json">
					{`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Проекты колледжа ОКЭИ",
              "url": "https://oksei-projects.oksei.ru/",
              "description": "Портфолио студенческих проектов колледжа ОКЭИ по различным направлениям.",
              "publisher": {
                "@type": "EducationalOrganization",
                "name": "Колледж ОКЭИ"
              }
            }
          `}
				</script>
			</Helmet>
			<Hero />
			<Description />
			<div className="gridLines">
				<Directions />
				<Projects />
				<Form />
			</div>
			<Footer />
			<UnderFooter />
		</>
	);
}
