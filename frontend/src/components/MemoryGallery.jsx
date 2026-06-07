import React, { useRef } from 'react';
import { 
  useScroll, 
  useVelocity, 
  useSpring, 
  useTransform, 
  useAnimationFrame 
} from 'framer-motion';

const MemoryGallery = () => {
  const container = useRef(null);
  
  // Track Scroll Progress & Velocity
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Smooth out velocity changes to keep animation buttery smooth
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300
  });

  // Map velocity to a multiplier (Kept lower so user scroll doesn't aggressively speed it up)
  const velocityFactor = useTransform(smoothVelocity, [-10, 10], [-2, 2]);

  // Premium placeholder imagery - Replace with your X-Hacken event assets
  const column1 = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600"
  ];
  
  const column2 = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600"
  ];

  return (
    <section 
      ref={container} 
      className="relative h-[150vh] sm:h-[180vh] md:h-[220vh] bg-[#020203] overflow-hidden flex items-center justify-center select-none"
    >
      {/* High-End Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyberpunk Top & Bottom Edge Masking Overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020203] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020203] to-transparent z-20 pointer-events-none" />

      {/* --- CENTER FLOATING GLASSMORPHISM CARD --- */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4">
        <div className="bg-[#09090b]/50 backdrop-blur-xl px-8 py-10 md:px-10 md:py-8 rounded-3xl border border-white/10 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 leading-none">
            X-HACKEN
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mt-1">
            MEMORIES
          </h3>
          <p className="text-zinc-500 font-mono text-[10px] md:text-xs mt-4 tracking-normal max-w-xs mx-auto">
            Capsules of innovation, syntax, and execution captured in high-density runtime.
          </p>
        </div>
      </div>

      {/* --- PARALLAX COLUMNS GRID --- */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-6 md:gap-8 w-full h-full max-w-7xl mx-auto opacity-20 px-2 sm:px-6">
        
        {/* Track 1: Slow Drift Up */}
        <ParallaxColumn 
          images={column1} 
          baseVelocity={-0.4} 
          velocityFactor={velocityFactor} 
          className="flex"
        />

        {/* Track 2: Slow Drift Down */}
        <ParallaxColumn 
          images={column2} 
          baseVelocity={0.3} 
          velocityFactor={velocityFactor} 
          className="flex"
        />

        {/* Track 3: Slow Drift Up */}
        <ParallaxColumn 
          images={column1} 
          baseVelocity={-0.5} 
          velocityFactor={velocityFactor} 
          className="flex"
        />

        {/* Track 4: Slow Drift Down */}
        <ParallaxColumn 
          images={column2} 
          baseVelocity={0.4} 
          velocityFactor={velocityFactor} 
          className="hidden lg:flex"
        />

      </div>
    </section>
  );
};

const ParallaxColumn = ({ images, baseVelocity = 1, velocityFactor, className }) => {
  const baseY = useRef(0);
  const columnRef = useRef(null);

  const loopImages = [...images, ...images, ...images];

  useAnimationFrame((t, delta) => {
    // Divided frame ticks more gracefully to significantly cut velocity speed parameters
    let moveBy = baseVelocity * (delta / 100);

    // Inject scaled mouse scroll physics
    moveBy += moveBy * velocityFactor.get();

    baseY.current += moveBy;
    
    // Bounds wrapping logic calculated securely on exact clean 33.33% loops
    if (baseY.current <= -33.33) {
      baseY.current = 0;
    } else if (baseY.current >= 0) {
      baseY.current = -33.33;
    }

    if (columnRef.current) {
      columnRef.current.style.transform = `translateY(${baseY.current}%)`;
    }
  });

  return (
    <div className={`flex-col w-full overflow-hidden ${className}`}>
      <div ref={columnRef} className="flex flex-col gap-4 sm:gap-6 md:gap-8 will-change-transform">
        {loopImages.map((src, i) => (
          <div 
            key={i} 
            className="relative w-full aspect-[3/4] rounded-2xl md:rounded-[28px] overflow-hidden border border-white/[0.06] bg-zinc-900/40 group shadow-lg"
          >
            <div className="absolute inset-0 z-10 border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 rounded-2xl md:rounded-[28px] pointer-events-none" />
            
            <img 
              src={src} 
              alt="Hackathon Memory"
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out " 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGallery;