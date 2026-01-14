import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { 
  ExternalLink, Code2, ArrowUpRight
} from 'lucide-react';
import nahjLogo from '../assets/images/nahj.png';
import nahjScreen1 from '../assets/images/nahj2.jpg';
import nahjScreen2 from '../assets/images/nahj22.jpg';
import entreforumLogo from '../assets/images/entreforum.png';
import entreforumBg from '../assets/images/entreforum-back.png';
import studentWelfareLogo from '../assets/images/student welfare fund logo.jpg';
import goldcomLogo from '../assets/images/Goldcom Logo - Wide Monochrome White.png';
import maksabLogo from '../assets/images/maksab.png';
import clanLogo from '../assets/images/clanlogo.png';
import mkancomLogo from '../assets/images/mkancom.jpg';

// 3D Card Component for Featured
const Card3D = ({ children, className }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Custom hook for CSS-based smooth infinite auto-scroll
const useAutoScroll = (containerRef, direction, pauseDelay = 2500) => {
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, pauseDelay);
  }, [pauseDelay]);

  const touch = useCallback(() => {
    pause();
    resume();
  }, [pause, resume]);

  return { pause, resume, touch, isPaused };
};

const Projects = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Use auto-scroll hook with CSS animation - pause delay: 2 seconds
  const { pause, resume, touch, isPaused } = useAutoScroll(scrollContainerRef, direction, 2000);

  // Event handlers for pausing auto-scroll on user interaction
  const handleMouseEnter = () => pause();
  const handleMouseLeave = () => resume();
  const handleTouchStart = () => pause();
  const handleTouchEnd = () => resume();

  // Featured Project (Nahj)
  const featuredProject = {
    id: 1,
    title: direction === 'rtl' ? 'منصة نهج' : 'Nahj Platform',
    category: direction === 'rtl' ? 'تعليم وتدريب' : 'Education & Training',
    description: direction === 'rtl' 
      ? 'منصة تعليمية وتدريبية متكاملة تقدم دورات احترافية في مختلف المجالات التقنية والإدارية'
      : 'An integrated educational and training platform offering professional courses in various technical and administrative fields',
    logo: nahjLogo,
    url: 'https://nahj.om/',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
  };

  // Grid Projects with more variety
  const gridProjects = [
    {
      id: 2,
      title: direction === 'rtl' ? 'ملتقى ريادة الأعمال' : 'Entrepreneurship Forum',
      subtitle: direction === 'rtl' ? 'الوسطى تبتكر' : 'Al-Wusta Innovates',
      description: direction === 'rtl' 
        ? 'منصة رقمية متكاملة صُممت لإدارة فعاليات ريادة الأعمال، من التسجيل وحتى التفاعل، مع تجربة مستخدم حديثة وبنية تقنية قابلة للتوسع.'
        : 'An integrated digital platform designed to manage entrepreneurship events, from registration to interaction, with a modern UX and scalable architecture.',
      logo: entreforumLogo,
      bgImage: entreforumBg,
      url: 'https://entreforum.om/',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      hasUrl: true,
      isLive: true,
    },
    {
      id: 22,
      title: direction === 'rtl' ? 'جولدكم' : 'GoldCom',
      subtitle: direction === 'rtl' ? 'منصّة ذكية لبيع وشراء الذهب' : 'Smart Platform for Gold Trading',
      description: direction === 'rtl' 
        ? 'منصّة رقمية لبيع وشراء الذهب، توفّر تجربة آمنة وسلسة للمستخدمين، مع عرض الأسعار، إدارة الطلبات، وتتبع عمليات الشراء، عبر بنية تقنية موثوقة.'
        : 'A digital platform for buying and selling gold, providing a safe and seamless experience for users, with price display, order management, and purchase tracking through reliable technical infrastructure.',
      logo: goldcomLogo,
      url: 'https://goldcom.om/',
      gradient: 'from-yellow-600 via-amber-700 to-yellow-900',
      bgColor: 'from-amber-950 via-yellow-950 to-stone-950',
      hasUrl: true,
      isLive: false,
      inDevelopment: true,
    },
    {
      id: 21,
      title: direction === 'rtl' ? 'صندوق رعاية الطالب الجامعي' : 'University Student Welfare Fund',
      subtitle: direction === 'rtl' ? 'دعم التعليم، وصناعة المستقبل' : 'Supporting Education, Building the Future',
      description: direction === 'rtl' 
        ? 'منصة رقمية خُصصت لدعم الطلبة الجامعيين، تتيح إدارة حالات الدعم، التبرعات، والمبادرات التعليمية، مع تجربة استخدام سهلة وبنية تقنية موثوقة.'
        : 'A digital platform dedicated to supporting university students, enabling management of support cases, donations, and educational initiatives, with an intuitive experience and reliable technical infrastructure.',
      logo: studentWelfareLogo,
      gradient: 'from-fuchsia-500 via-purple-500 to-cyan-500',
      bgColor: 'from-fuchsia-900 via-purple-900 to-cyan-900',
      isRichCard: true,
      isLive: false,
    },
    {
      id: 23,
      title: direction === 'rtl' ? 'مكسب' : 'Maksab',
      subtitle: direction === 'rtl' ? 'دعم الأسر المنتجة' : 'Supporting Productive Families',
      description: direction === 'rtl' 
        ? 'نظام رقمي متكامل لدعم التجارة المحلية، يوفّر حلول الطلب، التوصيل، وإدارة العمليات في تجربة واحدة موثوقة.'
        : 'An integrated digital system supporting local commerce, providing ordering, delivery, and operations management solutions in one reliable experience.',
      logo: maksabLogo,
      gradient: 'from-teal-500 via-cyan-500 to-coral-500',
      bgColor: 'from-teal-900 via-cyan-900 to-rose-900',
      hasUrl: false,
      isRichCard: true,
      isLive: true,
    },
    {
      id: 24,
      title: direction === 'rtl' ? 'كلان' : 'Clan',
      subtitle: direction === 'rtl' ? 'متجر إلكتروني' : 'E-Commerce Store',
      description: direction === 'rtl' 
        ? 'متجر إلكتروني عصري يقدّم تجربة تسوق سلسة ومميزة، مع واجهة أنيقة وسهلة الاستخدام وحلول دفع آمنة.'
        : 'A modern e-commerce store offering a seamless and distinctive shopping experience, with an elegant user interface and secure payment solutions.',
      logo: clanLogo,
      gradient: 'from-red-500 via-yellow-500 to-green-600',
      bgColor: 'from-stone-900 via-neutral-900 to-stone-950',
      hasUrl: false,
      isRichCard: true,
      isLive: false,
      inDevelopment: true,
    },
    {
      id: 25,
      title: direction === 'rtl' ? 'مكانكم' : 'Mkancom',
      subtitle: direction === 'rtl' ? 'منصة حجز تذاكر للفعاليات' : 'Event Ticket Booking Platform',
      description: direction === 'rtl' 
        ? 'منصة رقمية متكاملة لحجز تذاكر الفعاليات والمناسبات، توفّر تجربة حجز سريعة وآمنة مع إدارة ذكية للمقاعد والفعاليات.'
        : 'An integrated digital platform for booking event tickets, providing a fast and secure booking experience with smart seating and event management.',
      logo: mkancomLogo,
      gradient: 'from-purple-500 via-violet-500 to-indigo-600',
      bgColor: 'from-purple-950 via-violet-950 to-indigo-950',
      hasUrl: false,
      isRichCard: true,
      isLive: false,
      inDevelopment: true,
    },
  ];

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...gridProjects, ...gridProjects, ...gridProjects];

  return (
    <section id="projects" className="section-padding relative overflow-visible">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        
        <motion.div 
          className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-conic from-liwan-green/20 via-liwan-blue/10 to-liwan-purple/20 rounded-full blur-[100px]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-conic from-liwan-purple/20 via-liwan-teal/10 to-liwan-yellow/20 rounded-full blur-[100px]"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center overflow-visible">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-liwan-yellow/20 to-liwan-green/20 blur-xl rounded-full" />
          <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-liwan-yellow" />
            <span className="text-white/80 text-sm font-medium tracking-wide">{t('projects.title')}</span>
          </span>
        </motion.div>

        <div className="h-10 sm:h-12" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight"
        >
          <span className="gradient-text">{t('projects.subtitle')}</span>
        </motion.h2>

        <motion.div 
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
          <Code2 className="w-5 h-5 text-white/30" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
        </motion.div>

        <div className="h-14 sm:h-18 md:h-20" />

        {/* ===== FEATURED PROJECT (Nahj) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full mb-8 sm:mb-10 lg:mb-12 relative z-0"
        >
          <a
            href={featuredProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full group"
          >
            <div className="relative w-full rounded-[2rem] overflow-hidden">
              
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d2920] via-[#0a1f1a] to-[#071510]" />
              
              {/* Subtle glow */}
              <div className={`absolute ${direction === 'rtl' ? 'right-[10%]' : 'left-[10%]'} top-[10%] w-[35%] h-[40%] bg-emerald-500/8 rounded-full blur-[80px]`} />
              
              {/* Border */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/[0.08] group-hover:border-emerald-500/20 transition-colors duration-500" />
              
{/* Content Container */}
                <div className="relative z-10 pt-6 pb-8 px-6 xs:px-8 sm:pt-8 sm:pb-12 sm:px-12 lg:pt-10 lg:pb-14 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-16">
                  
                  {/* Content Side - 3 columns */}
                  <div className={`lg:col-span-3 flex flex-col items-center justify-center ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Text Content Container - max-w-[640px] */}
                    <div className="max-w-[640px] text-center flex flex-col items-center">
                      
                      {/* Logo */}
                      <img 
                        src={featuredProject.logo} 
                        alt={featuredProject.title} 
                        className="w-40 xs:w-48 h-auto sm:w-64 lg:w-80 mb-6 sm:mb-8 mx-auto drop-shadow-2xl"
                      />
                      
                      {/* Eyebrow / Title */}
                      <h3 className="text-emerald-400 text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold">
                        {direction === 'rtl' 
                          ? 'منصة تعليم وتدريب رقمية متكاملة' 
                          : 'Integrated Digital Learning & Training Platform'}
                      </h3>
                      
                      <div className="h-6 sm:h-8" />
                      
                      {/* Description */}
                      <p className="text-white/60 text-sm sm:text-base leading-loose">
                        {direction === 'rtl' 
                          ? 'منصة نهج توفّر تجربة تعليمية حديثة تجمع بين المحتوى الاحترافي، سهولة الاستخدام، وبنية تقنية مرنة، لتمكين الأفراد والمؤسسات من تطوير مهاراتهم بكفاءة عالية.' 
                          : 'Nahj platform provides a modern learning experience combining professional content, ease of use, and flexible technical infrastructure to empower individuals and organizations.'}
                      </p>
                      
                      <div className="h-8 sm:h-10" />
                      
                      {/* CTA Button */}
                      <button className="group/btn relative inline-flex items-center gap-2 sm:gap-3 px-5 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm xs:text-base sm:text-lg transition-all duration-300 shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:shadow-emerald-800/50 hover:-translate-y-0.5">
                        <span>{direction === 'rtl' ? 'زيارة المنصة' : 'Visit Platform'}</span>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Mockup Side - 2 columns - Stacked Phones */}
                  <div className={`lg:col-span-2 relative flex items-center justify-center ${direction === 'rtl' ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}>
                    <div className="relative w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[380px] lg:max-w-[420px] h-[320px] xs:h-[360px] sm:h-[480px] lg:h-[520px]">
                      
                      {/* Secondary Phone - Behind, smaller, with blur */}
                      <div className={`absolute ${direction === 'rtl' ? 'right-0' : 'left-0'} top-6 sm:top-8 w-[55%] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-black/40 bg-[#1a5c3a] opacity-60 blur-[1px]`}>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/[0.06] z-20" />
                        <img 
                          src={nahjScreen1} 
                          alt="Nahj Platform Splash Screen" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Primary Phone - Front, bigger */}
                      <div className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} top-0 w-[70%] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#1a5c3a] z-10 group-hover:shadow-emerald-900/40 transition-shadow duration-500`}>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/[0.1] z-20" />
                        <img 
                          src={nahjScreen2} 
                          alt="Nahj Platform Interface" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* ===== SCROLLABLE GRID PROJECTS ===== */}
        <div className="w-[100vw] relative z-10 overflow-visible -mx-[calc((100vw-100%)/2)]">
          <motion.div 
            className="w-full relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 lg:w-64 bg-gradient-to-r from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 lg:w-64 bg-gradient-to-l from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />

            {/* Scrollable Container with CSS Animation */}
            <div 
              ref={scrollContainerRef}
              className="overflow-hidden py-6"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className={`flex flex-nowrap gap-6 sm:gap-8 px-4 ${isPaused ? 'animation-paused' : ''}`}
                dir={direction}
                style={{
                  animation: direction === 'rtl' 
                    ? 'scrollRTL 60s linear infinite' 
                    : 'scrollLTR 60s linear infinite',
                  width: 'fit-content',
                }}
              >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-[180px] xs:w-[200px] sm:w-[240px] relative"
              >
                {(project.hasUrl || project.isRichCard) ? (
                  project.hasUrl ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group cursor-pointer relative"
                  >
                    <div className={`relative h-full min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${project.bgColor ? 'shadow-amber-900/40 group-hover:shadow-[0_0_80px_rgba(217,119,6,0.5)]' : 'shadow-purple-900/40 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.6)]'} transition-all duration-500 ring-2 ring-transparent ${project.bgColor ? 'group-hover:ring-amber-400/60' : 'group-hover:ring-purple-400/60'}`}>
                      {/* Background Image with blur overlay */}
                      {project.bgImage ? (
                        <>
                          <img 
                            src={project.bgImage} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Dark glass overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/80 to-[#0a1628]/90 backdrop-blur-[2px]" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                        </>
                      ) : project.bgColor ? (
                        <>
                          {/* Custom background color */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-90`} />
                          <div className={`absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/60 to-stone-950/80`} />
                        </>
                      ) : (
                        <>
                          {/* Rich gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 via-purple-900/80 to-fuchsia-950/90" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                        </>
                      )}
                      
                      {/* Animated glow orbs */}
                      <motion.div 
                        className={`absolute -top-10 ${direction === 'rtl' ? '-left-10' : '-right-10'} w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-70`}
                        animate={{ scale: [1, 1.4, 1], rotate: [0, 45, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      />
                      <motion.div 
                        className={`absolute -bottom-10 ${direction === 'rtl' ? '-right-10' : '-left-10'} w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50`}
                        animate={{ scale: [1.2, 1, 1.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      />
                      
                      {/* Glass border effect */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500" />
                      <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl border border-white/5" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                      
                      <div className="relative z-10 h-full p-4 xs:p-5 sm:p-6 pt-5 xs:pt-6 sm:pt-8 flex flex-col items-center justify-start text-center">
                        {/* Logo */}
                        <motion.div 
                          className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-36 sm:h-36 mb-3 sm:mb-4 flex items-center justify-center"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                        >
                          {/* Logo glow backdrop */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                          <img 
                            src={project.logo} 
                            alt={project.title} 
                            className="relative w-full h-full object-contain drop-shadow-2xl filter brightness-110 group-hover:brightness-125 transition-all duration-500" 
                          />
                        </motion.div>
                        
                        {/* Title - single line */}
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-1">
                          {project.title}
                        </h4>
                        
                        {/* Subtitle with gradient - up to 2 lines */}
                        {project.subtitle && (
                          <p className={`text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-bold drop-shadow-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]`}>
                            {project.subtitle}
                          </p>
                        )}
                        
                        <div className="h-4" />
                        
                        {/* Description - 3 lines */}
                        {project.description && (
                          <p className="text-xs text-white/60 leading-relaxed line-clamp-3 min-h-[3.5rem]">
                            {project.description}
                          </p>
                        )}
                        
                        <div className="h-5" />
                        
                        {/* Live/In Development/Coming Soon badge */}
                        {project.isLive ? (
                          <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {direction === 'rtl' ? 'مباشر' : 'Live'}
                          </span>
                        ) : project.inDevelopment ? (
                          <span className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium">
                            {direction === 'rtl' ? 'قيد التطوير' : 'In Development'}
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium">
                            {direction === 'rtl' ? 'قريباً' : 'Coming Soon'}
                          </span>
                        )}
                        
                        {/* Visit indicator - only show for live projects with URL */}
                        {project.hasUrl && (
                          <div 
                            className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                  ) : (
                    /* Rich card without URL (isRichCard only) */
                    <div className="block h-full group relative">
                      <div className={`relative h-full min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-500 ring-2 ring-transparent group-hover:ring-purple-400/60`}>
                        {/* Gradient Background for cards without bgImage */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor || project.gradient} opacity-90`} />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/70" />
                        
                        {/* Animated glow orbs */}
                        <motion.div 
                          className={`absolute -top-10 ${direction === 'rtl' ? '-left-10' : '-right-10'} w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-70`}
                          animate={{ scale: [1, 1.4, 1], rotate: [0, 45, 0] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                        <motion.div 
                          className={`absolute -bottom-10 ${direction === 'rtl' ? '-right-10' : '-left-10'} w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50`}
                          animate={{ scale: [1.2, 1, 1.2] }}
                          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        />
                        
                        {/* Glass border effect */}
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500" />
                        <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl border border-white/5" />
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <div className="relative z-10 h-full p-4 xs:p-5 sm:p-6 pt-5 xs:pt-6 sm:pt-8 flex flex-col items-center justify-start text-center">
                          {/* Logo */}
                          <motion.div 
                            className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-36 sm:h-36 mb-3 sm:mb-4 flex items-center justify-center"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                          >
                            {/* Logo glow backdrop */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                            <img 
                              src={project.logo} 
                              alt={project.title} 
                              className="relative w-full h-full object-contain drop-shadow-2xl filter brightness-110 group-hover:brightness-125 transition-all duration-500 rounded-xl" 
                            />
                          </motion.div>
                          
                          {/* Title - single line */}
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-1">
                            {project.title}
                          </h4>
                          
                          {/* Subtitle with gradient - up to 2 lines */}
                          {project.subtitle && (
                            <p className={`text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-bold drop-shadow-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]`}>
                              {project.subtitle}
                            </p>
                          )}
                          
                          <div className="h-4" />
                          
                          {/* Description - 3 lines */}
                          {project.description && (
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-3 min-h-[3.5rem]">
                              {project.description}
                            </p>
                          )}
                          
                          <div className="h-5" />
                          
                          {/* Live/In Development/Coming Soon badge */}
                          {project.isLive ? (
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-medium">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              {direction === 'rtl' ? 'مباشر' : 'Live'}
                            </span>
                          ) : project.inDevelopment ? (
                            <span className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium">
                              {direction === 'rtl' ? 'قيد التطوير' : 'In Development'}
                            </span>
                          ) : (
                            <span className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium">
                              {direction === 'rtl' ? 'قيد التطوير' : 'In Development'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="group relative h-full cursor-default">
                    <div className="relative h-full min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-black/20 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] ring-2 ring-transparent group-hover:ring-purple-500/40 transition-all duration-500">
                      
                      {/* Sleek dark glass background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-xl" />
                      
                      {/* Gradient overlay on hover */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-15 transition-all duration-700`}
                      />
                      
                      {/* Animated glow orb */}
                      <motion.div
                        className={`absolute -top-6 ${direction === 'rtl' ? '-left-6' : '-right-6'} w-24 h-24 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-50`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.15 }}
                      />
                      
                      {/* Glass border */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08] group-hover:border-white/25 transition-all duration-500" />
                      <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl border border-dashed border-white/[0.04] group-hover:border-white/10 transition-all duration-500" />
                      
                      <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                        {/* Large icon container */}
                        <motion.div 
                          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${project.gradient} p-[2px] mb-6 shadow-lg`}
                          animate={{ 
                            y: [0, -6, 0],
                            rotate: [0, 2, -2, 0]
                          }}
                          transition={{ duration: 5, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {/* Icon glow backdrop */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                          
                          <div className="relative w-full h-full rounded-2xl bg-liwan-bg/95 group-hover:bg-liwan-bg/80 flex items-center justify-center transition-all duration-500 overflow-hidden">
                            {/* Inner gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                            {project.icon && (
                              <project.icon className="relative w-9 h-9 sm:w-11 sm:h-11 text-white/50 group-hover:text-white transition-colors duration-500" />
                            )}
                          </div>
                        </motion.div>

                        {/* Title */}
                        <p className="text-base sm:text-lg font-semibold text-white/50 group-hover:text-white/90 transition-colors duration-500 mb-4">
                          {project.title}
                        </p>

                        {/* Coming Soon badge */}
                        <motion.div 
                          className={`px-5 py-2 rounded-full bg-gradient-to-r ${project.gradient} p-[1px] shadow-lg`}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <div className="px-4 py-1.5 rounded-full bg-liwan-bg/90 group-hover:bg-liwan-bg/70 transition-colors duration-500">
                            <span className={`text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} uppercase tracking-widest`}>
                              {direction === 'rtl' ? 'قريباً' : 'Coming Soon'}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="h-16 sm:h-24" />

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="max-w-4xl w-full px-2"
        >
          <div className="relative">
            <motion.div 
              className="relative p-6 xs:p-8 sm:p-12 rounded-2xl sm:rounded-[2rem] overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent" />
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06]" />
              
              <motion.div 
                className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-liwan-green/30 to-transparent rounded-full blur-2xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-liwan-purple/30 to-transparent rounded-full blur-2xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
              />
              
              <motion.div 
                className="absolute top-4 left-6 text-7xl text-white/[0.03] font-serif select-none"
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                "
              </motion.div>

              <p className="relative z-10 text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-medium leading-loose sm:leading-relaxed text-center px-2 sm:px-0">
                {t('projects.quote')}
              </p>

              <div className="mt-8 flex justify-center">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-liwan-green via-liwan-blue to-liwan-purple rounded-full"
                  animate={{ width: [64, 100, 64] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Smooth infinite scroll CSS animation */}
      <style>{`
        @keyframes scrollLTR {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes scrollRTL {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(33.333%);
          }
        }
        
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
