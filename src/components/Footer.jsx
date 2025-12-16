import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Mail, Code2, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/images/liwan-logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute -bottom-20 left-1/4 w-80 h-80 bg-liwan-green/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 right-1/4 w-80 h-80 bg-liwan-purple/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Gradient Top Border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-liwan-teal to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom py-12 sm:py-16 flex flex-col relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Logo & Description */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div 
              className="bg-white rounded-xl p-3 w-fit shadow-lg shadow-black/20"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={logo} alt="Liwan Coding" className="h-10 w-auto" />
            </motion.div>

            {/* Spacer */}
            <div className="h-5" />

            <p className="text-base text-liwan-text-secondary leading-[1.9] max-w-md">
              {direction === 'rtl'
                ? 'نطوّر أفكارك إلى حلول رقمية مبتكرة تصنع الفرق. شريكك التقني الموثوق لبناء منتجات رقمية متميزة.'
                : 'We transform your ideas into innovative digital solutions that make a difference. Your trusted tech partner for building exceptional digital products.'}
            </p>

            {/* Spacer */}
            <div className="h-6" />
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="mailto:info@liwan.dev" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-liwan-bg-secondary/50 border border-white/10 text-liwan-text-secondary hover:text-white hover:border-liwan-teal/30 transition-all text-sm group"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-liwan-green to-liwan-teal flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>info@liwan.dev</span>
              </motion.a>
              <motion.a 
                href="tel:+968XXXXXXXX" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-liwan-bg-secondary/50 border border-white/10 text-liwan-text-secondary hover:text-white hover:border-liwan-teal/30 transition-all text-sm group"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-liwan-teal to-liwan-blue flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span dir="ltr">+968 XX XXX XXX</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="w-5 h-5 text-liwan-yellow" />
              </motion.div>
              <h4 className="text-white font-bold text-base">
                {direction === 'rtl' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
            </div>

            {/* Spacer */}
            <div className="h-5" />

            <ul className="flex flex-col gap-3">
              {navItems.slice(0, 4).map((item, index) => (
                <motion.li 
                  key={item.key}
                  initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="text-liwan-text-muted hover:text-liwan-teal transition-all text-sm flex items-center gap-2 group"
                    whileHover={{ x: direction === 'rtl' ? -5 : 5 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-liwan-teal/50 group-hover:bg-liwan-teal transition-colors" />
                    {t(`nav.${item.key}`)}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Code2 className="w-5 h-5 text-liwan-yellow" />
              </motion.div>
              <h4 className="text-white font-bold text-base">
                {direction === 'rtl' ? 'المزيد' : 'More'}
              </h4>
            </div>

            {/* Spacer */}
            <div className="h-5" />

            <ul className="flex flex-col gap-3">
              {navItems.slice(4).map((item, index) => (
                <motion.li 
                  key={item.key}
                  initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="text-liwan-text-muted hover:text-liwan-teal transition-all text-sm flex items-center gap-2 group"
                    whileHover={{ x: direction === 'rtl' ? -5 : 5 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-liwan-teal/50 group-hover:bg-liwan-teal transition-colors" />
                    {t(`nav.${item.key}`)}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Scroll to Top Card */}
          <div className="lg:col-span-1 flex lg:justify-end">
            <motion.button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-liwan-green to-liwan-teal p-[2px] shadow-lg shadow-liwan-teal/20"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-xl bg-liwan-bg/90 flex items-center justify-center hover:bg-liwan-bg/50 transition-colors">
                <ArrowUp className="w-6 h-6 text-white" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-10 sm:h-12" />

        {/* Divider with gradient */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spacer */}
        <div className="h-6 sm:h-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.p 
            className="text-sm text-liwan-text-muted"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t('footer.copyright')}
          </motion.p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
