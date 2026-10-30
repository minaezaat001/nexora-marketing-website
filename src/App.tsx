import { MotionConfig } from "framer-motion";
import { AppProvider } from "./i18n";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Modules from "./sections/Modules";
import Industries from "./sections/Industries";
import Why from "./sections/Why";
import Roi from "./sections/Roi";
import DemoHub, { DemoModal } from "./sections/DemoHub";
import Footer, { FinalCta, WhatsAppFab } from "./sections/Footer";

export default function App() {
  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main>
          <Hero />
          <Modules />
          <Industries />
          <Why />
          <Roi />
          <DemoHub />
          <FinalCta />
        </main>
        <Footer />
        <WhatsAppFab />
        <DemoModal />
      </MotionConfig>
    </AppProvider>
  );
}
