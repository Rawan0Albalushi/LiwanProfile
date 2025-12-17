import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { 
  ExternalLink, Code2, Rocket, Zap, Layers, Building2, ArrowUpRight, Globe, Sparkles,
  ShoppingCart, Users, Briefcase, GraduationCap, Heart, Camera, Music, Gamepad2,
  Plane, Coffee, BookOpen, Palette
} from 'lucide-react';
import nahjLogo from '../assets/images/nahj.png';
import nahjScreen1 from '../assets/images/nahj1.jpg';
import nahjScreen2 from '../assets/images/nahj2.jpg';
import entreforumLogo from '../assets/images/entreforum.png';
import entreforumBg from '../assets/images/entreforum-back.png';

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

// Custom hook for auto-scroll using scrollBy for better RTL support
const useAutoScroll = (containerRef, direction, speed = 1, pauseDelay = 2500) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollDirectionRef = useRef(1); // 1 = scroll forward, -1 = scroll backward

  useEffect(() => {
    // Start the auto-scroll interval after a delay
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const el = containerRef.current;
        
        if (!el) return;
        
        if (isPausedRef.current) {
          setIsAutoScrolling(false);
          return;
        }

        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        const currentScroll = Math.abs(el.scrollLeft);
        const isRTL = direction === 'rtl';
        
        // Check boundaries and reverse direction
        if (currentScroll >= maxScroll - 5) {
          scrollDirectionRef.current = -1;
        } else if (currentScroll <= 5) {
          scrollDirectionRef.current = 1;
        }

        // Use scrollBy for consistent behavior
        const scrollAmount = speed * scrollDirectionRef.current;
        
        if (isRTL) {
          // In RTL, positive scrollBy moves content left (shows more from right)
          el.scrollBy({ left: -scrollAmount, behavior: 'auto' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'auto' });
        }

        setIsAutoScrolling(true);
      }, 20); // ~50fps for smoother animation
    }, 800);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [direction, speed, containerRef]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    setIsAutoScrolling(false);
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, pauseDelay);
  }, [pauseDelay]);

  const touch = useCallback(() => {
    pause();
    resume();
  }, [pause, resume]);

  return { pause, resume, touch, isAutoScrolling };
};

const Projects = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Use auto-scroll hook - speed: 2px/frame (~100px/sec), pause delay: 2 seconds
  const { pause, resume, touch } = useAutoScroll(scrollContainerRef, direction, 2, 2000);

  // Event handlers for pausing auto-scroll on user interaction
  const handleMouseDown = () => pause();
  const handleMouseUp = () => resume();
  const handleMouseLeave = () => resume();
  const handleTouchStart = () => pause();
  const handleTouchEnd = () => resume();
  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (container && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      container.scrollLeft += e.deltaY;
    }
    touch();
  };
  const handleScroll = () => {}; // Don't pause on programmatic scroll

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
      id: 3,
      title: direction === 'rtl' ? 'متجر إلكتروني' : 'E-Commerce',
      icon: ShoppingCart,
      gradient: 'from-cyan-400 to-blue-600',
      comingSoon: true,
    },
    {
      id: 4,
      title: direction === 'rtl' ? 'منصة تعليمية' : 'EdTech Platform',
      icon: GraduationCap,
      gradient: 'from-amber-400 to-orange-600',
      comingSoon: true,
    },
    {
      id: 5,
      title: direction === 'rtl' ? 'تطبيق صحي' : 'Health App',
      icon: Heart,
      gradient: 'from-rose-400 to-pink-600',
      comingSoon: true,
    },
    {
      id: 6,
      title: direction === 'rtl' ? 'نظام إداري' : 'Management System',
      icon: Briefcase,
      gradient: 'from-indigo-400 to-purple-600',
      comingSoon: true,
    },
    {
      id: 7,
      title: direction === 'rtl' ? 'منصة اجتماعية' : 'Social Platform',
      icon: Users,
      gradient: 'from-teal-400 to-emerald-600',
      comingSoon: true,
    },
    {
      id: 8,
      title: direction === 'rtl' ? 'تطبيق سفر' : 'Travel App',
      icon: Plane,
      gradient: 'from-sky-400 to-blue-600',
      comingSoon: true,
    },
    {
      id: 9,
      title: direction === 'rtl' ? 'منصة إبداعية' : 'Creative Platform',
      icon: Palette,
      gradient: 'from-fuchsia-400 to-purple-600',
      comingSoon: true,
    },
    {
      id: 10,
      title: direction === 'rtl' ? 'تطبيق ترفيهي' : 'Entertainment',
      icon: Gamepad2,
      gradient: 'from-green-400 to-emerald-600',
      comingSoon: true,
    },
    {
      id: 11,
      title: direction === 'rtl' ? 'منصة موسيقى' : 'Music Platform',
      icon: Music,
      gradient: 'from-red-400 to-rose-600',
      comingSoon: true,
    },
    {
      id: 12,
      title: direction === 'rtl' ? 'مكتبة رقمية' : 'Digital Library',
      icon: BookOpen,
      gradient: 'from-yellow-400 to-amber-600',
      comingSoon: true,
    },
    {
      id: 13,
      title: direction === 'rtl' ? 'استوديو تصوير' : 'Photo Studio',
      icon: Camera,
      gradient: 'from-slate-400 to-zinc-600',
      comingSoon: true,
    },
    {
      id: 14,
      title: direction === 'rtl' ? 'مقهى ذكي' : 'Smart Cafe',
      icon: Coffee,
      gradient: 'from-orange-400 to-amber-600',
      comingSoon: true,
    },
    {
      id: 15,
      title: direction === 'rtl' ? 'عقارات' : 'Real Estate',
      icon: Building2,
      gradient: 'from-blue-400 to-indigo-600',
      comingSoon: true,
    },
    {
      id: 16,
      title: direction === 'rtl' ? 'ابتكارات' : 'Innovations',
      icon: Sparkles,
      gradient: 'from-violet-400 to-purple-600',
      comingSoon: true,
    },
    {
      id: 17,
      title: direction === 'rtl' ? 'تقنيات' : 'Technologies',
      icon: Zap,
      gradient: 'from-lime-400 to-green-600',
      comingSoon: true,
    },
    {
      id: 18,
      title: direction === 'rtl' ? 'منصة متعددة' : 'Multi Platform',
      icon: Layers,
      gradient: 'from-pink-400 to-rose-600',
      comingSoon: true,
    },
    {
      id: 19,
      title: direction === 'rtl' ? 'مشروع فضائي' : 'Space Project',
      icon: Rocket,
      gradient: 'from-purple-400 to-indigo-600',
      comingSoon: true,
    },
    {
      id: 20,
      title: direction === 'rtl' ? 'مشروع مميز' : 'Special Project',
      icon: Code2,
      gradient: 'from-emerald-400 to-teal-600',
      comingSoon: true,
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
              <div className="relative z-10 pt-4 pb-8 px-8 sm:pt-5 sm:pb-10 sm:px-10 lg:pt-6 lg:pb-12 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
                  
                  {/* Content Side - 3 columns */}
                  <div className={`lg:col-span-3 flex flex-col items-center justify-center ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Text Content Container - max-w-[520px] */}
                    <div className="max-w-[520px] text-center flex flex-col items-center">
                      
                      {/* Logo */}
                      <img 
                        src={featuredProject.logo} 
                        alt={featuredProject.title} 
                        className="w-48 h-auto sm:w-56 lg:w-72 mb-8 mx-auto drop-shadow-2xl"
                      />
                      
                      {/* Eyebrow / Title */}
                      <h3 className="text-emerald-400 text-xl sm:text-2xl lg:text-3xl font-bold">
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
                      <button className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:shadow-emerald-800/50 hover:-translate-y-0.5">
                        <span>{direction === 'rtl' ? 'زيارة المنصة' : 'Visit Platform'}</span>
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Mockup Side - 2 columns - Stacked Phones */}
                  <div className={`lg:col-span-2 relative flex items-center justify-center ${direction === 'rtl' ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}>
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[380px] sm:h-[440px]">
                      
                      {/* Secondary Phone - Behind, smaller, with blur */}
                      <div className={`absolute ${direction === 'rtl' ? 'right-0' : 'left-0'} top-8 w-[55%] aspect-[9/19] rounded-2xl overflow-hidden shadow-xl shadow-black/40 bg-[#1a5c3a] opacity-60 blur-[1px]`}>
                        <div className="absolute inset-0 rounded-2xl border border-white/[0.06] z-20" />
                        <img 
                          src={nahjScreen1} 
                          alt="Nahj Platform Splash Screen" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Primary Phone - Front, bigger */}
                      <div className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} top-0 w-[70%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#1a5c3a] z-10 group-hover:shadow-emerald-900/40 transition-shadow duration-500`}>
                        <div className="absolute inset-0 rounded-2xl border border-white/[0.1] z-20" />
                        <img 
                          src={nahjScreen2} 
                          alt="Nahj Platform Interface" 
                          className="w-full h-full object-contain"
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
        <div className="w-full relative z-10 overflow-visible">
          <motion.div 
            className="w-full relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-liwan-bg via-liwan-bg/80 to-transparent z-20 pointer-events-none" />

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex flex-nowrap gap-6 sm:gap-8 overflow-x-scroll py-6 px-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              onScroll={handleScroll}
            >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-[200px] sm:w-[240px] relative"
                onMouseEnter={pause}
                onMouseLeave={resume}
              >
                {project.hasUrl ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group cursor-pointer relative"
                  >
                    <div className="relative h-full min-h-[320px] sm:min-h-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-500 ring-2 ring-transparent group-hover:ring-purple-400/60">
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
                      <div className="absolute inset-0 rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500" />
                      <div className="absolute inset-[1px] rounded-3xl border border-white/5" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                      
                      <div className="relative z-10 h-full p-5 sm:p-6 pt-6 sm:pt-8 flex flex-col items-center justify-start text-center">
                        {/* Logo */}
                        <motion.div 
                          className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 flex items-center justify-center"
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
                        
                        {/* Title */}
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1 drop-shadow-lg">
                          {project.title}
                        </h4>
                        
                        {/* Subtitle with gradient */}
                        {project.subtitle && (
                          <p className={`text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-bold drop-shadow-lg`}>
                            {project.subtitle}
                          </p>
                        )}
                        
                        <div className="h-4" />
                        
                        {/* Description */}
                        {project.description && (
                          <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        )}
                        
                        <div className="h-5" />
                        
                        {/* Live/Coming Soon badge */}
                        {project.isLive ? (
                          <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {direction === 'rtl' ? 'مباشر' : 'Live'}
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium">
                            {direction === 'rtl' ? 'قريباً' : 'Coming Soon'}
                          </span>
                        )}
                        
                        {/* Visit indicator */}
                        <div 
                          className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="group relative h-full cursor-default">
                    <div className="relative h-full min-h-[320px] sm:min-h-[380px] rounded-3xl overflow-hidden shadow-xl shadow-black/20 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] ring-2 ring-transparent group-hover:ring-purple-500/40 transition-all duration-500">
                      
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
                      <div className="absolute inset-0 rounded-3xl border border-white/[0.08] group-hover:border-white/25 transition-all duration-500" />
                      <div className="absolute inset-[1px] rounded-3xl border border-dashed border-white/[0.04] group-hover:border-white/10 transition-all duration-500" />
                      
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
          </motion.div>
        </div>

        <div className="h-16 sm:h-24" />

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="max-w-4xl w-full"
        >
          <div className="relative">
            <motion.div 
              className="relative p-10 sm:p-12 rounded-[2rem] overflow-hidden"
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

              <p className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white/90 font-medium leading-relaxed text-center">
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

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
