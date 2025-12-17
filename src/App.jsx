import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Projects from './components/Projects';
import Vision from './components/Vision';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './i18n';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-liwan-bg text-white overflow-x-hidden">
        {/* Animated Background Orbs */}
        <div className="bg-animated-orbs" aria-hidden="true">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
          <div className="bg-orb bg-orb-4"></div>
          <div className="bg-orb bg-orb-5"></div>
        </div>
        
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          {/* <WhyUs /> */}
          <Projects />
          <Vision />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
