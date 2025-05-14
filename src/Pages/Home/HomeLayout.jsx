import Description from "./Components/Description/Description";
import Directions from "./Directions/Directions";
import Projects from "./Projects/Projects";
import Form from "./Form/Form";
import Footer from "../../Global/components/Footer/Footer";
import UnderFooter from "../../Global/components/Footer/UnderFooter";
import Hero from "./Components/Hero/Hero";

export default function HomeLayout() {
  return (
    <>
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
