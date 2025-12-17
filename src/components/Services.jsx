import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Globe, Settings, Palette } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Smartphone,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      gradient: 'from-liwan-green to-liwan-teal',
    },
    {
      icon: Globe,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      gradient: 'from-liwan-teal to-liwan-blue',
    },
    {
      icon: Settings,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      gradient: 'from-liwan-blue to-liwan-purple',
    },
    {
      icon: Palette,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      gradient: 'from-liwan-purple to-liwan-yellow',
    },
  ];

  return (
    <section id="services" className="section-padding relative">

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full bg-liwan-teal/10 border border-liwan-teal/20 text-liwan-teal text-base font-medium"
        >
          {t('services.title')}
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
          <span className="gradient-text">{t('services.subtitle')}</span>
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 w-full">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient Border Container */}
              <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full p-5 xs:p-6 sm:p-10 lg:p-12 rounded-xl sm:rounded-2xl bg-[#0a0e14] border-0 transition-all duration-500 flex flex-col overflow-hidden">
                
                {/* Background Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.06] group-hover:opacity-[0.12] blur-3xl transition-opacity duration-700`} />
                <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.04] group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700 delay-100`} />
                
                {/* Top Row: Number + Icon */}
                <div className="flex items-start justify-between relative z-10 mb-3 sm:mb-4">
                  {/* Service Number */}
                  <span className={`text-3xl xs:text-4xl sm:text-5xl font-bold bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    0{index + 1}
                  </span>
                  
                  {/* Icon */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.gradient} p-[1.5px]`}>
                      <div className="w-full h-full rounded-lg sm:rounded-xl bg-[#0a0e14] flex items-center justify-center group-hover:bg-[#0a0e14]/70 transition-colors duration-500">
                        <service.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-150`} />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="h-4 xs:h-5 sm:h-7" />

                {/* Title */}
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white transition-colors duration-300 relative z-10">
                  {service.title}
                </h3>

                {/* Spacer */}
                <div className="h-2 xs:h-3 sm:h-4" />

                {/* Description */}
                <p className="text-sm xs:text-base text-liwan-text-secondary leading-[1.8] xs:leading-[2] flex-grow relative z-10">
                  {service.description}
                </p>

                {/* Spacer */}
                <div className="h-4 xs:h-5 sm:h-6" />

                {/* Bottom Gradient Line */}
                <div className="relative h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div 
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${service.gradient} rounded-full`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "50%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
