import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Contact, Award, Utensils, Wifi, Layers, 
  Zap, Cpu, MonitorUp, Users, GlassWater 
} from "lucide-react";




const StatCard = ({ title, desc, icon: Icon, stat }) => {
  return (
    <div
      className="
      relative group 
      p-5 sm:p-6 md:p-8 
      rounded-[20px] sm:rounded-[24px] 
      backdrop-blur-2xl 
      overflow-hidden flex flex-col justify-between shrink-0
      
      w-[260px] sm:w-[300px] md:w-[320px] 
      h-[300px] sm:h-[340px] md:h-[380px] 
      
      border
      "
      style={{ 
        background: "var(--bg-secondary)", 
        borderColor: "var(--border-default)",
      }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] sm:rounded-[23px] pointer-events-none" 
        style={{ 
          background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent)" 
        }}
      />

      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "var(--gradient-cyan-purple)" }}
      />

      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          
          {/* Icon */}
          <div 
            className="p-2 sm:p-3 rounded-xl border transition-colors duration-300"
            style={{ 
              background: "color-mix(in srgb, var(--color-accent) 5%, var(--bg-main))",
              borderColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" 
            }}
          >
            <Icon className="text-[var(--color-accent-light)] w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Badge */}
          <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[var(--text-muted)] uppercase bg-white/[0.01] px-2 py-0.5 rounded border border-white/[0.03]">
            Verified
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[var(--text-primary)] font-bold text-lg sm:text-xl tracking-tight mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm font-light leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Bottom Stat */}
      <div className="text-lg sm:text-xl font-black tracking-tighter text-[var(--text-primary)] font-mono border-t border-white/[0.03] pt-3 sm:pt-4">
        {stat}
      </div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger);

const EventFacilities = () => {


    const facilitiesData = [
    { title: "ID Card Access", desc: "Secure physical access credentials provided instantly at checkpoint check-in arrays.", icon: Contact, stat: "SECURE PERMIT" },
    { title: "Credential Certification", desc: "Official processing of production verification certificates for all active squad participants.", icon: Award, stat: "ALL HANDS CERT" },
    { title: "Operational Fueling", desc: "Continuous distribution of vegetarian and non-vegetarian deep sprint macro meal bundles.", icon: Utensils, stat: "VEG & NON-VEG" },
    { title: "High-Speed Pipeline", desc: "Enterprise-grade gigabit wireless networking matrices deployed across all workspace cells.", icon: Wifi, stat: "10 GBPS WIFI" },
    { title: "Staging Frameworks", desc: "Premium, ergonomic multi-node staging tables and deployment chairs assigned per squad setup.", icon: Layers, stat: "PRO WORKSPACE" },
    { title: "Power Subsystems", desc: "Isolated multi-socket electrical grids routed directly into localized workstation loops.", icon: Zap, stat: "240V BACKUP" },
    { title: "Expert Guidance", desc: "Direct live debugging queues connected straight to industry engineering veterans and architects.", icon: Cpu, stat: "1:1 MENTORSHIP" },
    { title: "Screen Casting Staging", desc: "Broadcast software instances live onto massive presentation displays for review array evaluation.", icon: MonitorUp, stat: "4K PROJECTORS" },
    { title: "Dedicated Team Nodes", desc: "Configured individual build zones designed to foster optimized development sync conditions.", icon: Users, stat: "TEAM SQUAD BAY" },
    { title: "Hydration Stations", desc: "Continuous replenishment centers stocked with purified drinking supplies and snacks.", icon: GlassWater, stat: "INFINITE REFRESH" }
  ];
  
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

useEffect(() => {
  const section = sectionRef.current;
  const container = containerRef.current;

  if (!container) return;

  const totalWidth = container.scrollWidth;
  const screenWidth = window.innerWidth;
  const scrollDistance = totalWidth - screenWidth;

  const isMobile = window.innerWidth < 768;
   // ❌ STOP GSAP on mobile
  if (isMobile) return;

  const ctx = gsap.context(() => {
    gsap.to(container, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance * (isMobile ? 0.8 : 1)}`, // 🔥 slower on mobile
        scrub: isMobile ? 2 : 1.5, // smoother mobile
        pin: true,
        anticipatePin: 1,
      },
    });
  });

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="relative w-full">

      {/* SCROLL SPACE (important but invisible) */}
      <div className="relative">

        <div className="sticky top-0 pt-20 flex flex-col justify-center overflow-hidden">

          {/* HEADER */}
           <div className="text-center mb-10 relative overflow-visible">
            <h2 className="text-3xl md:text-5x font-black text-white">
              INSIGHTS
            </h2>
            <p className="text-xs text-gray-400 max-w-md mt-2">
              Every workspace vector is optimized for performance & comfort.
            </p>
          </div>

          {/* DESKTOP and mobile HORIZONTAL */}
         <div className="hidden sm:flex items-center overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-6 px-6 sm:px-10 "
            >
              {facilitiesData.map((item, i) => (
                <StatCard key={i} {...item} />
              ))}
            </div>
          </div>
         <div className="flex sm:hidden items-center overflow-hidden ">
            <div
              
              className="flex gap-6 px-6 sm:px-10 y-scroll overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
            >
              {facilitiesData.map((item, i) => (
                <StatCard key={i} {...item} />
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default EventFacilities;