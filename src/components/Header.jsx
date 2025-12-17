import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Home, Info, Briefcase, FolderKanban, ChevronDown } from 'lucide-react';
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

          {/* Mobile - Center Menu */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 mobile-menu-container">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-r from-liwan-green/20 via-liwan-blue/15 to-liwan-purple/20 border border-white/20' 
                  : 'bg-white/[0.05] border border-white/10 hover:border-white/20'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {/* Current Section Icon */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {(() => {
                    const currentItem = navItems.find(item => item.href.slice(1) === activeSection);
                    const Icon = currentItem?.icon || Home;
                    return (
                      <>
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-liwan-green to-liwan-blue flex items-center justify-center">
                          <Icon size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          {t(`nav.${activeSection}`)}
                        </span>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
              
              {/* Chevron */}
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} className="text-liwan-text-muted" />
              </motion.div>
            </motion.button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-liwan-bg/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Gradient Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple" />
                  
                  {/* Arrow Pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-liwan-bg/95 border-l border-t border-white/10" />
                  
                  <div className="p-4 relative">
                    {/* Navigation Items */}
                    <div className="space-y-2">
                      {navItems.map((item, index) => {
                        const isActive = activeSection === item.href.slice(1);
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.key}
                            initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                            onClick={() => scrollToSection(item.href)}
                            className={`group flex items-center gap-4 w-full py-3.5 px-4 rounded-xl transition-all duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-r from-liwan-green/15 via-liwan-blue/10 to-liwan-purple/15 border border-white/10' 
                                : 'hover:bg-white/5'
                            }`}
                          >
                            {/* Icon Container */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-br from-liwan-green to-liwan-blue shadow-lg shadow-liwan-green/20' 
                                : 'bg-white/5 group-hover:bg-white/10'
                            }`}>
                              <Icon size={18} className={isActive ? 'text-white' : 'text-liwan-text-muted group-hover:text-white'} />
                            </div>
                            
                            {/* Text */}
                            <span className={`text-base font-medium transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-liwan-text-muted group-hover:text-white'
                            }`}>
                              {t(`nav.${item.key}`)}
                            </span>
                            
                            {/* Active Indicator */}
                            {isActive && (
                              <motion.div 
                                layoutId="mobileActiveIndicator"
                                className={`${direction === 'rtl' ? 'mr-auto' : 'ml-auto'} w-2 h-2 rounded-full bg-liwan-green`}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Bottom Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center gap-2 text-sm text-liwan-text-muted py-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-liwan-green animate-pulse" />
                      <span>{direction === 'rtl' ? 'نحن متواجدون الآن' : 'We are available now'}</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile - Right Side (Language Toggle) */}
          <div className="flex lg:hidden items-center z-10">
            <motion.button
              onClick={toggleLanguage}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 overflow-hidden hover:border-white/20 transition-all"
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
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
