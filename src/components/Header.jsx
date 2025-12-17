import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Home, Info, Briefcase, FolderKanban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/liwan-logo.png';

const Header = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage, direction } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { key: 'home', href: '#home', icon: Home },
    { key: 'about', href: '#about', icon: Info },
    { key: 'services', href: '#services', icon: Briefcase },
    { key: 'projects', href: '#projects', icon: FolderKanban },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-liwan-bg/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
          : 'bg-transparent backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center group z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-white rounded-xl p-2 shadow-lg shadow-black/20 group-hover:shadow-liwan-green/20 transition-all duration-300">
              <img 
                src={logo} 
                alt="Liwan Coding" 
                className="h-8 sm:h-10 w-auto transition-all duration-300" 
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-liwan-green/0 via-liwan-blue/0 to-liwan-purple/0 group-hover:from-liwan-green/20 group-hover:via-liwan-blue/20 group-hover:to-liwan-purple/20 transition-all duration-500" />
            </div>
          </motion.a>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4 p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-liwan-text-muted hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-gradient-to-r from-liwan-green/20 via-liwan-blue/15 to-liwan-purple/20 rounded-full border border-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{t(`nav.${item.key}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-4 z-10">
            <motion.button
              onClick={toggleLanguage}
              className="group relative flex items-center gap-0.5 p-1 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Sliding Background */}
              <motion.div
                className="absolute top-1 bottom-1 w-9 rounded-full bg-gradient-to-r from-liwan-green to-liwan-teal"
                initial={false}
                animate={{ 
                  x: language === 'ar' ? 0 : 36,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
              
              {/* AR Option */}
              <span className={`relative z-10 w-9 py-1.5 text-center text-xs font-bold transition-colors duration-300 ${
                language === 'ar' ? 'text-white' : 'text-liwan-text-muted group-hover:text-white/70'
              }`}>
                ع
              </span>
              
              {/* EN Option */}
              <span className={`relative z-10 w-9 py-1.5 text-center text-xs font-bold transition-colors duration-300 ${
                language === 'en' ? 'text-white' : 'text-liwan-text-muted group-hover:text-white/70'
              }`}>
                EN
              </span>
            </motion.button>
          </div>

          {/* Mobile - Right Side (Menu + Language Toggle) */}
          <div className="flex lg:hidden items-center gap-2 z-10 mobile-menu-container">
            {/* Menu Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-br from-liwan-green/25 to-liwan-blue/25 border border-white/30 shadow-lg shadow-liwan-green/20' 
                  : 'bg-white/[0.08] border border-white/15 hover:border-white/25 hover:bg-white/[0.12]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hamburger Icon with Animation */}
              <div className="relative w-5 h-5 flex items-center justify-center">
                <motion.span 
                  className="absolute w-4.5 h-0.5 bg-gradient-to-r from-liwan-green to-liwan-teal rounded-full"
                  animate={isMobileMenuOpen 
                    ? { rotate: 45, y: 0 } 
                    : { rotate: 0, y: -5 }
                  }
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span 
                  className="absolute w-4.5 h-0.5 bg-gradient-to-r from-liwan-teal to-liwan-blue rounded-full"
                  animate={isMobileMenuOpen 
                    ? { opacity: 0, scaleX: 0 } 
                    : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="absolute w-4.5 h-0.5 bg-gradient-to-r from-liwan-blue to-liwan-purple rounded-full"
                  animate={isMobileMenuOpen 
                    ? { rotate: -45, y: 0 } 
                    : { rotate: 0, y: 5 }
                  }
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              
              {/* Pulse ring effect when open */}
              {isMobileMenuOpen && (
                <motion.div
                  className="absolute inset-0 rounded-xl border border-liwan-green/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.08] border border-white/15 overflow-hidden hover:border-white/25 hover:bg-white/[0.12] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-bold text-white"
                >
                  {language === 'ar' ? 'EN' : 'ع'}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ 
                    duration: 0.35, 
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.25 }
                  }}
                  className={`absolute top-full ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-4 w-[calc(100vw-1.5rem)] max-w-80 bg-liwan-bg/98 backdrop-blur-3xl rounded-3xl border border-white/15 shadow-2xl shadow-black/60 overflow-hidden`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Gradient Top Border - Animated */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  
                  {/* Arrow Pointer - Enhanced */}
                  <div className={`absolute -top-2.5 ${direction === 'rtl' ? 'left-6' : 'right-6'} w-5 h-5 rotate-45 bg-liwan-bg/98 border-l border-t border-white/15 shadow-lg`} />
                  
                  <div className="p-5 relative">
                    {/* Navigation Items */}
                    <div className="space-y-2.5">
                      {navItems.map((item, index) => {
                        const isActive = activeSection === item.href.slice(1);
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.key}
                            initial={{ opacity: 0, x: direction === 'rtl' ? 25 : -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: 0.08 + index * 0.06, 
                              duration: 0.4, 
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            onClick={() => scrollToSection(item.href)}
                            className={`group relative flex items-center gap-4 w-full py-4 px-5 rounded-2xl transition-all duration-400 overflow-hidden ${
                              isActive 
                                ? 'bg-gradient-to-r from-liwan-green/20 via-liwan-blue/15 to-liwan-purple/20 border border-white/15 shadow-lg shadow-liwan-green/10' 
                                : 'hover:bg-white/[0.07] border border-transparent hover:border-white/10'
                            }`}
                          >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-liwan-green/0 via-liwan-blue/0 to-liwan-purple/0 group-hover:from-liwan-green/5 group-hover:via-liwan-blue/5 group-hover:to-liwan-purple/5 transition-all duration-500" />
                            
                            {/* Icon Container */}
                            <div className={`relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400 ${
                              isActive 
                                ? 'bg-gradient-to-br from-liwan-green to-liwan-blue shadow-lg shadow-liwan-green/30' 
                                : 'bg-white/[0.06] group-hover:bg-white/[0.12] group-hover:shadow-md'
                            }`}>
                              <Icon size={20} className={`transition-all duration-300 ${
                                isActive ? 'text-white' : 'text-liwan-text-muted group-hover:text-white group-hover:scale-110'
                              }`} />
                            </div>
                            
                            {/* Text */}
                            <span className={`relative text-base font-semibold transition-all duration-300 ${
                              isActive ? 'text-white' : 'text-liwan-text-muted group-hover:text-white'
                            }`}>
                              {t(`nav.${item.key}`)}
                            </span>
                            
                            {/* Active Indicator - Enhanced */}
                            {isActive && (
                              <motion.div 
                                layoutId="mobileActiveIndicator"
                                className={`${direction === 'rtl' ? 'mr-auto' : 'ml-auto'} relative`}
                              >
                                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-liwan-green to-liwan-teal shadow-lg shadow-liwan-green/50" />
                                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-liwan-green animate-ping opacity-75" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Divider - Enhanced */}
                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    {/* Bottom Info - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="flex items-center justify-center gap-3 text-sm text-liwan-text-muted py-2 px-4 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-liwan-green shadow-lg shadow-liwan-green/50" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-liwan-green animate-ping" />
                      </div>
                      <span className="font-medium">{direction === 'rtl' ? 'نحن متواجدون الآن' : 'We are available now'}</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
