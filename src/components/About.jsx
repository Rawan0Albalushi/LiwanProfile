import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, CheckCircle2, Zap, Heart, Target } from 'lucide-react';
import liwanImage from '../assets/images/liwan.jpg';

const About = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: CheckCircle2, text: direction === 'rtl' ? 'جودة عالية' : 'High Quality' },
    { icon: Zap, text: direction === 'rtl' ? 'سرعة التنفيذ' : 'Fast Delivery' },
    { icon: Heart, text: direction === 'rtl' ? 'شغف حقيقي' : 'Real Passion' },
    { icon: Target, text: direction === 'rtl' ? 'تركيز على الهدف' : 'Goal Focused' },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-liwan-green/10 to-liwan-teal/10 border border-liwan-green/20 text-liwan-green text-base font-medium"
        >
          {t('about.title')}
        </motion.span>

        {/* Spacer */}
        <div className="h-8 sm:h-10" />

        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        >
          <span className="gradient-text">{t('about.subtitle')}</span>
        </motion.h2>

        {/* Spacer */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative order-2 ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-liwan-green via-liwan-teal to-liwan-blue rounded-2xl blur-lg opacity-30" />
              
              <motion.div 
                className="relative rounded-2xl overflow-hidden border border-white/10 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src={liwanImage} 
                  alt="Liwan Team"
                  className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-liwan-bg/80 via-transparent to-transparent group-hover:from-liwan-bg/60 transition-all duration-500" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: [0, -8, 0],
                } : {}}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.6 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                }}
                whileHover={{ scale: 1.05 }}
                className={`absolute -bottom-6 ${direction === 'rtl' ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'} bg-liwan-bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-5 hover:border-liwan-green/30 transition-all duration-500 hover:shadow-xl hover:shadow-liwan-green/10 group`}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-liwan-green to-liwan-teal flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                    >
                      +50
                    </motion.div>
                    <div className="text-sm text-liwan-text-muted group-hover:text-liwan-text-secondary transition-colors">
                      {direction === 'rtl' ? 'مشروع ناجح' : 'Successful Projects'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`order-1 ${direction === 'rtl' ? 'lg:order-1' : 'lg:order-2'} flex flex-col`}
          >
            {/* Description 1 */}
            <p className="text-lg sm:text-xl text-liwan-text-secondary leading-[2]">
              {t('about.description1')}
            </p>

            {/* Spacer */}
            <div className="h-6 sm:h-8" />

            {/* Description 2 */}
            <p className="text-lg text-liwan-text-muted leading-[2]">
              {t('about.description2')}
            </p>

            {/* Spacer */}
            <div className="h-8 sm:h-10" />
            
            {/* Highlight Box */}
            <div className="relative p-6 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-liwan-green/5 via-liwan-teal/5 to-liwan-blue/5" />
              <div className="absolute inset-0 border border-white/5 rounded-2xl" />
              
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-liwan-green to-liwan-teal flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg text-white font-medium leading-[1.8]">
                  {t('about.description3')}
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-8 sm:h-10" />

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-liwan-green/30 transition-all duration-300 hover:bg-liwan-green/5 cursor-default group"
                >
                  <motion.span
                    animate={{ rotate: [0, 0] }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-4 h-4 text-liwan-green group-hover:text-liwan-teal transition-colors" />
                  </motion.span>
                  <span className="text-sm text-liwan-text-secondary group-hover:text-white transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Spacer */}
            <div className="h-8 sm:h-10" />

            {/* Decorative line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: 120 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-liwan-green via-liwan-teal to-liwan-blue rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
