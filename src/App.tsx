import { MotionConfig } from "framer-motion";
import { AppProvider } from "./i18n";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Tour from "./sections/Tour";
import Trace from "./sections/Trace";
import Industries from "./sections/Industries";
import Why from "./sections/Why";
import DemoHub, { DemoModal } from "./sections/DemoHub";
import Footer, { FinalCta, WhatsAppFab } from "./sections/Footer";

export default function App() {
  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main>
          <Hero />
          <Tour />
          <Trace />
          <Industries />
          <Why />
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
