import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Handshake, Sparkles } from 'lucide-react';

// Partner logos imports
import clanLogo from '../assets/images/partners/clanlogo.png';
import goldcomLogo from '../assets/images/partners/Goldcom Logo - Wide Monochrome White.png';
import maksabLogo from '../assets/images/partners/maksab.png';
import studentWelfareLogo from '../assets/images/partners/student welfare fund logo.jpg';
import partner1 from '../assets/images/partners/partners1.jpeg';
import partner2 from '../assets/images/partners/partners2.jpeg';
import partner3 from '../assets/images/partners/partners3.jpeg';
import partner4 from '../assets/images/partners/partners4.jpeg';
import partner5 from '../assets/images/partners/partners5.jpeg';
import partner6 from '../assets/images/partners/partners6.jpeg';

const Partners = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Partners data - Row 1 (moves left)
  const partnersRow1 = [
    { id: 1, logo: partner1, name: 'Partner 1' },
    { id: 2, logo: goldcomLogo, name: 'Goldcom', isLight: true },
    { id: 3, logo: partner2, name: 'Partner 2' },
    { id: 4, logo: maksabLogo, name: 'Maksab' },
    { id: 5, logo: partner3, name: 'Partner 3' },
  ];

  // Partners data - Row 2 (moves right)
  const partnersRow2 = [
    { id: 6, logo: partner4, name: 'Partner 4' },
    { id: 7, logo: studentWelfareLogo, name: 'Student Welfare Fund' },
    { id: 8, logo: partner5, name: 'Partner 5' },
    { id: 9, logo: clanLogo, name: 'Clan' },
    { id: 10, logo: partner6, name: 'Partner 6' },
  ];

  // Triple the arrays for seamless infinite loop
  const duplicatedRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const duplicatedRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  const PartnerCard = ({ partner, index }) => (
    <motion.div
      className="flex-shrink-0 group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-105">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-sm" />
        
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08] group-hover:border-white/20 transition-colors duration-500" />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-liwan-teal/20 via-liwan-green/10 to-liwan-indigo/20 rounded-2xl sm:rounded-3xl" />
        </div>
        
        {/* Logo container */}
        <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
          <img
            src={partner.logo}
            alt={partner.name}
            className={`max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110 ${
              partner.isLight ? 'brightness-100' : 'brightness-90 group-hover:brightness-110'
            } drop-shadow-lg`}
          />
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="partners" className="section-padding relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-liwan-green/20 to-transparent rounded-full blur-[80px]"
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-liwan-indigo/20 to-transparent rounded-full blur-[80px]"
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-liwan-green/20 to-liwan-teal/20 blur-xl rounded-full" />
          <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <Handshake className="w-4 h-4 text-liwan-green" />
            <span className="text-white/80 text-sm font-medium tracking-wide">{t('partners.title')}</span>
          </span>
        </motion.div>

        <div className="h-10 sm:h-12" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight"
        >
          <span className="gradient-text">{t('partners.subtitle')}</span>
        </motion.h2>

        <div className="h-4 sm:h-6" />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 text-center max-w-2xl leading-relaxed"
        >
          {t('partners.description')}
        </motion.p>

        <motion.div 
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
          <Sparkles className="w-5 h-5 text-white/30" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
        </motion.div>

        <div className="h-12 sm:h-16 md:h-20" />
      </div>

      {/* Marquee Container - Full Width */}
      <div className="w-full relative">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1 - Scrolls Left in LTR, Right in RTL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="overflow-hidden py-3 sm:py-4"
        >
          <div 
            className={`flex gap-4 sm:gap-6 lg:gap-8 ${direction === 'rtl' ? 'partner-marquee-rtl-1' : 'partner-marquee-ltr-1'}`}
            style={{ width: 'fit-content' }}
          >
            {duplicatedRow1.map((partner, index) => (
              <PartnerCard key={`row1-${partner.id}-${index}`} partner={partner} index={index % partnersRow1.length} />
            ))}
          </div>
        </motion.div>

        <div className="h-4 sm:h-6" />

        {/* Row 2 - Scrolls Right in LTR, Left in RTL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="overflow-hidden py-3 sm:py-4"
        >
          <div 
            className={`flex gap-4 sm:gap-6 lg:gap-8 ${direction === 'rtl' ? 'partner-marquee-rtl-2' : 'partner-marquee-ltr-2'}`}
            style={{ width: 'fit-content' }}
          >
            {duplicatedRow2.map((partner, index) => (
              <PartnerCard key={`row2-${partner.id}-${index}`} partner={partner} index={index % partnersRow2.length} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust Indicator */}
      <div className="container-custom relative z-10 mt-12 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <p className="text-sm sm:text-base text-white/50 text-center">
              <span className="text-liwan-green font-semibold">{t('partners.trustText')}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        /* LTR Animations */
        @keyframes marqueeLTR1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marqueeLTR2 {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        /* RTL Animations - Reversed direction */
        @keyframes marqueeRTL1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(33.333%);
          }
        }
        
        @keyframes marqueeRTL2 {
          0% {
            transform: translateX(33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        /* LTR Classes */
        .partner-marquee-ltr-1 {
          animation: marqueeLTR1 35s linear infinite;
        }
        
        .partner-marquee-ltr-2 {
          animation: marqueeLTR2 40s linear infinite;
        }
        
        /* RTL Classes */
        .partner-marquee-rtl-1 {
          animation: marqueeRTL1 35s linear infinite;
        }
        
        .partner-marquee-rtl-2 {
          animation: marqueeRTL2 40s linear infinite;
        }
        
        /* Pause on hover */
        .partner-marquee-ltr-1:hover,
        .partner-marquee-ltr-2:hover,
        .partner-marquee-rtl-1:hover,
        .partner-marquee-rtl-2:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-ltr-1,
          .partner-marquee-ltr-2,
          .partner-marquee-rtl-1,
          .partner-marquee-rtl-2 {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
