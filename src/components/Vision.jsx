import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Rocket, Globe, TrendingUp, Quote, Code2 } from 'lucide-react';

const Vision = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const pillars = [
    { 
      icon: Rocket, 
      label: direction === 'rtl' ? 'التحول الرقمي' : 'Digital Transformation',
      gradient: 'from-liwan-green to-liwan-teal',
    },
    { 
      icon: TrendingUp, 
      label: direction === 'rtl' ? 'نمو الأعمال' : 'Business Growth',
      gradient: 'from-liwan-teal to-liwan-blue',
    },
    { 
      icon: Globe, 
      label: direction === 'rtl' ? 'قيمة مستدامة' : 'Sustainable Value',
      gradient: 'from-liwan-blue to-liwan-purple',
    },
  ];

  return (
    <section id="vision" className="section-padding relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large glowing orb */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-liwan-green/10 via-liwan-blue/5 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-liwan-teal/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          
          {/* Icon with glow */}
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
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <div className="w-full h-full rounded-2xl bg-liwan-bg/90 flex items-center justify-center backdrop-blur-sm">
                <motion.div
                  animate={isInView ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-liwan-green via-liwan-blue to-liwan-purple blur-xl -z-10"
              animate={isInView ? {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              } : { opacity: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Spacer */}
          <div className="h-8 sm:h-10" />

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-5 py-2 rounded-full bg-liwan-green/10 border border-liwan-green/20 text-liwan-green text-base font-medium"
          >
            {t('vision.title')}
          </motion.span>

          {/* Spacer */}
          <div className="h-10 sm:h-12" />

          {/* Vision Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full relative px-1"
          >
            <motion.div 
              className="relative p-5 xs:p-6 sm:p-10 md:p-12 rounded-xl sm:rounded-2xl bg-liwan-bg-secondary/50 border border-white/10 text-center backdrop-blur-sm overflow-hidden"
              animate={isInView ? { 
                y: [0, -5, 0],
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-liwan-green/5 via-liwan-blue/5 to-liwan-purple/5"
                animate={isInView ? {
                  opacity: [0.5, 1, 0.5],
                } : { opacity: 0 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Corner decorations */}
              <motion.div 
                className="absolute top-4 right-4 sm:top-6 sm:right-6"
                animate={isInView ? { 
                  rotate: [0, 10, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-liwan-yellow" />
              </motion.div>
              <motion.div 
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
                animate={isInView ? { 
                  rotate: [0, -10, 10, 0],
                  opacity: [0.4, 0.8, 0.4],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-liwan-yellow" />
              </motion.div>
              
              {/* Quote icon */}
              <motion.div 
                className="absolute top-4 left-4 sm:top-6 sm:left-6"
                animate={isInView ? { 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-liwan-teal/30 rotate-180" />
              </motion.div>
              
              {/* Vision text */}
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium leading-[1.8] xs:leading-[2] relative z-10">
                {t('vision.description')}
              </p>
              
              {/* Quote icon end */}
              <motion.div 
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
                animate={isInView ? { 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-liwan-teal/30" />
              </motion.div>
              
              {/* Glowing border effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                style={{
                  background: 'linear-gradient(90deg, rgba(20,184,166,0.3), rgba(59,130,246,0.3), rgba(168,85,247,0.3)) padding-box, linear-gradient(90deg, rgba(20,184,166,0.3), rgba(59,130,246,0.3), rgba(168,85,247,0.3)) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
                animate={isInView ? {
                  opacity: [0.3, 0.7, 0.3],
                } : { opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Spacer */}
          <div className="h-12 sm:h-16" />

          {/* Vision Pillars */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-3 sm:gap-5 w-full">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              >
                <motion.div 
                  className="p-4 xs:p-4 sm:p-6 rounded-lg xs:rounded-xl bg-liwan-bg-secondary/40 border border-white/10 text-center flex flex-col items-center relative overflow-hidden shadow-lg shadow-black/20"
                  animate={isInView ? { 
                    y: [0, -6, 0],
                  } : {}}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                >
                  {/* Background gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-t ${pillar.gradient} rounded-xl`}
                    animate={isInView ? {
                      opacity: [0.03, 0.08, 0.03],
                    } : { opacity: 0 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Icon container */}
                  <motion.div 
                    className={`w-12 h-12 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-lg xs:rounded-xl bg-gradient-to-br ${pillar.gradient} p-[2px] shadow-lg relative z-10`}
                    animate={isInView ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full rounded-lg xs:rounded-xl bg-liwan-bg/80 flex items-center justify-center">
                      <pillar.icon className="w-5 h-5 xs:w-5 xs:h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="h-2 xs:h-3 sm:h-4" />

                  <p className="text-sm xs:text-sm sm:text-lg text-white font-medium leading-[1.6] xs:leading-[1.8] relative z-10">
                    {pillar.label}
                  </p>
                  
                  {/* Decorative dot */}
                  <motion.div 
                    className={`absolute top-2 xs:top-3 ${direction === 'rtl' ? 'left-2 xs:left-3' : 'right-2 xs:right-3'} w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-gradient-to-br ${pillar.gradient}`}
                    animate={isInView ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Spacer */}
          <div className="h-10 sm:h-12" />

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-1 bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Vision;
