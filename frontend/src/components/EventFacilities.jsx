import React, { useRef } from "react";
// Crucial: Import the motion element itself alongside your hooks!
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Contact, Award, Utensils, Wifi, Layers, 
  Zap, Cpu, MonitorUp, Users, GlassWater 
} from "lucide-react";

const StatCard = ({ title, desc, icon: Icon, stat }) => {
  return (
    <div
      className="relative group p-8 rounded-[24px] backdrop-blur-2xl overflow-hidden flex flex-col justify-between shrink-0 w-[320px] h-[380px] border"
      style={{ 
        background: "var(--bg-secondary)", 
        borderColor: "var(--border-default)",
      }}
    >
      {/* Background Interactive Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[23px] pointer-events-none" 
        style={{ 
          background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent)" 
        }}
      />
      
      {/* Top Accent Highlight Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "var(--gradient-cyan-purple)" }}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div 
            className="p-3 rounded-xl border transition-colors duration-300"
            style={{ 
              background: "color-mix(in srgb, var(--color-accent) 5%, var(--bg-main))",
              borderColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" 
            }}
          >
            <Icon className="text-[var(--color-accent-light)]" size={22} />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase bg-white/[0.01] px-2.5 py-0.5 rounded border border-white/[0.03]">
            Verified
          </span>
        </div>

        <h3 className="text-[var(--text-primary)] font-bold text-xl tracking-tight mb-2">
          {title}
        </h3>
        
        <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="text-xl font-black tracking-tighter text-[var(--text-primary)] font-mono border-t border-white/[0.03] pt-4">
        {stat}
      </div>
    </div>
  );
};

const EventFacilities = () => {
  const targetRef = useRef(null);
  
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

  // 1. Correctly target the tracking container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  /* 
    2. Dynamic Translation Calculation:
    With 10 items width at 320px + gaps, shifting exactly to "-72%" 
    safely moves your final card right into view before releasing the page lock.
  */
  const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  // 3. Adjusted Spring physics to prevent scroll-skipping or snapping
  const smoothX = useSpring(rawX, {
    stiffness: 60,   
    damping: 22,     
    mass: 0.7        
  });

  return (
    /* Increased track height to h-[400vh] to give the horizontal scroll more "room" to breathe */
    <section ref={targetRef} className="relative h-[100vh]" >
      
      {/* FIXED: Changed `min-w-screen` to `w-screen` to lock layout shifting */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden py-16 px-6 flex flex-col box-border justify-center">
        
        {/* Ambient Lights */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-[0.02] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--color-accent)' }} />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" style={{ background: 'var(--color-primary)' }} />

        <div className="max-w-7xl w-full mx-auto flex flex-col h-full overflow-hidden justify-center">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.02] shrink-0 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }} />
                <p className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
                  Hardware & Support Protocols
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[var(--text-primary)] uppercase flex items-center gap-2">
                INSIGHTS <span className="text-xl tracking-normal">✨</span>
              </h2>
            </div>
            <p className="max-w-md text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              Every workspace vector is optimized to provide squads with maximum processing capability, operational comfort, and deep execution layers.
            </p>
          </div>

          {/* Connected Smooth Horizontal Canvas */}
          <div className="flex-1 flex items-center relative overflow-visible">
            {/* Added will-change-transform to engage GPU acceleration */}
            <motion.div style={{ x: smoothX }} className="flex gap-6 will-change-transform">
              {facilitiesData.map((facility, index) => (
                <StatCard
                  key={index}
                  title={facility.title}
                  desc={facility.desc}
                  icon={facility.icon}
                  stat={facility.stat}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventFacilities;