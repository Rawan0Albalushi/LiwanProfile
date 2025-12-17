import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, PenTool, Code, Rocket } from 'lucide-react';

const Process = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Lightbulb,
      number: '01',
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      gradient: 'from-liwan-green to-liwan-teal',
    },
    {
      icon: PenTool,
      number: '02',
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      gradient: 'from-liwan-teal to-liwan-blue',
    },
    {
      icon: Code,
      number: '03',
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      gradient: 'from-liwan-blue to-liwan-purple',
    },
    {
      icon: Rocket,
      number: '04',
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      gradient: 'from-liwan-purple to-liwan-yellow',
    },
  ];

  return (
    <section id="process" className="section-padding relative overflow-hidden">

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full bg-liwan-blue/10 border border-liwan-blue/20 text-liwan-blue text-base font-medium"
        >
          {t('process.title')}
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
          <span className="gradient-text">{t('process.subtitle')}</span>
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

        {/* Process Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <motion.div 
                className="h-full p-3 xs:p-4 sm:p-5 pt-6 xs:pt-7 sm:pt-8 rounded-lg sm:rounded-xl bg-liwan-bg-secondary/30 border border-white/15 text-center flex flex-col items-center relative shadow-xl shadow-liwan-blue/5"
                animate={isInView ? { 
                  y: [0, -6, 0],
                } : {}}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: "easeInOut"
                }}
              >
                {/* Background glow - always visible */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.gradient} opacity-5 rounded-xl`} />
                
                {/* Icon with Number */}
                <div className="relative z-10 mt-1">
                  <motion.div 
                    className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${step.gradient} p-[2px]`}
                    animate={isInView ? { 
                      scale: [1, 1.08, 1],
                    } : {}}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-liwan-bg/50 flex items-center justify-center">
                      <motion.div
                        animate={isInView ? { 
                          rotate: [0, 10, -10, 0],
                        } : {}}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <step.icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                  {/* Step Number with pulse */}
                  <motion.div 
                    className={`absolute -top-1 ${direction === 'rtl' ? '-left-1' : '-right-1'} w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-[10px] xs:text-xs font-bold text-white`}
                    animate={{ 
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(20, 184, 166, 0.4)",
                        "0 0 0 10px rgba(20, 184, 166, 0)",
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {step.number}
                  </motion.div>
                  {/* Icon glow - always visible */}
                  <motion.div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl -z-10`}
                    animate={isInView ? {
                      opacity: [0.2, 0.4, 0.2],
                    } : { opacity: 0 }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Spacer */}
                <div className="h-3 xs:h-4 sm:h-5" />

                {/* Title */}
                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-liwan-teal relative z-10">
                  {step.title}
                </h3>

                {/* Spacer */}
                <div className="h-2 xs:h-3" />

                {/* Description */}
                <p className="text-xs xs:text-sm text-liwan-text-secondary leading-[1.7] xs:leading-[1.8] relative z-10">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
