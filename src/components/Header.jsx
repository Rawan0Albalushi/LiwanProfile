import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Home, Info, Briefcase, FolderKanban } from 'lucide-react';
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
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/5"
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
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white rounded-lg p-2">
              <img 
                src={logo} 
                alt="Liwan Coding" 
                className="h-8 sm:h-10 w-auto transition-all duration-300" 
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-liwan-text-muted hover:text-white'
                  }`}
                >
                  <span>{t(`nav.${item.key}`)}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Language Toggle */}
          <div className="hidden lg:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 overflow-hidden"
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
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full text-white bg-white/[0.05] border border-white/10 transition-all"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-20 bg-liwan-bg/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden fixed left-4 right-4 top-24 z-50 bg-liwan-bg/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple" />
              
              <div className="p-5">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.key}
                        initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
                        onClick={() => scrollToSection(item.href)}
                        className={`group flex items-center gap-4 w-full py-4 px-4 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-liwan-green/15 via-liwan-blue/10 to-liwan-purple/15 border border-white/10' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {/* Icon Container */}
                        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-liwan-green to-liwan-blue shadow-lg shadow-liwan-green/20' 
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <Icon size={20} className={isActive ? 'text-white' : 'text-liwan-text-muted group-hover:text-white'} />
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

                {/* Bottom Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-5 flex items-center justify-center gap-2 text-xs text-liwan-text-muted"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-liwan-green animate-pulse" />
                  <span>{direction === 'rtl' ? 'نحن متواجدون الآن' : 'We are available now'}</span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
