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
    <section ref={container} className="relative h-[200vh] bg-[#020202] py-20 overflow-hidden">
      <div className="absolute inset-0 z-20 pointer-events-none">
  <div className="absolute top-0 w-full h-32 backdrop-blur-xl bg-gradient-to-b from-[#020202] via-transparent to-[#020202] " style={{ maskImage: 'linear-gradient(to top, transparent, black)' }} />
  <div className="absolute bottom-0 w-full h-32 backdrop-blur-xl bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
</div>
      {/* Overlay Text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm p-12 rounded-[60px] border border-white/5 text-center">
            <h4 className="text-green-500 text-[10px] uppercase tracking-[0.5em] font-black mb-4">The Archives</h4>
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8]">
                X-HACKEN<br/>MEMORIES
            </h2>
        </div>
      </div>

      <div className="flex justify-center gap-8 h-full opacity-30">
        <ParallaxColumn baseVelocity={-2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
        <ParallaxColumn baseVelocity={2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
        <ParallaxColumn baseVelocity={-3} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />

         <ParallaxColumn baseVelocity={2} velocityFactor={velocityFactor} images={["https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180","https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180", "https://tse4.mm.bing.net/th/id/OIP.13v4Ij4Snnff05qVruJYpAHaFw?pid=Api&P=0&h=180"]} />
      </div>
    </section>
  );
};

const ParallaxColumn = ({ images, baseVelocity = 100, velocityFactor }) => {
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
    <div className="flex flex-col gap-8 w-1/3 min-w-[300px]">
      <div ref={columnRef} className="flex flex-col gap-8">
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative aspect-[3/4] rounded-[40px] overflow-hidden border border-white/10 group">
            <img src={src} className="w-full h-full object-cover grayscale-25 transition-all group-hover:grayscale-0 group-hover:scale-105" alt="memory" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGallery;