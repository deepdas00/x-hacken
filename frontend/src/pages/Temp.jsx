import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy, Users, Calendar, ArrowRight, Code, Cpu, Globe, Zap } from 'lucide-react';
import * as THREE from 'three';

// --- 1. INTENSIFIED PARTICLE SYSTEM ---
const InteractiveSwarm = () => {
  const mesh = useRef();
  const count = 2500; // Increased density

  const [particles, step] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
      s[i] = Math.random();
    }
    return [p, s];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    // Particles "breathe"
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      mesh.current.geometry.attributes.position.array[i3 + 1] += Math.sin(time + step[i]) * 0.002;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#22c55e" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// --- 2. THE FLOATING "X" WIREFRAME ---
const XLogo3D = () => {
  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
      <group rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <boxGeometry args={[0.2, 5, 0.2]} />
          <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 5, 0.2]} />
          <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
};

// --- 3. UI COMPONENTS ---
const StatCard = ({ title, desc, icon: Icon, stat }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <Icon className="text-green-500 mb-6" size={28} />
      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{desc}</p>
      <div className="text-3xl font-black tracking-tight text-white">{stat}</div>
    </motion.div>
  );
};

const XHackenPage = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-green-500/40">
      
      {/* 3D Visual Engine */}
      <div className="fixed inset-0 z-0 bg-radial-gradient">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#22c55e" />
          
          <Stars radius={50} count={3000} factor={4} fade speed={1} />
          <InteractiveSwarm />
          <XLogo3D />

          {/* This makes everything GLOW like the reference image */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Interface Layer */}
      <div className="relative z-10">
        <nav className="flex justify-between items-center px-10 py-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <Zap className="text-green-500 fill-green-500" size={24} />
            <span className="text-2xl font-black tracking-tighter">X<span className="text-green-500">-hacken</span></span>
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              <a href="#" className="hover:text-green-500 transition">Tracks</a>
              <a href="#" className="hover:text-green-500 transition">Mentors</a>
              <a href="#" className="hover:text-green-500 transition">Schedule</a>
            </div>
            <button className="bg-green-500 text-black font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Register Now
            </button>
          </div>
        </nav>

        <header className="pt-32 pb-40 px-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Applications Open
            </div>
            
            <h1 className="text-8xl md:text-[180px] font-black tracking-tighter leading-[0.8] mb-8">
              X-HACKEN
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              The premier 48H engineering sprint by CSA dept. <br/>
              <span className="text-white">Build the infrastructure of the new web.</span>
            </p>

            <div className="flex justify-center gap-6">
              <button className="group flex items-center gap-3 bg-white text-black px-12 py-6 rounded-2xl font-black text-lg transition-all hover:bg-green-500">
                GET STARTED <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </header>

        <section className="max-w-7xl mx-auto px-10 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              icon={Trophy} 
              title="Global Prize Pool" 
              desc="Equity, grants, and cash for the top engineering squads."
              stat="$250,000+"
            />
            <StatCard 
              icon={Users} 
              title="Elite Builders" 
              desc="Join a curated cohort of the world's most talented developers."
              stat="500 Limit"
            />
            <StatCard 
              icon={Cpu} 
              title="Compute Access" 
              desc="High-performance H100 clusters provided for all AI tracks."
              stat="Unlimited"
            />
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-bold">
            Engineering Excellence // GenDelta Studio 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default XHackenPage;