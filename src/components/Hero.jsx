import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ChevronDown } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-6 py-32 flex flex-col items-center gap-0">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -6, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8, ease: "easeOut" },
            y: { 
              duration: 3, 
              repeat: Infinity, 
              ease: [0.45, 0, 0.55, 1],
              delay: 0.8 
            }
          }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={20} className="text-liwan-yellow" />
          </motion.div>
          <span className="text-base sm:text-lg text-liwan-text-secondary font-medium">
            {direction === 'rtl' ? 'ليوان البرمجة' : 'Liwan Coding'}
          </span>
        </motion.div>

        {/* Spacer 1 */}
        <div className="h-10 sm:h-12 md:h-14" />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className="text-white block leading-[1.3]">{t('hero.title')}</span>
        </motion.h1>

        {/* Spacer 2 */}
        <div className="h-6 sm:h-8" />

        {/* Title Highlight */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text"
        >
          {t('hero.titleHighlight')}
        </motion.h2>

        {/* Spacer 3 */}
        <div className="h-10 sm:h-12 md:h-14" />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center"
        >
          <p className="max-w-2xl text-center text-lg sm:text-xl text-liwan-text-muted leading-[2.2]">
            {t('hero.description')}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('#about')}
              className="flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              <span className="text-xs tracking-[0.2em] uppercase font-medium">
                {direction === 'rtl' ? 'اكتشف المزيد' : 'Scroll'}
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={28} strokeWidth={2} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;
