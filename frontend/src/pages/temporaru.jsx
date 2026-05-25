import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Trophy, Users, Calendar, ArrowRight, Code, Cpu, Globe } from 'lucide-react';
import * as THREE from 'three';

// --- 1. NEW DYNAMIC BACKGROUND: PARTICLE SWARM ---
const ParticleBackground = () => {
  const count = 1500;
  const mesh = useRef();
  
  // Create a randomized "cloud" of positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#22c55e"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// --- 2. THE FLOATING CORE (Replaces the single sphere) ---
const TechCore = () => {
  const mesh = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.z = time * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial 
          color="#16a34a" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </Float>
  );
};

// --- 3. REFINED FEATURE CARD (Glassmorphism) ---
const FeatureCard = ({ title, desc, icon: Icon, stat, color = "green" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="group relative h-80 w-full rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 transition-colors hover:bg-white/[0.06]"
    >
      <div style={{ transform: "translateZ(60px)" }} className="h-full flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="text-green-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
        <div className="text-4xl font-black text-white/20 group-hover:text-green-500 transition-colors">
          {stat}
        </div>
      </div>
    </motion.div>
  );
};

const GendeltaPage = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden">
      
      {/* 3D Visual Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#22c55e" intensity={2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ParticleBackground />
          <TechCore />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-sm rotate-45" />
            <span className="text-2xl font-black tracking-tighter">X<span className="text-green-500">-hacken</span></span>
          </div>
          <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-green-500 transition">Initiatives</a>
            <a href="#" className="hover:text-green-500 transition">Hackathon</a>
            <a href="#" className="hover:text-green-500 transition">Archive</a>
          </div>
          <button className="border border-white/20 hover:border-green-500 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-green-500 hover:text-black">
            Portal Login
          </button>
        </nav>

        <main className="max-w-7xl mx-auto px-8">
          {/* Hero Section */}
          <section className="pt-20 pb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="inline-block px-4 py-1 border border-green-500/30 rounded-full text-green-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 bg-green-500/5">
                Next Event: Lorem ipsum dolor sit amet consectetur.
              </div>
              <h1 className="text-7xl md:text-[120px] leading-[0.85] font-black tracking-tighter mb-10">
                X-HACKEN<br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">FUTURE.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, provident illum amet repudiandae voluptatibus ad at cupiditate sit harum nulla mollitia deleniti consectetur sequi suscipit.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-green-500 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all">
                  APPLY FOR HACKATHON <ArrowRight size={20} />
                </button>
                <button className="bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">
                  VIEW SPONSORS
                </button>
              </div>
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-40">
            <FeatureCard 
              title="Global Network" 
              desc="Connect with 500+ builders from top engineering schools and tech companies." 
              icon={Globe} 
              stat="50+ Hubs" 
            />
            <FeatureCard 
              title="Compute Credits" 
              desc="Every participant receives $500 in cloud credits to power high-intensity AI models." 
              icon={Cpu} 
              stat="$250k" 
            />
            <FeatureCard 
              title="Fast Ship" 
              desc="We don't do slide decks. You ship functional code that works at scale." 
              icon={Code} 
              stat="48H" 
            />
          </section>
        </main>

        <footer className="py-20 border-t border-white/5 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-gray-500 text-sm">© 2026 GENDELTA COLLECTIVE. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-green-500">Twitter</a>
              <a href="#" className="hover:text-green-500">Discord</a>
              <a href="#" className="hover:text-green-500">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GendeltaPage;