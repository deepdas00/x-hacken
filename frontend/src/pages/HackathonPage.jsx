import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Code,
  Play,
  Contact ,
  Wifi ,
  MonitorUp ,
  GlassWater ,
  Flag,
  Utensils,
  Cpu,
  Lightbulb,
  Award,
  Globe,
  ChevronRight,
  Zap,
  Laptop,
  MapPin,
  Layers,
} from "lucide-react";
import * as THREE from "three";
import "../style/theme.css";
import MemoryGallery from "../components/MemoryGallery.jsx";
import Heading from "../components/Heading.jsx";
import EventFacilities from "../components/EventFacilities.jsx";
import logo from "../assets/logo.png";
import csa from "../assets/CSA_LOGO.png";
import college from "../assets/xavier-logo.png";

// --- 1. INTENSIFIED PARTICLE SYSTEM ---

const InteractiveSwarm = () => {
  const mesh = useRef();
  const count = 2500;

  // Keep track of the last scroll position to calculate direction
  const lastScrollY = useRef(0);
  // Store the current direction: 1 for upward movement, -1 for downward movement
  const movementDirection = useRef(1);

  const [particles, step] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
      s[i] = 0.01 + Math.random() * 0.02;
    }
    return [p, s];
  }, []);

  useFrame((state) => {
    const positions = mesh.current.geometry.attributes.position.array;
    const currentScrollY = window.scrollY;

    // Detect scroll direction changes
    if (currentScrollY > lastScrollY.current) {
      // User is scrolling DOWN -> Particles move from bottom to top (+1)
      movementDirection.current = 1;
    } else if (currentScrollY < lastScrollY.current) {
      // User is scrolling UP -> Particles move from top to bottom (-1)
      movementDirection.current = -1;
    }
    // Update the last scroll reference for the next frame
    lastScrollY.current = currentScrollY;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const yIndex = i3 + 1;

      // Apply motion based on the current scroll direction multiplier
      positions[yIndex] += step[i] * movementDirection.current;

      // Handle boundaries for BOTH directions seamlessly
      if (movementDirection.current === 1 && positions[yIndex] > 7.5) {
        // Floating up: loop back to bottom
        positions[yIndex] = -7.5;
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;
      } else if (movementDirection.current === -1 && positions[yIndex] < -7.5) {
        // Falling down: loop back to top
        positions[yIndex] = 7.5;
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ff2ea1"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// --- 3. UI COMPONENTS ---
// const StatCard = ({ title, desc, icon: Icon, stat }) => {
//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl"
//     >
//       <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
//       <Icon className="text-green-500 mb-6" size={28} />
//       <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
//       <p className="text-gray-500 text-sm mb-6">{desc}</p>
//       <div className="text-3xl font-black tracking-tight text-white">
//         {stat}
//       </div>
//     </motion.div>
//   );
// };

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

          {/* This makes everything GLOW like the reference image */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              mipmapBlur
              intensity={1.2}
              radius={0.4}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Interface Layer */}
      <div className="relative z-10">
        <nav className="flex justify-between items-center px-10 pt-3 max-w-[1600px] mx-auto">
          <div className="flex items-center">
            <img src={logo} alt="" className="w-27 " />
            <span
              className="text-2xl font-black tracking-tighter"
              style={{ color: "var(--color-secondary)" }}
            >
              X<span className="text-white">-hacken</span>
            </span>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              <a href="#" className="hover:text-green-500 transition">
                Tracks
              </a>
              <a href="#" className="hover:text-green-500 transition">
                Mentors
              </a>
              <a href="#" className="hover:text-green-500 transition">
                Schedule
              </a>
            </div>
            <button className="btn-secondary1 text-white font-black px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform ">
              Register Now
            </button>
          </div>
        </nav>

        <header className="relative pt-5 px-6 md:px-10 max-w-[1500px] mx-auto z-10">
          {/* --- BACKGROUND GLOW & NOISE --- */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto space-y-16 pb-10"
          >
            {/* --- TOP SECTION: STATUS AND TITLE --- */}
            <div className="flex flex-col items-center text-center space-y-7">
              {/* Main Title Section */}
              <div className="relative group flex flex-col items-center">
                <Heading />{" "}
                {/* This component contains the large X-HACKEN and falling drips */}
                {/* Sub-header with horizontal lines to match image */}
                <div className="flex items-center justify-center gap-6 mt-2 w-full">
                  <div className="h-[1px] w-20 bg-green-500/50" />
                  <span className="text-green-500 font-mono text-[11px] tracking-[0.5em] uppercase font-bold">
                    Building . Sprinting . Breaking Limits
                  </span>
                  <div className="h-[1px] w-20 bg-green-500/50" />
                </div>
              </div>

              {/* Hero Paragraph - Centered and limited width */}
              <p className="text-gray-400 text-xl md:text-xl max-w-3xl font-light leading-relaxed px-4">
                The elite{" "}
                <span className="text-white font-bold italic underline decoration-green-500/50 underline-offset-4">
                  6-hour build cycle
                </span>
                . Engineered for those who thrive at the intersection of{" "}
                <span className="text-white font-semibold">AI infra</span> and{" "}
                <span className="text-white font-semibold">
                  decentralized core
                </span>
                .
              </p>

              <div className="w-full flex flex-col items-center justify-center pb-1 select-none bg-transparent z-999">
                {/* Elegant thin top horizontal rule to anchor the section */}
                <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

                {/* Main Brand/Institutional Wrapper */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-8 px-4">
                  {/* Left Side: College Info */}
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src={college}
                      alt="College of Engineering Pune Logo"
                      className="h-16 w-16 object-contain"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        ST XAVIER'S COLLEGE
                      </span>
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        BURDWAN
                      </span>
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        (AUTONOMOUS)
                      </span>
                    </div>
                  </div>

                  {/* Elegant Vertical Divider Line */}
                  <div className="h-14 w-[2px] bg-gradient-to-b from-white/10 via-white/45 to-white/10 mx-1" />

                  {/* Right Side: Department Info */}
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src={csa}
                      alt="Department of Computer Engineering Logo"
                      className="h-16 w-16 object-contain"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        DEPARTMENT OF
                      </span>
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        COMPUTER SCIENCE
                      </span>
                      <span className="text-white font-black text-sm md:text-base tracking-wider leading-tight">
                        AND APPLICATION
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Register Button - Centered */}
              <div className="pt-2">
                <button
                  className="relative group z-888 text-white font-black px-7 py-3 rounded-md text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 border border-[var(--border-strong)]
  
  shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_12px_rgba(255,255,255,0.02)]
  
  shadow-[0_0_30px_rgba(0,229,255,0.25),0_0_50px_rgba(255,46,161,0.2),inset_0_0_15px_rgba(138,43,255,0.2)]
  border-[var(--color-accent)]/50 bg-[#0FB2E1]/30"
                >
                  {/* UNIQUE EFFECT 1: Futuristic Tech Bracket Overlays (Top-Left & Bottom-Right) */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)]  opacity-100 transition-opacity duration-300 " />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-secondary)]  opacity-100 transition-opacity duration-300" />

                  {/* UNIQUE EFFECT 2: Laser Line Scanning Track (Animates across the border on hover) */}
                  <span className="absolute inset-0 opacity-100 transition-opacity duration-500 overflow-hidden rounded-md">
                    <span className="absolute top-0 left-[-100%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent animate-[shimmer_1.5s_infinite]" />
                    <span className="absolute bottom-0 right-[-100%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent animate-[shimmer_1.5s_infinite_reverse]" />
                  </span>

                  {/* UNIQUE EFFECT 3: Liquid Core Aurora Plasma Overlay */}
                  <span className="absolute inset-0 bg-[var(--gradient-main)] opacity-0 group-hover:opacity-15 blur-sm transition-opacity duration-500 scale-95 group-hover:scale-105" />

                  {/* Button Content Layer */}
                  <span className="relative z-10 flex items-center gap-2 ">
                    <span className="bg-[var(--gradient-purple-pink)] -webkit-background-clip-text -webkit-text-fill-color-transparent group-hover:text-white transition-all duration-300">
                      Register
                    </span>
                    <span className="text-white">Now</span>

                    {/* Animated Geometric Arrow */}
                    <span className="relative flex items-center justify-center w-3 h-3 overflow-hidden">
                      <span className="absolute transform translate-x-0 group-hover:translate-x-4 transition-transform duration-300 text-[var(--color-accent)]">
                        →
                      </span>
                      <span className="absolute transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-300 text-[var(--color-secondary)]">
                        →
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* --- BOTTOM SECTION: DATA GRID CARDS --- */}
            {/* --- BOTTOM SECTION: X-HACKEN DATA STRIP --- */}
            <div className="w-full max-w-7xl -translate-y-9 px-4 font-['Inter',_sans-serif]">
              <div className="flex flex-row items-center justify-between gap-6">
                {/* LEFT SIDE CARDS */}
                <div className="flex flex-1 gap-6 justify-end">
                  {[
                    { label: "Date", val: "NOV 24-26", sub: "SAT - SUN - MON" },
                    { label: "Venue", val: "SEMINAR HALL", sub: "TECH PARK" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative p-[1px] rounded-[20px] min-w-[200px] overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Animated Gradient Border */}
                      <div className="absolute inset-0 bg-[var(--border-strong)] group-hover:bg-[var(--gradient-cyan-purple)] transition-colors duration-500" />

                      {/* Card Body */}
                      <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[19px] p-6 backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-accent)]">
                          {item.label}
                        </p>
                        <p className="text-xl font-black text-[var(--text-primary)] mb-1 tracking-tight uppercase">
                          {item.val}
                        </p>
                        <p className="text-[9px] text-[var(--text-muted)] tracking-widest font-medium">
                          {item.sub}
                        </p>

                        {/* Hover Interior Glow */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--color-primary)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CENTER: SCROLL INDICATOR (THEMED) */}
                <div className="flex flex-col items-center px-12 shrink-0">
                  <span className="text-[9px] tracking-[0.5em] uppercase text-[var(--text-secondary)] font-semibold mb-5 whitespace-nowrap">
                    Scroll to Explore
                  </span>
                  <div className="relative flex flex-col items-center">
                    {/* Line with Primary Glow */}
                    <div className="w-[1.5px] h-16 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
                    {/* Glowing Dot using Theme Box Shadow */}
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-white -mt-1.5 z-10"
                      style={{ boxShadow: "var(--glow-primary)" }}
                    />
                  </div>
                </div>

                {/* RIGHT SIDE CARDS */}
                <div className="flex flex-1 gap-6 justify-start">
                  {[
                    {
                      label: "Eligibility",
                      val: "OPEN TECH",
                      sub: "INDIVIDUALS",
                    },
                    {
                      label: "Prizes Pool",
                      val: "₹10000",
                      sub: "TOTAL REWARDS",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative p-[1px] rounded-[20px] min-w-[200px] overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Animated Gradient Border */}
                      <div className="absolute inset-0 bg-[var(--border-strong)] group-hover:bg-[var(--gradient-purple-pink)] transition-colors duration-500" />

                      {/* Card Body */}
                      <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[19px] p-6 backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-secondary)]">
                          {item.label}
                        </p>
                        <p className="text-xl font-black text-[var(--text-primary)] mb-1 tracking-tight uppercase">
                          {item.val}
                        </p>
                        <p className="text-[9px] text-[var(--text-muted)] tracking-widest font-medium">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- BOTTOM DECORATION: SCANLINE EFFECT --- */}
        </header>

        <PrizeSection />

        <LeadershipSection />

        <HackathonRoadmap />
        <TeamMarquee />

        <section className="max-w-8xl mx-auto pb-40">
     
          <EventFacilities/>
          </section>

        <MemoryGallery />

        <footer className="py-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-bold">
            Engineering Excellence // GenDelta Studio 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

const LeadershipSection = () => {
  const presidents = [
    {
      name: "Dr. Alexander Thorne",
      role: "Chancellor / President of CSA",
      img: "https://tse4.mm.bing.net/th/id/OIP.4PJ0qIcbVhJ4-rTi1Q0KYgHaEK?pid=Api&P=0&h=180",
    },
    {
      name: "Prof. Sarah Jenkins",
      role: "Executive Director of Innovation",
      img: "https://tse4.mm.bing.net/th/id/OIP.4PJ0qIcbVhJ4-rTi1Q0KYgHaEK?pid=Api&P=0&h=180",
    },
  ];

  const supportTeam = [
    {
      name: "Alpha",
      role: "Technical Lead",
      img: "https://tse1.mm.bing.net/th/id/OIP.atk55YoyDtPsWz6mGwuxgQHaJ4?pid=Api&P=0&h=180",
      whatsapp: "#",
      linkedin: "#",
    },
    {
      name: "Beta",
      role: "Logistics Head",
      img: "https://tse1.mm.bing.net/th/id/OIP.atk55YoyDtPsWz6mGwuxgQHaJ4?pid=Api&P=0&h=180",
      whatsapp: "#",
      linkedin: "#",
    },
    {
      name: "Gamma",
      role: "Operations",
      img: "https://tse1.mm.bing.net/th/id/OIP.atk55YoyDtPsWz6mGwuxgQHaJ4?pid=Api&P=0&h=180",
      whatsapp: "#",
      linkedin: "#",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-10 py-32 border-t border-white/5 space-y-24">
      {/* ROW 1: THE PRESIDENTS (Wide Glassmorphism) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {presidents.map((pres, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-[40px] bg-white/[0.03] border border-white/10 p-10 flex items-center gap-8 backdrop-blur-xl"
          >
            <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
              <img
                src={pres.img}
                alt={pres.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div>
              <h4 className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-black mb-2">
                University Leadership
              </h4>
              <h3 className="text-3xl font-black tracking-tight text-white mb-1">
                {pres.name}
              </h3>
              <p className="text-green-500 text-sm font-medium">{pres.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ROW 2: SUPPORT CELL (Full Image Background Cards) */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black tracking-tighter">
            SUPPORT COMMAND
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportTeam.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900"
            >
              {/* Background Image */}
              <img
                src={member.img}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt={member.name}
              />

              {/* Gradient Overlay (Darkness at bottom for text legibility) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">
                    {member.name}
                  </h4>
                  <p className="text-green-500 text-xs font-black uppercase tracking-[0.2em] mb-6">
                    {member.role}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <a
                      href={member.whatsapp}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-black rounded-xl font-bold text-xs uppercase tracking-tighter hover:bg-white transition-colors"
                    >
                      <Zap size={14} fill="black" /> WhatsApp
                    </a>
                    <a
                      href={member.linkedin}
                      className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                    >
                      <Globe size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                <span className="text-[8px] font-black text-white uppercase tracking-widest">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMarquee = () => {
  const team = [
    { name: "Alex Riv", role: "Lead Dev", img: "p1.jpg" },
    { name: "Sarah Chen", role: "UI/UX", img: "p2.jpg" },
    { name: "Marcus Vo", role: "Security", img: "p3.jpg" },
    { name: "Elena K.", role: "Ops", img: "p4.jpg" },
    { name: "Jordan P.", role: "AI Track", img: "p5.jpg" },
    { name: "Deep", role: "Founder", img: "p6.jpg" },
  ];

  // We duplicate the array to ensure the loop is seamless
  const fullTeam = [...team, ...team];

  return (
    <section className="py-32 overflow-hidden bg-black relative flex flex-col gap-12">
      <div className="px-10 text-center">
        <h2 className="text-5xl font-black tracking-tighter text-white">
          THE ARCHITECTS
        </h2>
      </div>

      {/* Container for both rows */}
      <div className="flex flex-col gap-8">
        {/* ROW 1: Left to Right (Normal) */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex gap-8 pr-8"
          >
            {fullTeam.map((member, i) => (
              <TeamCard key={`row1-${i}`} member={member} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Right to Left (Reverse) */}
        {/* We use "-50%" to "0%" to make it move in the opposite direction */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex gap-8 pr-8"
          >
            {fullTeam.map((member, i) => (
              <TeamCard key={`row2-${i}`} member={member} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Optional: Side Fades for depth */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

const HackathonRoadmap = () => {
  // PHASE 1: Online / Pre-Event Infrastructure (Left Side)
  const phase1Steps = [
    {
      title: "Registration Open",
      desc: "Form your elite engineering team and lock down your access slots.",
    },
    {
      title: "Open Innovation Theme",
      desc: "Brainstorm and ideate freely across decentralized core and AI engineering tracks.",
    },
    {
      title: "Online Round",
      desc: "Submit your primary concepts, initial codebase architecture, and feasibility metrics.",
    },
    {
      title: "Top 10 Team Selection",
      desc: "The filter phase. Only the highest ranking squads secure a physical invitation.",
    },
  ];

  // PHASE 2: Physical Venue Check-In & Launch (Right Side - Block 1)
  const phase2LaunchSteps = [
    {
      title: "On-Spot Registration",
      desc: "Arrive at the technology park venue, verify credentials, and set up infrastructure.",
    },
    {
      title: "Inauguration Program",
      desc: "Keynote briefings from the leadership team, system rules outline, and matrix setup.",
    },
    {
      title: "Hackathon Starts",
      desc: "The countdown timer triggers. The intense rapid sprint cycle begins execution.",
    },
    {
      title: "Mentorship & Build Session",
      desc: "Refine algorithms with real-time feedback loops from engineering veterans.",
    },
    {
      title: "Veg & Non-Veg Meals",
      desc: "High-octane operational fueling cycles provided directly to team stations.",
    },
  ];

  // PHASE 2: The Deep Sprint & Evaluation Matrix (Right Side - Block 2)
  const phase2BuildSteps = [
    
    {
      title: "Project Submission",
      desc: "Freeze repositories, commit final production codebases, and bundle assets.",
    },
    {
      title: "Judging & Screen Casting",
      desc: "Present live functional software instances on the main display array for audit.",
    },
    {
      title: "Winner Announcement",
      desc: "The review board delivers judgment based on optimization and execution.",
    },
    {
      title: "Certificate & Closing",
      desc: "Distribution of credentials, distribution of awards, and event termination.",
    },
  ];

  return (
    <section
      className="text-[var(--text-secondary)] py-24 px-6 md:px-10 relative overflow-hidden"
      
    >
      {/* Structural Neon Ambient Depth fields */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 opacity-10 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="max-w-8xl mx-auto space-y-12">
        {/* Module Header */}
        <div className="text-center mb-7">
          <h2 className="text-5xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            X-HACKEN 2026 Roadmap
          </h2>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div
              className="h-[1px] w-12"
              style={{ background: "var(--gradient-cyan-purple)" }}
            />
            <p className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">
              Unified 13-Step Operational Timeline
            </p>
            <div
              className="h-[1px] w-12"
              style={{ background: "var(--gradient-purple-pink)" }}
            />
          </div>
        </div>

        {/* --- MASTER DUAL-PANEL LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_66%] gap-12 relative items-start">
          {/* ================= LEFT COLUMN: PHASE I ================= */}
          <div
            className=" p-8 md:p-10 rounded-[32px] relative shadow-2xl h-full "
            style={{
background: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
              borderColor: "var(--border-default)",
            }}
          >
            <div
              className="absolute top-0 right-0 text-[var(--color-secondary-light)] text-[10px] font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-bl-2xl rounded-tr-[31px] border-l border-b border-[var(--border-default)] flex items-center gap-1.5"
              style={{ background: "rgba(255, 46, 161, 0.1)" }}
            >
              <Laptop size={12} /> Phase I
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div
                className="p-4 rounded-2xl text-[var(--color-secondary-light)] border border-[var(--color-primary)]/20"
                style={{ background: "rgba(138, 43, 255, 0.1)" }}
              >
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight uppercase">
                  Online Screening
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
                  Ideation & Filtering Framework
                </p>
              </div>
            </div>



            {/* ================= RIGHT COLUMN: PHASE I (1 DIVS COHESIVELY STACKED) ================= */}




            <div className="space-y-6 relative">
              <div
                className="absolute left-[23px] top-2 bottom-2 w-[0.8px] opacity-30"
                style={{ background: "var(--gradient-purple-pink)" }}
              />

              {phase1Steps.map((step, index) => (

                
                <div key={index} className="flex gap-5 relative group">
                  <div
                    className="w-12 h-12 rounded-full border flex items-center justify-center text-sm font-bold text-[var(--color-secondary-light)] z-10 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--bg-main)",
                      borderColor: "var(--color-primary)",
                      boxShadow: "0 0 10px rgba(138, 43, 255, 0.2)",
                    }}
                  >
                    {`0${index + 1}`}
                  </div>
                  <div className="flex-1 bg-white/[0.01] border border-white/[0.03] hover:border-[var(--border-strong)] p-5 rounded-2xl transition-all duration-300">
                    <h4 className="font-bold text-[var(--text-primary)] text-base tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PHASE II (2 DIVS COHESIVELY STACKED) ================= */}
          <div className=" p-8 md:p-10 rounded-[32px] relative shadow-2xl" 
          
          style={{ 
            background: "color-mix(in srgb, var(--color-secondary) 15%, transparent)",
            borderColor: 'var(--border-default)' }}>
            <div
              className="absolute top-0 right-0 text-[var(--color-accent)] text-[10px] font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-bl-2xl rounded-tr-[31px] border-l border-b border-[var(--border-default)] flex items-center gap-1.5"
              style={{ background: "rgba(0, 229, 255, 0.1)" }}
            >
              <MapPin size={12} /> Phase II • Part A
            </div>

            <div className="flex items-center gap-4 mb-8 ">
              <div
                className="p-4 rounded-2xl text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                style={{ background: "rgba(0, 229, 255, 0.1)" }}
              >
                <Play size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight uppercase">
                  On-Campus Launch
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
                  Deployment Commands
                </p>
              </div>
            </div>

            <div
             className="flex gap-3"
            >
              {/* DIV 1: ON-CAMPUS INITIALIZATION */}
              <div>
                <div className="space-y-6 relative">
                  <div
                    className="absolute left-[23px] top-2 bottom-2 w-[0.5px] opacity-30"
                    style={{ background: "var(--gradient-cyan-purple)" }}
                  />

                  {phase2LaunchSteps.map((step, index) => {
                  const stepNumber = index + 8;
                    const isFuelingStep = stepNumber === 12;
                  return(
                    <div key={index} className="flex gap-5 relative group">
                      <div
                        className="w-12 h-12 rounded-full border flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: "var(--bg-main)",
                          borderColor: isFuelingStep
                              ? "var(--color-secondary-light)"
                              : "var(--border-accent)",
                          boxShadow:isFuelingStep
                              ? "var(--glow-secondary)": "var(--glow-accent)",
                          color: isFuelingStep
                              ? "var(--color-secondary)": "var(--color-accent)"
                        }}


                       
                      >
                        {`0${index + 5}`}
                      </div>
                      <div className="flex-1 bg-white/[0.01] border border-white/[0.03] hover:border-[var(--border-strong)] p-5 rounded-2xl transition-all duration-300">
                        <h4 className="font-bold text-[var(--text-primary)] text-base tracking-tight flex">
                          {step.title} {isFuelingStep && (
                            <Utensils
                              size={20}
                              className="text-[var(--color-secondary-light)] opacity-40 shrink-0 ml-4 hidden sm:block"
                            />
                          )}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] mt-1.5 font-light leading-relaxed">
                          {step.desc}
                        </p>

                        
                      </div>

                      
                    </div>
                  )})}
                
                </div>
              </div>

              {/* DIV 2: CONTINUOUS PRODUCTION EXECUTIONS */}
              <div>
                <div className="space-y-6 relative">
                  <div
                    className="absolute left-[23px] top-2 bottom-2 w-[0.8px] opacity-30"
                    style={{ background: "var(--gradient-cyan-purple)" }}
                  />

                  {phase2BuildSteps.map((step, index) => {
                    const stepNumber = index + 8;
                    const isFuelingStep = stepNumber === 19;

                    return (
                      <div
                        key={index}
                        className="flex gap-5 relative group items-start"
                      >
                        <div
                          className="w-12 h-12 rounded-full border flex items-center justify-center text-sm font-mono font-black z-10 shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                          background: "var(--bg-main)",
                          borderColor: isFuelingStep
                              ? "var(--color-secondary-light)"
                              : "var(--border-accent)",
                          boxShadow:isFuelingStep
                              ? "var(--glow-secondary)": "var(--glow-accent)",
                          color: isFuelingStep
                              ? "var(--color-secondary)": "var(--color-accent)"
                        }}
                        >
                          {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
                        </div>

                        <div className="flex-1 bg-white/[0.01] border border-white/[0.02] hover:border-[var(--border-strong)] p-5 rounded-2xl transition-all duration-300 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-[var(--text-primary)] text-base tracking-tight flex items-center gap-2">
                              {step.title}
                              {isFuelingStep && (
                                <span
                                  className="text-[9px] font-mono tracking-widest border px-2 py-0.5 rounded-full uppercase scale-90"
                                  style={{
                                    color: "var(--color-secondary-light)",
                                    borderColor: "rgba(255, 46, 161, 0.3)",
                                    background: "rgba(255, 46, 161, 0.05)",
                                  }}
                                >
                                  Fueling
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)] mt-1 font-light leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                          {isFuelingStep && (
                            <Utensils
                              size={20}
                              className="text-[var(--color-secondary-light)] opacity-40 shrink-0 ml-4 hidden sm:block"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};



// const StatCard = ({ title, desc, icon: Icon, stat }) => {
//   return (
//     <div
//       className="relative group p-8 rounded-[24px] backdrop-blur-2xl overflow-hidden flex flex-col justify-between shrink-0 w-[320px] h-[380px] border"
//       style={{ 
//         background: "var(--bg-secondary)", 
//         borderColor: "var(--border-default)",
//       }}
//     >
//       {/* Background Interactive Ambient Glow */}
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[23px] pointer-events-none" 
//         style={{ 
//           background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent)" 
//         }}
//       />
      
//       {/* Top Accent Highlight Line */}
//       <div 
//         className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//         style={{ background: "var(--gradient-cyan-purple)" }}
//       />

//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <div 
//             className="p-3 rounded-xl border transition-colors duration-300"
//             style={{ 
//               background: "color-mix(in srgb, var(--color-accent) 5%, var(--bg-main))",
//               borderColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" 
//             }}
//           >
//             <Icon className="text-[var(--color-accent-light)]" size={22} />
//           </div>
//           <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase bg-white/[0.01] px-2.5 py-0.5 rounded border border-white/[0.03]">
//             Verified
//           </span>
//         </div>

//         <h3 className="text-[var(--text-primary)] font-bold text-xl tracking-tight mb-2">
//           {title}
//         </h3>
        
//         <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed">
//           {desc}
//         </p>
//       </div>

//       <div className="text-xl font-black tracking-tighter text-[var(--text-primary)] font-mono border-t border-white/[0.03] pt-4">
//         {stat}
//       </div>
//     </div>
//   );
// };

// const EventFacilities = () => {
//   const targetRef = useRef(null);
  
//   // 1. Monitor track scroll progress
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   // 2. Map scroll progress to horizontal translation array
//   const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

//   // 3. Apply physics parameters to create buttery smooth lag interpolation
//   const smoothX = useSpring(rawX, {
//     stiffness: 50,    // Lower values = slower, smoother spring movement
//     damping: 15,      // Controls bouncing magnitude 
//     mass: 0.6         // Inertia weighting
//   });

//   const facilitiesData = [
//     { title: "ID Card Access", desc: "Secure physical access credentials provided instantly at checkpoint check-in arrays.", icon: Contact, stat: "SECURE PERMIT" },
//     { title: "Credential Certification", desc: "Official processing of production verification certificates for all active squad participants.", icon: Award, stat: "ALL HANDS CERT" },
//     { title: "Operational Fueling", desc: "Continuous distribution of vegetarian and non-vegetarian deep sprint macro meal bundles.", icon: Utensils, stat: "VEG & NON-VEG" },
//     { title: "High-Speed Pipeline", desc: "Enterprise-grade gigabit wireless networking matrices deployed across all workspace cells.", icon: Wifi, stat: "10 GBPS WIFI" },
//     { title: "Staging Frameworks", desc: "Premium, ergonomic multi-node staging tables and deployment chairs assigned per squad setup.", icon: Layers, stat: "PRO WORKSPACE" },
//     { title: "Power Subsystems", desc: "Isolated multi-socket electrical grids routed directly into localized workstation loops.", icon: Zap, stat: "240V BACKUP" },
//     { title: "Expert Guidance", desc: "Direct live debugging queues connected straight to industry engineering veterans and architects.", icon: Cpu, stat: "1:1 MENTORSHIP" },
//     { title: "Screen Casting Staging", desc: "Broadcast software instances live onto massive presentation displays for review array evaluation.", icon: MonitorUp, stat: "4K PROJECTORS" },
//     { title: "Dedicated Team Nodes", desc: "Configured individual build zones designed to foster optimized development sync conditions.", icon: Users, stat: "TEAM SQUAD BAY" },
//     { title: "Hydration Stations", desc: "Continuous replenishment centers stocked with purified drinking supplies and snacks.", icon: GlassWater, stat: "INFINITE REFRESH" }
//   ];

//   return (
//     <section ref={targetRef} className="relative h-[300vh]" style={{ background: "var(--bg-main)" }}>
      
//       {/* Sticky base framework */}
//       <div className="sticky top-0 h-screen min-w-screen overflow-hidden py-16 px-6 flex flex-col box-border">
        
//         {/* Ambient Lights */}
//         <div className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-[0.02] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--color-accent)' }} />
//         <div className="absolute bottom-10 left-10 w-[300px] h-[300px] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" style={{ background: 'var(--color-primary)' }} />

//         <div className="max-w-7xl w-full mx-auto flex flex-col h-full overflow-hidden">
          
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.02] shrink-0 gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }} />
//                 <p className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
//                   Hardware & Support Protocols
//                 </p>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[var(--text-primary)] uppercase flex items-center gap-2">
//                 INSIGHTS <span className="text-xl tracking-normal">✨</span>
//               </h2>
//             </div>
//             <p className="max-w-md text-xs text-[var(--text-secondary)] font-light leading-relaxed">
//               Every workspace vector is optimized to provide squads with maximum processing capability, operational comfort, and deep execution layers.
//             </p>
//           </div>

//           {/* Connected Smooth Horizontal Canvas */}
//           <div className="flex-1 flex items-center relative">
//             <motion.div style={{ x: smoothX }} className="flex gap-6">
//               {facilitiesData.map((facility, index) => (
//                 <StatCard
//                   key={index}
//                   title={facility.title}
//                   desc={facility.desc}
//                   icon={facility.icon}
//                   stat={facility.stat}
//                 />
//               ))}
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// Extracted Card Component for cleaner code
const TeamCard = ({ member }) => (
  <div className="relative shrink-0 w-64 group cursor-crosshair">
    <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-white/5 border border-white/10 mb-4 transition-transform duration-500 group-hover:scale-[0.98]">
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <h4 className="text-white font-bold text-lg tracking-tight uppercase">
      {member.name}
    </h4>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
      {member.role}
    </p>
  </div>
);

const PrizeSection = () => {
  const prizes = [
    {
      rank: "2nd",
      amount: "₹3000",
      label: "Runner Up",
      // Using Cyan for 2nd
      borderColor: "var(--color-accent)",
      glowColor: "var(--glow-accent)",
      height: "h-[350px]",
      delay: 0.1,
    },
    {
      rank: "1st",
      amount: "₹5000",
      label: "Grand Champion",
      // Using Purple for 1st
      borderColor: "var(--color-primary)",
      glowColor: "var(--glow-primary)",
      height: "h-[440px]",
      featured: true,
      delay: 0,
    },
    {
      rank: "3rd",
      amount: "₹2000",
      label: "Second Runner Up",
      // Using Pink for 3rd
      borderColor: "var(--color-secondary)",
      glowColor: "var(--glow-secondary)",
      height: "h-[300px]",
      delay: 0.2,
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 font-['Inter',_sans-serif]">
      {/* --- HEADER --- */}
      <div className="text-center mb-5 relative overflow-visible">
        <div className="flex gap-3 justify-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic uppercase pr-4">
            THE
          </h2>

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter gradient-text">
            REWARDS
          </h2>
        </div>
        <p className="text-[var(--text-secondary)] uppercase tracking-[0.5em] text-xs font-bold opacity-80 w-full pl-5">
          Victory has its perks
        </p>
        {/* Subtle background glow for header */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[var(--color-primary)] blur-[120px] opacity-20 pointer-events-none" />
      </div>

      {/* --- PODIUM GRID --- */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4">
        {prizes.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: p.delay, duration: 0.8, ease: "easeOut" }}
            className={`group relative w-full md:w-1/3 rounded-[32px] p-[1.5px] transition-all duration-500 overflow-hidden ${p.height} flex flex-col`}
            style={{
              background: `linear-gradient(to bottom, ${p.borderColor}, transparent)`,
            }}
          >
            {/* Card Interior */}
            <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[31px] p-8 flex flex-col justify-end backdrop-blur-3xl overflow-hidden">
              {/* Featured Badge */}
              {p.featured && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-1.2 rounded-full z-20 shadow-lg bg-[var(--color-primary)]">
                  <span className="text-black text-[10px] font-black uppercase tracking-widest">
                    Top Tier
                  </span>
                </div>
              )}

              {/* Background Rank Number */}
              <span
                className="absolute top-0 right-4 text-[120px] font-black leading-none opacity-10 select-none transition-opacity group-hover:opacity-20"
                style={{ color: p.borderColor }}
              >
                {p.rank[0]}
              </span>

              {/* Text Content */}
              <div className="relative z-10">
                <span
                  className="text-5xl font-black opacity-40 block mb-2 italic"
                  style={{ color: p.borderColor }}
                >
                  {p.rank}
                </span>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-2 text-white">
                  {p.amount}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--text-muted)]">
                  {p.label}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${p.borderColor}, transparent)`,
                }}
              />
            </div>

            {/* Outer Box Glow (Only for 1st place) */}
            {p.featured && (
              <div
                className="absolute inset-0 blur-[40px] -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: p.borderColor }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* --- FOOTER NOTE --- */}
      <div className="mt-5 text-center">
        <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed italic">
          * Remaining rewards distributed among track-specific winners and
          special mentions. The grind never stops.
        </p>
      </div>
    </section>
  );
};
export default XHackenPage;




