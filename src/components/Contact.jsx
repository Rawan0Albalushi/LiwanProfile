import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Twitter, Instagram, MapPin, Clock, Code2, MessageCircle } from 'lucide-react';

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: t('contact.emailValue'),
      href: 'mailto:info@liwan.dev',
      gradient: 'from-liwan-green to-liwan-teal',
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: t('contact.phoneValue'),
      href: 'tel:+968XXXXXXXX',
      gradient: 'from-liwan-teal to-liwan-blue',
    },
    {
      icon: Clock,
      label: direction === 'rtl' ? 'وقت الرد' : 'Response Time',
      value: direction === 'rtl' ? 'خلال 24 ساعة' : 'Within 24 hours',
      href: null,
      gradient: 'from-liwan-blue to-liwan-purple',
    },
    {
      icon: MapPin,
      label: direction === 'rtl' ? 'الموقع' : 'Location',
      value: direction === 'rtl' ? 'سلطنة عُمان' : 'Sultanate of Oman',
      href: null,
      gradient: 'from-liwan-purple to-liwan-yellow',
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', gradient: 'from-liwan-blue to-liwan-teal' },
    { icon: WhatsAppIcon, href: 'https://wa.me/', label: 'WhatsApp', gradient: 'from-liwan-green to-liwan-teal' },
    { icon: Instagram, href: '#', label: 'Instagram', gradient: 'from-liwan-purple to-liwan-yellow' },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-liwan-green/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-liwan-purple/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative"
        >
          <motion.div 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-liwan-green via-liwan-blue to-liwan-purple p-[2px]"
            animate={isInView ? { 
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full rounded-2xl bg-liwan-bg/90 flex items-center justify-center backdrop-blur-sm">
              <motion.div
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Glow */}
          <motion.div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-liwan-green via-liwan-blue to-liwan-purple blur-xl -z-10"
            animate={isInView ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] } : { opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Spacer */}
        <div className="h-8 sm:h-10" />

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full bg-liwan-green/10 border border-liwan-green/20 text-liwan-green text-base font-medium"
        >
          {t('contact.title')}
        </motion.span>

        {/* Spacer */}
        <div className="h-8 sm:h-10" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        >
          <span className="gradient-text">{t('contact.subtitle')}</span>
        </motion.h2>

        {/* Spacer */}
        <div className="h-6 sm:h-8" />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-liwan-text-muted max-w-2xl text-center leading-[1.9]"
        >
          {t('contact.description')}
        </motion.p>

        {/* Spacer */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
          {contactInfo.map((info, index) => {
            const CardWrapper = info.href ? motion.a : motion.div;
            return (
              <CardWrapper
                key={index}
                href={info.href || undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <motion.div 
                  className="h-full p-6 rounded-2xl bg-liwan-bg-secondary/40 border border-white/10 text-center flex flex-col items-center relative overflow-hidden shadow-lg shadow-black/20 backdrop-blur-sm"
                  animate={isInView ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                >
                  {/* Background gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-b ${info.gradient} rounded-2xl`}
                    animate={isInView ? { opacity: [0.03, 0.08, 0.03] } : { opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${info.gradient} p-[2px] shadow-lg relative z-10`}
                    animate={isInView ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full rounded-xl bg-liwan-bg/80 flex items-center justify-center">
                      <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="h-4" />

                  {/* Label */}
                  <p className="text-sm text-liwan-text-muted relative z-10">
                    {info.label}
                  </p>

                  {/* Spacer */}
                  <div className="h-2" />

                  {/* Value */}
                  <p className="text-base sm:text-lg text-white font-semibold relative z-10" dir={info.icon === Mail || info.icon === Phone ? 'ltr' : undefined}>
                    {info.value}
                  </p>

                  {/* Decorative dot */}
                  <motion.div 
                    className={`absolute top-3 ${direction === 'rtl' ? 'left-3' : 'right-3'} w-2 h-2 rounded-full bg-gradient-to-br ${info.gradient}`}
                    animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                  />
                  
                  {/* Glowing border */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops)) padding-box, linear-gradient(135deg, var(--tw-gradient-stops)) border-box`,
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }}
                    animate={isInView ? { opacity: [0.1, 0.3, 0.1] } : { opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  />
                </motion.div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="h-12 sm:h-16" />

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-md"
        >
          <motion.div 
            className="p-6 sm:p-8 rounded-2xl bg-liwan-bg-secondary/40 border border-white/10 backdrop-blur-sm text-center relative overflow-hidden"
            animate={isInView ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-liwan-green/5 via-liwan-blue/5 to-liwan-purple/5"
              animate={isInView ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Code icons decoration */}
            <motion.div 
              className="absolute top-4 right-4"
              animate={isInView ? { rotate: [0, 10, -10, 0], opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 className="w-5 h-5 text-liwan-yellow" />
            </motion.div>
            <motion.div 
              className="absolute bottom-4 left-4"
              animate={isInView ? { rotate: [0, -10, 10, 0], opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Code2 className="w-5 h-5 text-liwan-yellow" />
            </motion.div>

            <p className="text-base text-liwan-text-secondary relative z-10">
              {t('contact.social')}
            </p>

            {/* Spacer */}
            <div className="h-5" />

            <div className="flex items-center justify-center gap-4 relative z-10">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="relative"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                >
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.gradient} p-[2px] shadow-lg`}
                    animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full rounded-xl bg-liwan-bg/80 flex items-center justify-center hover:bg-liwan-bg/50 transition-colors duration-300">
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradient} blur-lg -z-10`}
                    animate={isInView ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Spacer */}
            <div className="h-4" />
          </motion.div>
        </motion.div>

        {/* Spacer */}
        <div className="h-10 sm:h-12" />

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 96, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="h-1 bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple rounded-full"
        />
      </div>
    </section>
  );
};

export default Contact;
