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
  const { pause, resume, touch, isAutoScrolling } = useAutoScroll(scrollContainerRef, direction, 2, 2000);

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
      category: direction === 'rtl' ? 'فعاليات' : 'Events',
      logo: entreforumLogo,
      url: 'https://entreforum.om/',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      hasUrl: true,
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
    <section id="projects" className="section-padding relative overflow-hidden">
      
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

      <div ref={ref} className="container-custom relative z-10 flex flex-col items-center">
        
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
          className="w-full mb-16 sm:mb-20 lg:mb-24 relative z-10"
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
                        className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 object-contain mb-8 mx-auto"
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
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Primary Phone - Front, bigger */}
                      <div className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} top-0 w-[70%] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#1a5c3a] z-10 group-hover:shadow-emerald-900/40 transition-shadow duration-500`}>
                        <div className="absolute inset-0 rounded-2xl border border-white/[0.1] z-20" />
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
        <div className="w-full relative z-20">
          <motion.div 
            className="w-full relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex flex-nowrap gap-5 sm:gap-6 overflow-x-auto py-4 scrollbar-hide"
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
                className="flex-shrink-0 w-[160px] sm:w-[180px] hover:z-30"
              >
                {project.hasUrl ? (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-full min-h-[200px] sm:min-h-[220px] rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-purple-950/60 to-liwan-bg" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <motion.div 
                        className={`absolute top-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} w-20 h-20 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-30 group-hover:opacity-50`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/20 transition-all duration-500" />
                      
                      <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                        <motion.div 
                          className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-xl blur-xl opacity-40`} />
                          <div className="relative w-full h-full rounded-xl bg-white/[0.1] backdrop-blur-md border border-white/[0.1] p-2.5 overflow-hidden">
                            <img src={project.logo} alt={project.title} className="w-full h-full object-contain" />
                          </div>
                        </motion.div>
                        
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">
                          {project.title}
                        </h4>
                        
                        {project.subtitle && (
                          <p className={`text-[10px] sm:text-xs text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-semibold mb-2`}>
                            {project.subtitle}
                          </p>
                        )}
                        
                        <span className="text-[9px] sm:text-[10px] text-white/40 px-2 py-0.5 rounded-full border border-white/10">
                          {project.category}
                        </span>
                        
                        <motion.div 
                          className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white/[0.05] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ExternalLink className="w-3 h-3 text-white/60" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div 
                    className="group relative h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-full min-h-[200px] sm:min-h-[220px] p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] border-dashed backdrop-blur-sm overflow-hidden">
                      
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.08] transition-all duration-700`}
                      />
                      
                      <motion.div
                        className={`absolute top-2 ${direction === 'rtl' ? 'left-2' : 'right-2'} w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-30`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                        <motion.div 
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-[1.5px] mb-3`}
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 3, -3, 0]
                          }}
                          transition={{ duration: 5, repeat: Infinity, delay: index * 0.2 }}
                          whileHover={{ rotate: 12, scale: 1.1 }}
                        >
                          <div className="w-full h-full rounded-xl bg-liwan-bg/90 flex items-center justify-center group-hover:bg-liwan-bg/70 transition-all duration-500">
                            {project.icon && <project.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white/80 transition-colors duration-500" />}
                          </div>
                        </motion.div>

                        <p className="text-xs sm:text-sm font-medium text-white/30 group-hover:text-white/60 transition-colors duration-500 mb-2 line-clamp-1">
                          {project.title}
                        </p>

                        <motion.div 
                          className="px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] group-hover:border-white/15 transition-all duration-500"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <span className="text-[9px] sm:text-[10px] font-semibold text-white/20 group-hover:text-white/50 transition-colors uppercase tracking-wider">
                            {direction === 'rtl' ? 'قريباً' : 'Soon'}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            <div className="text-xs text-white/40 flex items-center gap-2">
              <motion.div 
                className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-liwan-green' : 'bg-white/30'}`}
                animate={isAutoScrolling ? { 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>
                {isAutoScrolling 
                  ? (direction === 'rtl' ? 'تمرير تلقائي' : 'Auto-scrolling')
                  : (direction === 'rtl' ? 'اسحب للتصفح • يستأنف تلقائياً' : 'Drag to browse • Auto-resumes')
                }
              </span>
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
