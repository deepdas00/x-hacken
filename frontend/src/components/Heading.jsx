import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const XHackenComponent = () => {
  const canvasRef = useRef(null);

  // 1. Mouse Tracking for GLOBAL Spotlight
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  
  // High-intensity spotlight that tracks across the WHOLE window
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${glowX} ${glowY}, rgba(15, 178, 225, 0.2), transparent 70%)`;


const titleRef = useRef(null); // Add this at the top with your other refs
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      x.set((e.clientX / innerWidth) - 0.5);
      y.set((e.clientY / innerHeight) - 0.5);
    };

    // 2. Droplet Animation Logic
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500; 
    };

    const droplets = [];
    // Colors matching the image: Pink, Cyan, Deep Blue
    const colors = ['#ff2ea1', '#0fb2e1', '#242bf9'];

    class Droplet {
      constructor() { this.init(); }


 init(isFirstLoad = false) {
  if (titleRef.current && canvasRef.current) {
    const rect = titleRef.current.getBoundingClientRect();
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // 1. Calculate the start relative to the canvas
    const relativeXStart = rect.left - canvasRect.left;
    
    // 2. We add a tiny buffer (e.g., 5-10px) to the width 
    // to make sure the drips cover the very end of the 'N'
    const widthBuffer = 1000; 
    const totalWidth = rect.width + widthBuffer;

    // 3. Set the X position
    this.x = relativeXStart + (Math.random() * totalWidth);
  } else {
    this.x = Math.random() * window.innerWidth;
  }

  // Randomize vertical start and speed
  this.y = isFirstLoad ? Math.random() * 500 : -50; 
  this.speed = Math.random() * 2 + 2; // Slightly faster for a "melting" look
  this.len = Math.random() * 120 + 60;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.opacity = Math.random() * 0.4 + 0.2;
  this.width = Math.random() * 2 + 0.8;
}
      draw() {
        ctx.beginPath();
        const g = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.len);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'transparent');
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = g;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.len);
        ctx.stroke();
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.init();
      }
    }

    // Increased droplet count for a denser "melting" look
    for (let i = 0; i < 850; i++) droplets.push(new Droplet());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      droplets.forEach(d => { d.update(); d.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y]);

  return (
    <div className="relative w-full pb-5 flex flex-col items-center justify-center bg-transparent overflow-visible">
      
      {/* GLOBAL SPOTLIGHT - FIXED to the viewport, covers the whole page */}
      <motion.div 
        style={{ background: spotlight }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* THE DROPLETS - Noticeable, glowing, and attractive */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-[65%] left-0 w-full pointer-events-none z-10"
      />

      {/* THE LOGO TITLE */}
   {/* THE LOGO TITLE */}
<div className="relative z-20 select-none">
  <h1 
    ref={titleRef} // ADD THIS REF HERE
    className="text-[60px] sm:text-[80px] md:text-[150px] font-black tracking-tighter leading-[0.7] flex items-center justify-center"
  >
    <span 
      className="text-[#ff2ea1]"
      style={{ filter: "drop-shadow(0px 0px 25px rgba(255,46,161,0.7))" }}
    >
      X-
    </span>
    <span
      className="text-transparent bg-clip-text"
      style={{
        backgroundImage: "linear-gradient(to bottom, #0FB2E1 10%, #242bf9 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      HACKEN
    </span>
  </h1>
</div>

    </div>
  );
};

export default XHackenComponent;