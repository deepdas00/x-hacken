import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useVelocity, 
  useSpring, 
  useAnimationFrame 
} from 'framer-motion';

const MemoryGallery = () => {
  const container = useRef(null);
  
  // 1. Track Scroll Progress & Velocity
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  
  // 2. Smooth out the velocity so the speed boost isn't "jerky"
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // 3. Map velocity to a multiplier (e.g., scrolling fast makes it go up to 5x faster)
  const velocityFactor = useTransform(smoothVelocity, [0, 10], [1, 5]);

  return (
  <section 
  ref={container} 
  className="relative 
  h-[160vh] md:h-[200vh] 
  bg-[#020202] 
  py-10 sm:py-16 md:py-20 
  overflow-hidden"
>
      <div className="absolute inset-0 z-20 pointer-events-none">
  <div className="absolute top-0 w-full h-32 backdrop-blur-xl bg-gradient-to-b from-[#020202] via-transparent to-[#020202] " style={{ maskImage: 'linear-gradient(to top, transparent, black)' }} />
  <div className="absolute bottom-0 w-full h-32 backdrop-blur-xl bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
</div>
      {/* Overlay Text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
  <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/5 text-center">

    <h4 className="text-green-500 text-[5px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black mb-2 sm:mb-4">
      The Archives
    </h4>

    <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[0.9]">
      X-HACKEN<br/>MEMORIES
    </h2>

  </div>
</div>

<div className="flex justify-center gap-3 sm:gap-6 md:gap-8 h-full opacity-30 px-2 sm:px-4">
        <ParallaxColumn
        className="hidden sm:flex w-1/3 md:w-1/3 lg:w-1/4"
        baseVelocity={-2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
        <ParallaxColumn
        className="flex w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4"
        baseVelocity={2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
        <ParallaxColumn
        
         className="flex md:flex w-1/3 lg:w-1/4"
         baseVelocity={-3} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />

         <ParallaxColumn 
         className=" lg:flex w-1/4"
         baseVelocity={2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
      </div>
    </section>
  );
};

const ParallaxColumn = ({ images, baseVelocity = 100, velocityFactor, className }) => {
  const baseX = useRef(0);
  const columnRef = useRef(null);

  // useAnimationFrame runs every frame (60fps) to create the "Auto-Movie" effect
  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 2800);

    // This adds the "Speed increase on scroll" logic
    moveBy += moveBy * velocityFactor.get();

    baseX.current += moveBy;
    
    // Looping logic (adjust percentage based on content length)
    if (baseX.current <= -50) baseX.current = 0;
    if (baseX.current >= 0) baseX.current = -50;

    if (columnRef.current) {
      columnRef.current.style.transform = `translateY(${baseX.current}%)`;
    }
  });

return (
  <div className={`flex flex-col gap-4 sm:gap-6 md:gap-8 ${className}`}>
    
    <div ref={columnRef} className="flex flex-col gap-4 sm:gap-6 md:gap-8">

      {[...images, ...images].map((src, i) => (
        <div 
          key={i} 
          className="
          relative 
          aspect-[3/4] 
          rounded-[20px] sm:rounded-[30px] md:rounded-[40px] 
          overflow-hidden 
          border border-white/10 
          group
          "
        >
          <img 
            src={src} 
            className="
            w-full h-full object-cover 
            transition-all duration-500
            grayscale-0 sm:grayscale-[0.3] 
            group-hover:grayscale-0 group-hover:scale-105
            " 
          />
        </div>
      ))}

    </div>
  </div>
);
};

export default MemoryGallery;