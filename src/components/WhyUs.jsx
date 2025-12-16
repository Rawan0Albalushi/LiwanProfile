import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Shield, Users, MessageCircle, Handshake, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhyUs = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    { 
      icon: Shield, 
      text: t('whyUs.reason1'),
      gradient: 'from-liwan-green to-liwan-teal',
      number: '01'
    },
    { 
      icon: Users, 
      text: t('whyUs.reason2'),
      gradient: 'from-liwan-teal to-liwan-blue',
      number: '02'
    },
    { 
      icon: CheckCircle2, 
      text: t('whyUs.reason3'),
      gradient: 'from-liwan-blue to-liwan-purple',
      number: '03'
    },
    { 
      icon: MessageCircle, 
      text: t('whyUs.reason4'),
      gradient: 'from-liwan-purple to-liwan-yellow',
      number: '04'
    },
    { 
      icon: Handshake, 
      text: t('whyUs.reason5'),
      gradient: 'from-liwan-yellow to-liwan-green',
      number: '05'
    },
  ];

  return (
    <section id="whyus" className="section-padding relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-liwan-purple/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-liwan-teal/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full bg-liwan-purple/10 border border-liwan-purple/20 text-liwan-purple text-base font-medium"
        >
          {t('whyUs.title')}
        </motion.span>

        {/* Spacer */}
        <div className="h-8 sm:h-10" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl"
        >
          <span className="gradient-text">{t('whyUs.subtitle')}</span>
        </motion.h2>

        {/* Spacer */}
        <div className="h-6 sm:h-8" />

        {/* Decorative Line */}
        <motion.div 
          className="w-16 h-1 bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 64, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Spacer */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Reasons - Stacked Cards Layout */}
        <div className="w-full max-w-4xl space-y-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
            >
              <motion.div 
                className="relative p-5 sm:p-6 rounded-2xl bg-liwan-bg-secondary/40 border border-white/10 shadow-lg shadow-black/20 backdrop-blur-sm"
                animate={isInView ? { 
                  y: [0, -4, 0],
                } : {}}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                {/* Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${reason.gradient} rounded-2xl`}
                  animate={isInView ? {
                    opacity: [0.03, 0.08, 0.03],
                  } : { opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Glowing Border Effect */}
                <motion.div 
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${reason.gradient} opacity-0`}
                  style={{ 
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                  animate={isInView ? {
                    opacity: [0.2, 0.5, 0.2],
                  } : { opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                  {/* Number Badge */}
                  <motion.div 
                    className={`hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${reason.gradient} items-center justify-center text-white font-bold text-sm shadow-lg`}
                    animate={isInView ? { 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(20, 184, 166, 0.3)",
                        "0 0 20px 5px rgba(20, 184, 166, 0.15)",
                        "0 0 0 0 rgba(20, 184, 166, 0.3)",
                      ]
                    } : {}}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  >
                    {reason.number}
                  </motion.div>
                  
                  {/* Icon */}
                  <motion.div 
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${reason.gradient} p-[2px] shadow-lg`}
                    animate={isInView ? { 
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full rounded-xl bg-liwan-bg/80 flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        animate={isInView ? { 
                          scale: [1, 1.15, 1],
                        } : {}}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Text */}
                  <p className="text-base sm:text-lg text-white leading-[1.8] flex-1">
                    {reason.text}
                  </p>
                  
                  {/* Decorative Element */}
                  <motion.div 
                    className={`hidden lg:block w-2 h-2 rounded-full bg-gradient-to-br ${reason.gradient}`}
                    animate={isInView ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Spacer */}
        <div className="h-12 sm:h-16" />

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.div 
            className="relative inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-liwan-green/10 via-liwan-blue/10 to-liwan-purple/10 border border-white/10 shadow-xl shadow-black/20 backdrop-blur-sm overflow-hidden"
            animate={isInView ? { 
              y: [0, -5, 0],
            } : {}}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Animated Gradient Border */}
            <motion.div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0%', '-200% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Code Icon */}
            <motion.div
              animate={isInView ? { 
                rotate: [0, 10, -10, 0],
              } : {}}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code2 className="w-6 h-6 text-liwan-yellow" />
            </motion.div>
            
            <span className="text-base sm:text-lg text-white leading-[1.8] relative z-10">
              {direction === 'rtl' 
                ? 'نحن شريكك المثالي لتحويل أفكارك إلى واقع رقمي' 
                : "We're your ideal partner to transform your ideas into digital reality"}
            </span>
            
            {/* Code Icon */}
            <motion.div
              animate={isInView ? { 
                rotate: [0, -10, 10, 0],
              } : {}}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Code2 className="w-6 h-6 text-liwan-yellow" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
