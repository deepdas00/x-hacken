import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Trophy,
  Users,
  EyeOff,
  Calendar,
  X,
  Gift,
  Mic,
  Briefcase,
  Sparkles,
  Terminal,
  Radio,
  Medal,
   MessageCircle,
  User,
  Mail,
  Phone,
  ShieldCheck,
  GraduationCap,
  Lock,
  HelpCircle,
  FileCheck,
  ArrowRight,
  Code,
  Play,
  Contact,
  Wifi,
  MonitorUp,
  GlassWater,
  Flag,
  ChevronDown,
  Utensils,
  Cpu,
  Lightbulb,
  Award,
  Code2,
  ShieldAlert,
  Eye,
  CheckCircle2,
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
import background from "../assets/college.jpeg";
import Navbar from "../components/Navbar.jsx";
import whatsapp from "../assets/whatsapp.svg";
//images
import deep from "../assets/team/suppAndPre/deep.jpeg";
import nawab from "../assets/team/suppAndPre/nawab.jpeg";
import trideep from "../assets/team/suppAndPre/trideep.jpeg";
// import pratima from "../assets/team/suppAndPre/pratima.jpg";
import swastik from "../assets/team/suppAndPre/swastik.jpeg";
import anubhab from "../assets/team/suppAndPre/anubhab.jpeg";

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

const XHackenPage = () => {
  const [registrationForm, setRegistrationForm] = useState(false);
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-green-500/40 overflow-x-hidden">
      {registrationForm ? (
        <RegistrationForm setRegistrationForm={setRegistrationForm} />
      ) : (
        <>
          <div className="fixed inset-0 z-0 bg-radial-gradient">
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.2} />
              <pointLight
                position={[10, 10, 10]}
                intensity={1.5}
                color="#22c55e"
              />

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
            {/* <nav className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-6 md:px-10 pb-1 max-w-[1600px] mx-auto backdrop-blur-xl bg-[#030303]/70 border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.8)] bg-blur-[22px]">
              <div className="flex items-center">
                <img src={logo} alt="" className="w-23 " />
                <span
                  className="text-2xl font-black tracking-tighter"
                  style={{ color: "var(--color-secondary)" }}
                >
                  X<span className="text-white">-hacken</span>
                </span>
              </div>

              <div className="flex items-center gap-10">
                <div className="hidden lg:flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
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
                <button
                  onClick={() => setRegistrationForm(true)}
                  className="btn-secondary1 text-white font-black px-5 py-1.5 text-[10px] rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform "
                >
                  Register Now
                </button>
              </div>
            </nav> */}

            <Navbar setRegistrationForm={setRegistrationForm} />

            <header className="relative pt-22 sm:px-6 md:px-10 max-w-[1500px] mx-auto z-10">
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
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-2 w-full text-center">
                      {/* Left Line */}
                      <div className="hidden sm:block h-[1px] w-20 bg-green-500/50" />

                      {/* Text */}
                      <span className="text-green-500 font-mono text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-bold leading-relaxed">
                        Building . Sprinting . Breaking Limits
                      </span>

                      {/* Right Line */}
                      <div className=" sm:block h-[1px] w-20 bg-green-500/50" />
                    </div>
                  </div>

                  {/* Hero Paragraph - Centered and limited width */}
                  <p className="text-gray-400 text-[11px] sm:text-lg md:text-xl max-w-xl md:max-w-3xl font-light leading-relaxed sm:leading-relaxed md:leading-relaxed px-4 sm:px-0 text-center">
                    The elite{" "}
                    <span className="text-white font-bold italic underline decoration-green-500/50 underline-offset-2 sm:underline-offset-4">
                      6-hour build cycle
                    </span>
                    . Engineered for those who thrive at the intersection of{" "}
                    <span className="text-white font-semibold">AI infra</span>{" "}
                    and{" "}
                    <span className="text-white font-semibold">
                      decentralized core
                    </span>
                    .
                  </p>

                  <div className="w-full flex flex-col items-center justify-center pb-2 sm:pb-4 sm:pb-1 select-none bg-transparent">
                    {/* Top line */}
                    <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent mb-4" />

                    {/* Wrapper */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 px-4 w-full">
                      {/* Left Side */}
                      <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                        <img
                          src={college}
                          alt="College Logo"
                          className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            ST XAVIER'S COLLEGE
                          </span>
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            BURDWAN
                          </span>
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            (AUTONOMOUS)
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block h-14 w-[2px] bg-gradient-to-b from-white/10 via-white/45 to-white/10 mx-1" />

                      {/* Mobile Divider */}
                      <div className="block sm:hidden w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                      {/* Right Side */}
                      <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                        <img
                          src={csa}
                          alt="Department Logo"
                          className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            DEPARTMENT OF
                          </span>
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            COMPUTER SCIENCE
                          </span>
                          <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                            AND APPLICATION
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Register Button - Centered */}
                  <div className="sm:pt-2">
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
                      <span
                        onClick={() => setRegistrationForm(true)}
                        className="relative z-10 flex items-center gap-2 "
                      >
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
                <div className="w-full max-w-7xl -translate-y-12 sm:-translate-y-9 px-4 font-['Inter',_sans-serif]">
                  <div className="sm:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 justify-center flex">
                    <span className="text-[9px] tracking-[0.5em] uppercase text-[var(--text-secondary)] font-semibold whitespace-nowrap">
                      Scroll to Explore
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-2 sm:gap-6">
                    {/* LEFT SIDE CARDS */}
                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-6 justify-end ">
                      {[
                        {
                          label: "Date",
                          val: "21 NOV",
                          sub: "SAT - SUN - MON",
                        },
                        {
                          label: "Venue",
                          val: "SEMINAR HALL",
                          sub: "TECH PARK",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="group relative p-[1px] rounded-[20px] min-w-[140px] sm:min-w-[200px] overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Animated Gradient Border */}
                          <div className="absolute inset-0 bg-[var(--border-strong)] group-hover:bg-[var(--gradient-cyan-purple)] transition-colors duration-500" />

                          {/* Card Body */}
                          <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[19px] p-3 sm:p-6 backdrop-blur-xl">
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold mb-1 sm:mb-4 text-[var(--color-accent)]">
                              {item.label}
                            </p>
                            <p className="text-[14px] sm:text-xl font-black text-[var(--text-primary)] mb-1 tracking-tight uppercase">
                              {item.val}
                            </p>
                            <p className="text-[9px] sm:text-[9px] text-[var(--text-muted)] tracking-widest font-medium">
                              {item.sub}
                            </p>

                            {/* Hover Interior Glow */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--color-primary)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CENTER: SCROLL INDICATOR (THEMED) */}
                    <div className="flex flex-col items-center sm:px-12 shrink-0">
                      <span className="hidden sm:block text-[9px] tracking-[0.5em] uppercase text-[var(--text-secondary)] font-semibold mb-5 whitespace-nowrap">
                        Scroll to Explore
                      </span>
                      <div className="relative flex flex-col items-center">
                        {/* Line with Primary Glow */}
                        <div className="w-[1.5px] h-32 sm:h-16 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
                        {/* Glowing Dot using Theme Box Shadow */}
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-white -mt-1.5 z-10"
                          style={{ boxShadow: "var(--glow-primary)" }}
                        />
                      </div>
                    </div>

                    {/* RIGHT SIDE CARDS */}
                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-6 justify-start ">
                      {[
                        {
                          label: "Eligibility",
                          val: "OPEN TECH",
                          sub: "INDIVIDUALS",
                        },
                        {
                          label: "Prizes Pool",
                          val: "₹45000",
                          sub: "TOTAL REWARDS",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="group relative p-[1px] rounded-[20px] min-w-[140px] sm:min-w-[200px] overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Animated Gradient Border */}
                          <div className="absolute inset-0 bg-[var(--border-strong)] group-hover:bg-[var(--gradient-purple-pink)] transition-colors duration-500" />

                          {/* Card Body */}
                          <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[19px] p-3 sm:p-6 backdrop-blur-xl">
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold mb-1 sm:mb-4 text-[var(--color-secondary)]">
                              {item.label}
                            </p>
                            <p className="text-[14px] sm:text-xl font-black text-[var(--text-primary)] mb-1 tracking-tight uppercase">
                              {item.val}
                            </p>
                            <p className="text-[9px] sm:text-[9px] text-[var(--text-muted)] tracking-widest font-medium">
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
            <HackathonRoadmap />
            <JudgesSection />
            <VenueSection />
            <section className="max-w-8xl mx-auto pb-40">
              <EventFacilities />
            </section>
            <LeadershipSection />

            <AnnouncementSection />

            <RulesSection />

            <TeamMarquee />
            <FAQSection />

            <MemoryGallery />
            <SponsorsSection />

            <footer className="py-12 border-t border-white/5 text-center">
              <p className="text-gray-600 text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-bold">
                Engineering Excellence // GenDelta Studio 2026
              </p>
            </footer>
          </div>
        </>
      )}

      {/* 3D Visual Engine */}
    </div>
  );
};

const LeadershipSection = () => {
  const presidents = [
    {
      name: "Swastik Basu",
      role: "Club President of BCA",
      img: swastik,
    },
    {
      name: "Anubhab",
      role: "Club President of BSC",
      img: anubhab,
    },
  ];

  const supportTeam = [
    {
      name: "Deep Das",
      role: "Logistics Head",
      img: deep,
      phone: "919933586801",
      whatsapp: "918250298098",
      linkedin: "#",
    },
    {
      name: "Sk Nawab",
      role: "Technical Lead",
      img: nawab,
      phone: "916294939397",
      whatsapp: "916294939397",
      linkedin: "#",
    },
    {
      name: "Trideep Ray",
      role: "Operations",
      img: trideep,
      phone: "918240303589",
      whatsapp: "918240303589",
      linkedin: "#",
    },
    {
      name: "Pratima",
      role: "Operations",
      img: "https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
      phone: "918320174835",
      whatsapp: "918320174835",
      linkedin: "#",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-10 border-t border-white/5 space-y-16 md:space-y-24">
      {/* ================= PRESIDENTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {presidents.map((pres, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="
  group relative overflow-hidden 

  /* MOBILE STYLE */
  flex flex-row items-center gap-4 p-2 sm:p-4 rounded-2xl
  bg-white/[0.04] border border-white/10 backdrop-blur-xl

  /* DESKTOP KEEP SAME */
  sm:flex-row sm:items-center sm:p-6 md:p-10 
  md:rounded-[40px] md:gap-8

  text-left
  "
          >
            {/* Image */}
            <div
              className="
    relative 
    w-22 h-22 sm:w-20 sm:h-20 md:w-32 md:h-32 
    shrink-0 rounded-xl md:rounded-full overflow-hidden 
    border border-green-500/40
  "
            >
              <img
                src={pres.img}
                alt={pres.name}
                className="w-full h-full object-cover
      grayscale-0 sm:grayscale-35 group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h4 className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] font-bold mb-1">
                President
              </h4>

              <h3 className="text-base sm:text-xl md:text-3xl font-black text-white leading-tight">
                {pres.name}
              </h3>

              <p className="text-green-400 text-[11px] sm:text-sm mt-1">
                {pres.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= SUPPORT ================= */}
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="flex items-center gap-4 sm:gap-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter whitespace-nowrap">
            SUPPORT TEAM
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/40 to-transparent" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-6 md:gap-8">
          {supportTeam.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="
              group relative 
              h-[310px] sm:h-[380px] md:h-[450px] 
              overflow-hidden 
              rounded-[12px] sm:rounded-[28px] md:rounded-[32px] 
              border border-white/10 bg-zinc-900
              "
            >
              {/* Image */}
              <img
                src={member.img}
                className="absolute inset-0 w-full h-full object-cover grayscale-0 sm:grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt={member.name}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end">
                <div className="translate-y-3 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter mb-1 uppercase">
                    {member.name}
                  </h4>

                  <p className="text-green-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
                    {member.role}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 sm:gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 ">
                    <a
                       href={`https://wa.me/${member.phone}?text=${encodeURIComponent(
    "Hi, I came to you from X-HACKEN platform 🚀"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-1 sm:py-3 bg-green-500 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs uppercase hover:bg-white transition text-white sm:group-hover:text-black"
                    >
                      {/* <MessageCircle  size={14} /> <span className="hidden sm:inline">WhatsApp</span> */}

                      <img src={whatsapp} className="w-5 h-5 sm:w-6 sm:h-6" />
  <span className="hidden sm:block text-white hover:text-black">WhatsApp</span>
                    </a>

                     <a
    href={`tel:${member.phone}`}
    className="p-2 sm:p-3 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-600"
  >
    <Phone size={16} />
  </a>


                    <a
                      href={member.linkedin}
                      className="p-2 sm:p-3 bg-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/20 border border-white/10"
                    >
                      <Globe size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Badge */}
              {/* <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-2 sm:px-3 py-1 bg-white/10 border border-white/10 rounded-full">
                <span className="text-[7px] sm:text-[8px] font-black text-white uppercase tracking-widest">
                  Active
                </span>
              </div> */}
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

  const fullTeam = [...team, ...team];

  return (
    <section className="relative py-16 sm:py-20 md:py-18 overflow-hidden flex flex-col gap-8 sm:gap-10 md:gap-12">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10 justify-center flex items-center">
        <img
          src={logo}
          alt="background"
          className="w-[150%] sm:w-[60%] object-center opacity-40"
        />

        {/* DARK OVERLAY (IMPORTANT) */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* HEADING */}
      <div className="px-4 sm:px-6 md:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight md:tracking-tighter text-white">
          THE ARCHITECTS
        </h2>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg my-2">
          Who make the magic happen. The core team behind X-Hacken, driving
          innovation and execution.
        </p>
      </div>

      {/* ROWS */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {/* ROW 1 */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: window.innerWidth < 768 ? 20 : 30, // 🔥 faster on mobile
              repeat: Infinity,
            }}
            className="flex gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8"
          >
            {fullTeam.map((member, i) => (
              <TeamCard key={`row1-${i}`} member={member} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2 */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: window.innerWidth < 768 ? 22 : 35, // 🔥 faster mobile
              repeat: Infinity,
            }}
            className="flex gap-4 sm:gap-6 md:gap-8 pr-4 sm:pr-6 md:pr-8"
          >
            {fullTeam.map((member, i) => (
              <TeamCard key={`row2-${i}`} member={member} />
            ))}
          </motion.div>
        </div>
        {/* ROW 3 */}
        {/* ROW 3 */}
        <div className="sm:hidden flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20, // keep fixed for mobile
              repeat: Infinity,
            }}
            className="flex gap-4 pr-4"
          >
            {fullTeam.map((member, i) => (
              <TeamCard key={`row3-${i}`} member={member} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* SIDE FADES */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
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
      title: "8:00 AM – 9:00 AM | Registration & Verification",
      desc: "Participant check-in, ID verification, and swag distribution.",
    },
    {
      title: "9:00 AM – 9:45 AM | Inauguration",
      desc: "Welcome session, rules explanation, and problem statement announcement.",
    },
    {
      title: "10:00 AM – 1:00 PM | Hackathon Begins",
      desc: "Teams start building their solutions in the main development phase.",
    },
    {
      title: "1:00 PM – 1:45 PM | Lunch Break",
      desc: "Participants take a break and recharge with provided meals.",
    },
  ];

  // PHASE 2: The Deep Sprint & Evaluation Matrix (Right Side - Block 2)
  const phase2BuildSteps = [
    {
      title: "2:00 PM – 3:00 PM | Mentoring & Submission",
      desc: "Final improvements with mentor guidance and project submission.",
    },
    {
      title: "3:00 PM – 5:30 PM | Presentation & Judging",
      desc: "Teams present their projects to judges for evaluation.",
    },
    {
      title: "5:30 PM – 5:45 PM | Tea Break",
      desc: "Short refreshment break before final results.",
    },
    {
      title: "5:45 PM – 6:30 PM | Winners & Closing Ceremony",
      desc: "Winner announcement, prize and medal distribution, and event closing.",
    },
  ];

  return (
    <section className="text-[var(--text-secondary)] py-5 sm:py-10 px-6 md:px-10 relative overflow-hidden">
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
        <div className="text-center">
          <h2 className="text-[20px] sm:text-3xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)] uppercase">
            X-HACKEN 2026 Roadmap
          </h2>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3">
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] text-center">
              Unified 13-Step Operational Timeline
            </p>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          </div>
        </div>

        {/* --- MASTER DUAL-PANEL LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_66%] gap-6 md:gap-10 relative items-start">
          {/* ================= LEFT COLUMN: PHASE I ================= */}
          <div
            className="p-5 sm:p-6 md:p-10 rounded-[28px] sm:rounded-[32px] relative shadow-2xl h-full "
            style={{
              background:
                "color-mix(in srgb, var(--color-accent) 15%, transparent)",
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
                className=" hidden sm:block p-2 sm:p-4 rounded-2xl text-[var(--color-secondary-light)] border border-[var(--color-primary)]/20"
                style={{ background: "rgba(138, 43, 255, 0.1)" }}
              >
                <Lightbulb size={24} />
              </div>
              <div
                className=" sm:hidden p-2 sm:p-4 rounded-2xl text-[var(--color-secondary-light)] border border-[var(--color-primary)]/20"
                style={{ background: "rgba(138, 43, 255, 0.1)" }}
              >
                <Lightbulb size={15} />
              </div>
              <div className="pt-2 ">
                <h3 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] tracking-tight uppercase">
                  Online Screening
                </h3>
                <p className="text-[9px] sm:text-xs text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
                  Ideation & Filtering Framework
                </p>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: PHASE I (1 DIVS COHESIVELY STACKED) ================= */}

            <div className="space-y-4 sm:space-y-6 relative">
              <div
                className="absolute left-[23px] top-2 bottom-2 w-[0.8px] opacity-30"
                style={{ background: "var(--gradient-purple-pink)" }}
              />

              {phase1Steps.map((step, index) => (
                <div key={index} className="flex gap-3 sm:gap-5 relative group">
                  <div
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold text-[var(--color-secondary-light)] z-10 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--bg-main)",
                      borderColor: "var(--color-primary)",
                      boxShadow: "0 0 10px rgba(138, 43, 255, 0.2)",
                    }}
                  >
                    {`0${index + 1}`}
                  </div>
                  <div className="flex-1 bg-white/[0.01] border border-white/[0.03] hover:border-[var(--border-strong)] p-3 sm:p-5 rounded-2xl transition-all duration-300">
                    <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-base text-[var(--text-secondary)] mt-1 sm:mt-1.5 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PHASE II (2 DIVS COHESIVELY STACKED) ================= */}
          <div
            className=" p-8 md:p-10 rounded-[32px] relative shadow-2xl"
            style={{
              background:
                "color-mix(in srgb, var(--color-secondary) 15%, transparent)",
              borderColor: "var(--border-default)",
            }}
          >
            <div
              className="absolute top-0 right-0 text-[var(--color-accent)] text-[10px] font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-bl-2xl rounded-tr-[31px] border-l border-b border-[var(--border-default)] flex items-center gap-1.5"
              style={{ background: "rgba(0, 229, 255, 0.1)" }}
            >
              <MapPin size={12} /> Phase II
            </div>

            <div className="flex items-center gap-4 mb-8 ">
              <div
                className="hidden sm:block p-4 rounded-2xl text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                style={{ background: "rgba(0, 229, 255, 0.1)" }}
              >
                <Play size={24} />
              </div>
              <div
                className=" sm:hidden p-2 sm:p-4 rounded-2xl text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                style={{ background: "rgba(0, 229, 255, 0.1)" }}
              >
                <Play size={15} />
              </div>
              <div className="pt-2 ">
                <h3 className="text-[17px] sm:text-2xl font-black text-[var(--text-primary)] tracking-tight uppercase">
                  On-Campus Launch
                </h3>
                <p className="text-[9px] sm:text-xs text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
                  Deployment Commands
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-col md:flex-row relative">
              {/* DIV 1: ON-CAMPUS INITIALIZATION */}
              <div>
                <div className="space-y-4 sm:space-y-6 relative">
                  <div
                    className="absolute left-[23px] top-2 bottom-2 w-[0.8px] opacity-30"
                    style={{ background: "var(--gradient-cyan-purple)" }}
                  />

                  {phase2LaunchSteps.map((step, index) => {
                    const stepNumber = index + 9;
                    const isFuelingStep = stepNumber === 12;
                    return (
                      <div
                        key={index}
                        className="flex gap-3 sm:gap-5 relative group"
                      >
                        <div
                          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold z-10 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: "var(--bg-main)",
                            borderColor: isFuelingStep
                              ? "var(--color-secondary-light)"
                              : "var(--border-accent)",
                            boxShadow: isFuelingStep
                              ? "var(--glow-secondary)"
                              : "var(--glow-accent)",
                            color: isFuelingStep
                              ? "var(--color-secondary)"
                              : "var(--color-accent)",
                          }}
                        >
                          {`0${index + 5}`}
                        </div>
                        <div className="flex-1 bg-white/[0.01] border border-white/[0.03] hover:border-[var(--border-strong)] p-3 sm:p-5 rounded-2xl transition-all duration-300">
                          <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base  tracking-tight flex">
                            {step.title}{" "}
                            {isFuelingStep && (
                              <Utensils
                                size={20}
                                className="text-[var(--color-secondary-light)] opacity-40 shrink-0 ml-4 hidden sm:block"
                              />
                            )}
                          </h4>
                          <p className="text-xs sm:text-base text-[var(--text-secondary)] mt-1 sm:mt-1.5 font-light leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DIV 2: CONTINUOUS PRODUCTION EXECUTIONS */}
              <div>
                <div className="space-y-4 sm:space-y-6 relative">
                  <div
                    className="absolute left-[23px] top-2 bottom-2 w-[0.8px] opacity-30"
                    style={{ background: "var(--gradient-cyan-purple)" }}
                  />

                  {phase2BuildSteps.map((step, index) => {
                    const stepNumber = index + 9;
                    const isFuelingStep = stepNumber === 19;

                    return (
                      <div
                        key={index}
                        className="flex gap-3 sm:gap-5 relative group items-start"
                      >
                        <div
                          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-xs sm:text-sm font-mono font-black z-10 shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: "var(--bg-main)",
                            borderColor: isFuelingStep
                              ? "var(--color-secondary-light)"
                              : "var(--border-accent)",
                            boxShadow: isFuelingStep
                              ? "var(--glow-secondary)"
                              : "var(--glow-accent)",
                            color: isFuelingStep
                              ? "var(--color-secondary)"
                              : "var(--color-accent)",
                          }}
                        >
                          {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
                        </div>

                        <div className="flex-1 bg-white/[0.01] border border-white/[0.02] hover:border-[var(--border-strong)] p-3 sm:p-5 rounded-2xl transition-all duration-300 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base tracking-tight flex items-center gap-2">
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
                            <p className="text-xs sm:text-base text-[var(--text-secondary)]  mt-1 sm:mt-1.5 font-light leading-relaxed">
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

// Extracted Card Component for cleaner code
const TeamCard = ({ member }) => {
  return (
    <div
      className="
      flex flex-col items-center text-center
      
      w-[140px] sm:w-[180px] md:w-[220px]
      p-3 sm:p-4 md:p-6
      
      bg-white/[0.03] border border-white/10 
      rounded-xl sm:rounded-2xl
      
      backdrop-blur-xl
    "
    >
      <img
        src={member.img}
        alt={member.name}
        className="
        w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 
        rounded-full object-cover mb-2 sm:mb-3
        "
      />

      <h3 className="text-xs sm:text-sm md:text-lg font-bold text-white">
        {member.name}
      </h3>

      <p className="text-[10px] sm:text-xs text-gray-400">{member.role}</p>
    </div>
  );
};

const PrizeSection = () => {
  const prizes = [
    {
      rank: "1st",
      amount: "₹20,000",
      label: "Grand Champion",
      borderColor: "var(--color-primary)",
      glowColor: "var(--glow-primary)",
      height:
        "h-auto min-h-[280px] sm:min-h-[360px] md:h-[430px] md:hidden sm:hidden",
      featured: true,
      delay: 0,
      // Icon & Perk assets
      Icon: Trophy,
      iconColor: "text-amber-350",
      perks: [
        "Grand Champion Trophy",
        "Elite Winner Certificate",
        "VIP Tech Bundle",
      ],
    },
    {
      rank: "2nd",
      amount: "₹15,000",
      label: "Runner Up",
      borderColor: "var(--color-accent)",
      glowColor: "var(--glow-accent)",
      height: "h-auto min-h-[260px] sm:min-h-[320px] md:h-[350px]",
      delay: 0.1,
      // Icon & Perk assets
      Icon: Medal,
      iconColor: "text-slate-300",
      perks: [
        "Silver Distinction Trophy",
        "Special Winner Certificate",
        "Exclusive Swag Kit",
      ],
    },
    {
      rank: "1st",
      amount: "₹20,000",
      label: "Grand Champion",
      borderColor: "var(--color-primary)",
      glowColor: "var(--glow-primary)",
      height:
        "h-auto min-h-[280px] sm:min-h-[360px] md:h-[430px] hidden sm:block",
      featured: true,
      delay: 0,
      // Icon & Perk assets
      Icon: Trophy,
      iconColor: "text-amber-350",
      perks: [
        "Grand Champion Trophy",
        "Elite Winner Certificate",
        "VIP Tech Bundle",
      ],
    },
    {
      rank: "3rd",
      amount: "₹10,000",
      label: "Second Runner Up",
      borderColor: "var(--color-secondary)",
      glowColor: "var(--glow-secondary)",
      height: "h-auto min-h-[260px] sm:min-h-[320px] md:h-[350px]",
      delay: 0.2,
      // Icon & Perk assets
      Icon: Medal,
      iconColor: "text-amber-700",
      perks: [
        "Bronze Distinction Trophy",
        "Special Winner Certificate",
        "Premium Swag Kit",
      ],
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-2 font-['Inter',_sans-serif]">
      {/* --- HEADER --- */}
      <div className="text-center mb-10 relative overflow-visible">
        <div className="flex gap-3 justify-center items-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase">
            THE
          </h2>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter gradient-text uppercase">
            REWARDS
          </h2>
        </div>
        <p className="text-[var(--text-secondary)] uppercase tracking-[0.4em] text-xs font-bold opacity-80 w-full mt-2">
          Victory has its perks
        </p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[var(--color-primary)] blur-[120px] opacity-20 pointer-events-none" />
      </div>

      {/* --- PODIUM GRID --- */}
      <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-end justify-center gap-4 sm:gap-6 mb-6">
        {prizes.map((p, i) => {
          const PrizeIcon = p.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: p.delay, duration: 0.8, ease: "easeOut" }}
              className={`group relative w-full sm:w-[90%] md:w-1/3 mx-auto rounded-[32px] p-[1.5px] transition-all duration-500 overflow-hidden ${p.height} flex flex-col`}
              style={{
                background: `linear-gradient(to bottom, ${p.borderColor}, transparent)`,
              }}
            >
              {/* Card Interior */}
              <div className="relative h-full w-full bg-[var(--bg-secondary)] rounded-[31px] p-5 sm:p-6 md:p-8 flex flex-col justify-between backdrop-blur-3xl overflow-hidden">
                {/* Top Section: Badges & Display Icons */}
                <div className="relative w-full flex justify-between items-start z-20">
                  <div
                    className={`p-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-transform duration-500 group-hover:scale-110 ${p.iconColor}`}
                  >
                    <PrizeIcon
                      size={20}
                      className="drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] sm:w-6 sm:h-6 md:w-7 md:h-7"
                    />
                  </div>

                  {p.featured && (
                    <div className="px-4 py-1 rounded-full shadow-lg bg-[var(--color-primary)]">
                      <span className="text-black text-[9px] font-black uppercase tracking-widest block">
                        Top Tier
                      </span>
                    </div>
                  )}
                </div>

                {/* Background Rank Watermark */}
                <span
                  className="absolute -top-3 -right-3 text-[60px] sm:text-[80px] md:text-[120px] font-black leading-none opacity-[0.03] select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:translate-x-[-10px]"
                  style={{ color: p.borderColor }}
                >
                  {p.rank[0]}
                </span>

                {/* Bottom Section: Text Content & Specific Perks */}
                <div className="relative z-10 mt-auto">
                  <span
                    className="text-lg sm:text-xl md:text-2xl font-black block mb-1 italic opacity-60"
                    style={{ color: p.borderColor }}
                  >
                    {p.rank} Place
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white">
                    {p.amount}
                  </h3>

                  {/* Core Perks Checklist Array */}
                  <ul className="space-y-2 border-t border-white/[0.05] pt-4 mb-2">
                    {p.perks.map((perk, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[11px] sm:text-xs text-[var(--text-secondary)]"
                      >
                        <Award
                          size={14}
                          className="shrink-0"
                          style={{ color: p.borderColor }}
                        />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[var(--text-muted)] mt-4">
                    {p.label}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${p.borderColor}, transparent)`,
                  }}
                />
              </div>

              {/* Outer Shadow Light Layer (Featured card only) */}
              {p.featured && (
                <div
                  className="absolute inset-0 blur-[40px] -z-10 opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: p.borderColor }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* --- ALL PARTICIPANTS CERTIFICATE ROW --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-5 
  p-4 sm:p-6 
  rounded-2xl 
  flex flex-col sm:flex-row 
  items-center sm:items-center 
  gap-4 sm:gap-6 
  justify-center sm:justify-between 
  text-center sm:text-left 
  relative overflow-hidden group"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 p-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl -z-20 pointer-events-none" />

        {/* Inner Background */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-[#09090b]/95 to-[#030303]/95 rounded-[14px] -z-10 pointer-events-none" />

        {/* LEFT CONTENT */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[var(--color-accent)]">
            <FileCheck size={22} className="sm:w-7 sm:h-7" />
          </div>

          {/* Text */}
          <div>
            <h4 className="text-white text-sm sm:text-base font-bold tracking-tight mb-1">
              Participation Framework Certification
            </h4>
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] max-w-xs sm:max-w-md">
              Every participating engineer receives an official certified
              production validation certificate and verifiable digital badge
              credentials.
            </p>
          </div>
        </div>

        {/* RIGHT BADGE */}
        <div className="shrink-0">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--text-muted)] uppercase border border-white/[0.1] px-3 py-1 rounded-md bg-white/[0.01]">
            ALL PARTICIPANTS
          </span>
        </div>
      </motion.div>

      {/* --- FOOTER NOTE --- */}
      <div className="text-center">
        <p className="text-[var(--text-muted)] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed italic">
          * Dynamic physical trophies are handed to top teams on-stage. Special
          Certificates of Merit are issued instantly post-evaluation.
        </p>
      </div>
    </section>
  );
};

const SponsorsSection = () => {
  const sponsors = [
    { name: "Title Sponsor", status: "Revealing Soon", tier: "PLATINUM" },
    { name: "Gold Sponsor", status: "Coming Soon", tier: "GOLD" },
    { name: "Community Partner", status: "To Be Announced", tier: "PARTNER" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 relative">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-cyan-500/10 blur-[80px] sm:blur-[100px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight md:tracking-tighter uppercase">
          Our Sponsors
        </h2>
        <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3">
          Backed by Industry Leaders
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {sponsors.map((s, i) => (
          <div
            key={i}
            className="group relative p-[1px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03]"
          >
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-30 sm:opacity-40 group-hover:opacity-100 blur-sm transition" />

            {/* Card */}
            <div
              className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl 
            p-6 sm:p-8 md:p-10 
            h-full flex flex-col justify-center items-center text-center"
            >
              {/* Tier Badge */}
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-cyan-400 mb-3 sm:mb-4">
                {s.tier}
              </span>

              {/* Placeholder Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black text-white/20 mb-4 sm:mb-6">
                ?
              </div>

              {/* Name */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">
                {s.name}
              </h3>

              {/* Status */}
              <p className="text-gray-500 text-xs sm:text-sm">{s.status}</p>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-cyan-500 to-purple-500 transition duration-500 rounded-2xl sm:rounded-3xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const JudgesSection = () => {
  const judges = [
    {
      name: "Revealing Soon",
      role: "AI Research Lead",
      company: "Top Tech Company",
      status: "CONFIDENTIAL",
    },
    {
      name: "To Be Announced",
      role: "Full Stack Architect",
      company: "Industry Expert",
      status: "LOCKED",
    },
    {
      name: "???",
      role: "Startup Founder",
      company: "Stealth Mode",
      status: "SECRET",
    },
    {
      name: "???",
      role: "Startup Founder",
      company: "Stealth Mode",
      status: "SECRET",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 blur-[120px]" />

      {/* Heading */}
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
          Meet The Judges
        </h2>
        <p className="text-gray-500 text-[9px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3">
          Industry Experts Joining Soon
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-8 md:gap-10">
        {judges.map((j, i) => (
          <div
            key={i}
            className="group relative rounded-[11px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl 
            h-[300px] sm:h-[340px] md:h-[380px] 
            transition-all duration-500 hover:scale-[1.03]"
          >
            {/* Glow Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 blur-xl" />

            {/* Image */}
            <img
              src="https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
              className="absolute inset-0 w-full h-full object-cover :grayscale-0 sm:grayscale group-hover:grayscale-0 transition duration-500"
            />

            {/* Status Badge */}
            <div className="hidden sm:block absolute top-4 sm:top-6 right-4 sm:right-6 px-2 sm:px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[8px] sm:text-[9px] tracking-widest uppercase text-gray-300">
              {j.status}
            </div>

            {/* Content */}
            <div className="relative z-10 px-2 py-4 sm:p-6 md:p-8 h-full flex flex-col justify-end">
              <div className="translate-y-3 sm:translate-y-4 group-hover:translate-y-0 transition duration-500">
                <h3 className="text-md sm:text-xl md:text-2xl font-black text-white tracking-tight">
                  {j.name}
                </h3>

                <p className="text-cyan-400 text-xs sm:text-sm mt-1">
                  {j.role}
                </p>

                <p className="text-gray-500 text-[10px] sm:text-xs mt-1 uppercase tracking-widest">
                  {j.company}
                </p>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-t from-purple-500 to-transparent transition duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

const RulesSection = () => {
  const ruleCategories = [
    {
      title: "Team Protocol",
      subtitle: "CONSTRAINTS // FORMATION",
      icon: Users,
      color: "from-cyan-500 via-[#0FB2E1] to-blue-600",
      accent: "text-cyan-400",
      borderColor: "group-hover:border-cyan-500/30",
      items: [
        "Optimal node deployment: 2-4 operators per cohort.",
        "Structural lock: Matrix configuration immutable post-submittal.",
        "Operational presence: Core synchronization required on-site throughout.",
      ],
    },
    {
      title: "Project Architecture",
      subtitle: "AUTHENTICITY // VALIDATION",
      icon: Code2,
      color: "from-purple-500 via-indigo-500 to-pink-500",
      accent: "text-purple-400",
      borderColor: "group-hover:border-purple-500/30",
      items: [
        "Original blueprints: All architectural blocks must be novel initialization.",
        "Anti-plagiarism sweeps: Zero tolerance for recycled or unverified code.",
        "Sandbox compilation: System construction must execute inside the runtime.",
      ],
    },
    {
      title: "Submission Protocol",
      subtitle: "PIPELINE // EVALUATION",
      icon: Terminal,
      color: "from-emerald-500 via-teal-500 to-green-600",
      accent: "text-emerald-400",
      borderColor: "group-hover:border-emerald-500/30",
      items: [
        "Chronograph alignment: Commits must clear before the deadline anchor.",
        "Documentation stack: Manifest file, layout schemas, and logs mandatory.",
        "Live staging: Functional validation mandatory for execution reviews.",
      ],
    },
    {
      title: "General Conduct",
      subtitle: "COMPLIANCE // SYNERGY",
      icon: ShieldAlert,
      color: "from-amber-500 via-orange-500 to-red-500",
      accent: "text-amber-400",
      borderColor: "group-hover:border-amber-500/30",
      items: [
        "Environment discipline: Keep terminal loops stable and areas optimal.",
        "Network respect: Treat fellow operators and systems with total compliance.",
        "Command execution: Follow direct parameters pushed by main routers.",
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full text-white py-10 sm:py-12 lg:py-10 overflow-hidden bg-transparent">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 z-10">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-24">
          <span className="text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 bg-cyan-950/30 border border-cyan-800/30 px-3 py-1 rounded-full">
            Security Core Parameters
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
            Rules &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Guidelines
            </span>
          </h2>

          <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-4 sm:mt-6" />
        </div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {ruleCategories.map((category, i) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={`
            group relative 
            rounded-xl sm:rounded-2xl 
            border border-white/[0.05] 
            bg-[#09090b]/80 
            p-4 sm:p-6 md:p-8 
            flex flex-col 
            backdrop-blur-2xl 
            transition-all duration-300
            ${category.borderColor}
            `}
              >
                {/* Glow */}
                <div
                  className={`absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] blur-2xl transition-opacity duration-500`}
                />

                {/* Left Border Line */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-[2px] rounded-r bg-gradient-to-b ${category.color} opacity-30 group-hover:opacity-100`}
                />

                {/* HEADER */}
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8 pl-1 sm:pl-2">
                  <div
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.color} text-black shadow-md`}
                  >
                    <Icon size={16} className="sm:w-[20px] sm:h-[20px]" />
                  </div>

                  <div>
                    <span className="block font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
                      {category.subtitle}
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-neutral-100 uppercase mt-0.5">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="space-y-3 sm:space-y-4 flex-grow pl-1 sm:pl-2">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2
                        size={14}
                        className={`mt-1 text-neutral-600 group-hover:${category.accent}`}
                      />

                      <p className="text-[11px] sm:text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-200 transition">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shimmer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                  <div className="absolute top-[-100%] w-full h-[50%] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent group-hover:animate-[shimmer_2.5s_infinite]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            top: -100%;
          }
          100% {
            top: 200%;
          }
        }
      `}</style>
    </section>
  );
};

const SITE_THEME = {
  isDark: true, // Switch to false to instantly convert to a clean light-mode section
  fontFamily: "font-sans", // e.g., 'font-mono', 'font-serif' or custom class
  primaryAccent: "indigo-600", // Your brand's main color weight
  secondaryAccent: "cyan-500", // Your brand's secondary color weight
};

const AnnouncementSection = () => {
  const announcements = [
    {
      title: "Surprise Swag Kits",
      desc: "Premium hackathon kits, limited edition apparel, and collectible hardware items distributed directly to your node.",
      status: "REVEALING SOON",
      icon: Gift,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Guest Appearance",
      desc: "An elite technology evangelist joins the main stage live for an unscripted, deep-dive technical fireside chat.",
      status: "CONFIDENTIAL",
      icon: Mic,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Internship Streams",
      desc: "Top performing team cohorts bypass standard screenings for direct recruitment interviews with core engineering teams.",
      status: "LOCKED",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Bonus Challenges",
      desc: "Hidden, deep-tech bounty statements go live at midnight with prize pools completely independent of the main track.",
      status: "SECRET INTEL",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      className={`w-full py-16 sm:py-20 md:py-24 relative overflow-hidden transition-colors duration-300 ${SITE_THEME.fontFamily}`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-6 sm:left-10 w-52 sm:w-72 h-52 sm:h-72 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-6 sm:right-10 w-52 sm:w-72 h-52 sm:h-72 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16 space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight uppercase">
            Classified Announcements
          </h2>

          <div className="h-[3px] w-10 sm:w-12 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />

          <p className="text-xs sm:text-sm md:text-base text-gray-400 pt-1 sm:pt-2 leading-relaxed">
            Hidden drops, surprise mechanical variables, and system upgrades
            activated dynamically throughout the timeline.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {announcements.map((item, i) => {
            const IconComponent = item.icon;

            return (
              <div
                key={i}
                className="
                group relative rounded-xl sm:rounded-2xl border 
                p-4 sm:p-6 md:p-8 
                flex flex-col sm:flex-row items-start gap-4 sm:gap-5 
                transition-all duration-300 
                hover:-translate-y-1
                bg-neutral-900/50 border-white/[0.08] hover:border-white/[0.15]
                "
              >
                {/* ICON */}
                <div
                  className={`
                  p-2.5 sm:p-3 rounded-lg sm:rounded-xl 
                  bg-gradient-to-br ${item.color} 
                  bg-opacity-10 text-white 
                  shrink-0
                  group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  <IconComponent
                    size={18}
                    className="sm:w-[22px] sm:h-[22px]"
                  />
                </div>

                {/* CONTENT */}
                <div className="space-y-1.5 sm:space-y-2 flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <span
                      className="
                      font-mono text-[8px] sm:text-[9px] 
                      font-bold tracking-wider 
                      px-2 py-0.5 rounded-md 
                      bg-neutral-500/10 border border-neutral-500/20 
                      text-gray-400
                      w-fit
                    "
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t border-white/[0.04]">
          <p className="text-[10px] sm:text-xs font-mono tracking-wider opacity-70 text-gray-400 leading-relaxed">
            💡 Track parameters closely. Surprise parameters synchronize
            automatically with core modules during live runtime.
          </p>
        </div>
      </div>
    </section>
  );
};

const VenueSection = () => {
  return (
    <section className="relative py-12 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden min-h-[80vh] sm:min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={background}
          className="w-full h-full object-cover opacity-20 sm:opacity-30"
        />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-7 sm:mb-6">
          Event Location
        </h2>

        {/* Map */}
        <div className="relative rounded-[20px] sm:rounded-[30px] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl ">
          <iframe
            src="https://www.google.com/maps?q=St+Xavier's+College+Burdwan&output=embed"
            className="w-full h-[220px] sm:h-[300px] md:h-[350px] border-0"
            loading="lazy"
          ></iframe>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        </div>

        {/* Venue Info */}
        <div className="mt-8 sm:mt-10 space-y-1 sm:space-y-2 px-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            St. Xavier’s College, Burdwan
          </h3>

          <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest">
            Nilpur, Purba Bardhaman, West Bengal
          </p>

          <p className="text-gray-500 text-xs sm:text-sm">
            Seminar Hall • X-Hacken 2026 Venue
          </p>
        </div>

        {/* Button */}
        <div className="mt-6 sm:mt-8">
          <a
            href="https://www.google.com/maps?q=St+Xavier's+College+Burdwan"
            target="_blank"
            className="inline-block px-5 sm:px-8 py-2.5 sm:py-3 rounded-full 
            bg-white text-black font-bold 
            text-[10px] sm:text-sm 
            uppercase tracking-[0.2em] sm:tracking-widest 
            hover:scale-105 active:scale-95 transition"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "Do I need to bring my own laptop?",
      a: "Yes, all participants must bring their own workstations, chargers, and any specialized hardware peripherals required for development.",
    },
    {
      q: "What is the team size?",
      a: "Each team must consist of 2 to 4 members. Solo participations or larger configurations are not permitted.",
    },
    {
      q: "Is internet access provided?",
      a: "Yes, dedicated high-speed Wi-Fi architecture will be accessible to all registered hackers throughout the venue floor.",
    },
    {
      q: "Can we use pre-built projects?",
      a: "No, all solutions must be built from scratch during the hackathon. Utilizing pre-built source structures will result in disqualification.",
    },
    {
      q: "Will food be provided?",
      a: "Absolutely. Full-course catered meals (veg/non-veg), midnight survival snacks, and a steady stream of caffeine will be provided entirely free.",
    },
    {
      q: "How will the judging be done?",
      a: "Projects are formally reviewed by an elite panel based on architectural ingenuity, technical complexity, functional deployment, and final pitch styling.",
    },
  ];

  return (
    <section className="relative w-full text-white py-16 sm:py-20 md:py-24 overflow-hidden border-t border-b border-white/[0.03]">
      {/* BACKGROUND GLOW (lighter on mobile) */}
      <div className="absolute top-[-20%] left-[-20%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/[0.08] blur-[120px] sm:blur-[160px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-purple-500/[0.08] blur-[140px] sm:blur-[180px] rounded-full pointer-events-none animate-pulse" />

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:5rem_5rem] pointer-events-none" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 z-10">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-neutral-900/80 border border-neutral-800/60 mb-3 sm:mb-4">
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
              Knowledge Hub
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
            Frequently Asked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              Questions
            </span>
          </h2>

          <p className="text-neutral-500 text-[11px] sm:text-xs md:text-sm max-w-md sm:max-w-lg mt-4 sm:mt-6">
            Get instant breakdowns regarding rules, timelines, and logistics.
          </p>
        </div>

        {/* FAQ GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;

            return (
              <div
                key={i}
                className={`group relative rounded-xl sm:rounded-2xl p-[1px] transition-all duration-300 ${
                  isOpen ? "scale-[1.01]" : ""
                }`}
              >
                {/* BORDER GLOW */}
                {isOpen && (
                  <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500 ${
                      isOpen ? "opacity-80 blur-[2px]" : "opacity-10"
                    }`}
                  />
                )}

                {/* CARD */}
                <div
                  className={`relative bg-[#09090b]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/[0.03] ${isOpen ? "shadow-2xl " : "shadow-md"}`}
                >
                  {/* HEADER BUTTON */}
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 gap-3 sm:gap-6 text-left"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOpen ? "bg-cyan-400" : "bg-neutral-600"
                        }`}
                      />

                      <span
                        className={`font-bold text-sm sm:text-base md:text-lg ${
                          isOpen ? "text-cyan-400" : "text-neutral-200"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* ICON */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border transition-all ${
                        isOpen
                          ? "rotate-180 border-cyan-400/40"
                          : "border-neutral-800"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* ANSWER (SMOOTH FIXED) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 ml-4 border-l border-neutral-800/40">
                      <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RegistrationForm = ({ setRegistrationForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    college: "",
    foodPreference: "veg",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Initializing payload dispatch...", formData);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#030303] text-white py-10 sm:py-24 overflow-hidden flex items-center justify-center border-t border-white/[0.02] fixed inset-0 z-50 bg-[#020204]/90 backdrop-blur-2xl flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700/30 scrollbar-track-transparent">
      <button
        onClick={() => setRegistrationForm(false)}
        type="button"
        className="absolute top-2 sm:top-6 right-2 sm:right-6 z-50 text-neutral-100 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/50 p-1 sm:p-2.5 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group"
      >
        <X
          size={16}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </button>

      {/* 🌌 Atmospheric Backdrop Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#242bf9] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#ff2ea1] blur-[180px] rounded-full pointer-events-none" />

      {/* Cyber Grid Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Main Structural Layout Wrapper */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-12 items-center">
        {/* ================= LEFT SIDE: SPACE VISUALIZATION MATRIX ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-8 text-center lg:text-left">
          <div className="space-y-2 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-neutral-900/80 border border-neutral-800/60 backdrop-blur-md mb-2">
              <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-accent,#22d3ee)]" />
              <span className="text-neutral-400 text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase">
                Registration Terminal
              </span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-black tracking-tight uppercase leading-tight text-white">
              Create Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent,#22d3ee)] via-[var(--color-primary,#c084fc)] to-[var(--color-secondary,#f472b6)]">
                Account Profile
              </span>
            </h2>
            <p className="text-neutral-400 text-[9px] sm:text-sm max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
              Join the platform to access your dashboard, connect with teams,
              and secure your spot in the upcoming hackathon workspace.
            </p>
          </div>

          {/* 🌌 Illustrated Animated Space/Portal Model */}
          <div className="relative w-[180px] sm:w-full max-w-[400px] aspect-square mx-auto lg:mx-0 flex items-center justify-center group">
            {/* Pulsing Outer Quantum Orbitals */}
            <div className="absolute inset-0 sm:inset-0 rounded-full border border-dashed border-[var(--color-accent,#22d3ee)]/60 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-3 sm:inset-8 rounded-full border border-[var(--color-primary,#c084fc)]/40 animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute inset-6 sm:inset-16 rounded-full border border-dashed border-[var(--color-secondary,#f472b6)]/80 animate-[spin_15s_linear_infinite]" />

            {/* Neon Glowing Particle Nodes floating via CSS */}
            <div
              className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-[var(--color-accent,#22d3ee)] shadow-[0_0_12px_#22d3ee] animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute bottom-16 right-1/4 w-2.5 h-2.5 rounded-full bg-[var(--color-secondary,#f472b6)] shadow-[0_0_12px_#f472b6] animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 right-12 w-1.5 h-1.5 rounded-full bg-[var(--color-primary,#c084fc)] shadow-[0_0_12px_#c084fc] animate-ping"
              style={{ animationDuration: "2s" }}
            />

            {/* Core Graphic Chassis */}
            <div className="relative w-24 h-24 sm:w-48 sm:h-48 rounded-3xl bg-[#09090b]/80 border border-white/[0.05] flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group-hover:border-[var(--color-accent,#22d3ee)]/30 transition-colors duration-500">
              {/* Inner Portal Glow */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-[var(--color-accent,#22d3ee)]/10 via-[var(--color-primary,#c084fc)]/5 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Animated Core Identity Grid Vector */}
              <svg
                className="w-12 h-12 sm:w-24 sm:h-24 text-neutral-600 group-hover:text-[var(--color-accent,#22d3ee)] transition-colors duration-500"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 5L90 28V72L50 95L10 72V28L50 5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="animate-[pulse_3s_infinite]"
                />
                <path
                  d="M50 20L76 35V65L50 80L24 65V35L50 20Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="8"
                  className="fill-current text-[var(--color-primary,#c084fc)] shadow-lg animate-pulse"
                />
                <line
                  x1="50"
                  y1="5"
                  x2="50"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="50"
                  y1="80"
                  x2="50"
                  y2="95"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="10"
                  y1="28"
                  x2="24"
                  y2="35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="76"
                  y1="65"
                  x2="90"
                  y2="72"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: DATA FORM MATRIX ================= */}
        <div className="lg:col-span-7 relative group w-full">
          {/* Dynamic Accent Border Architecture */}
          <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-[var(--color-accent,#22d3ee)] via-[var(--color-primary,#c084fc)] to-[var(--color-secondary,#f472b6)] rounded-2xl opacity-10 group-hover:opacity-10 transition-opacity duration-500 blur-[0.5px] -z-20" />
          <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-[var(--color-accent,#22d3ee)] via-[var(--color-primary,#c084fc)] to-[var(--color-secondary,#f472b6)] rounded-2xl opacity-20 group-hover:opacity-10 transition-opacity duration-500 -z-20" />

          {/* Main Content Card Box */}
          <div className="relative bg-[#000000)] backdrop-blur-3xl p-3 sm:p-10 rounded-2xl border border-white/[0.04] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6 noValidate">
              {/* Grid Row 1: Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alexa Doe"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-accent,#22d3ee)] focus:ring-1 focus:ring-[var(--color-accent,#22d3ee)]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-primary,#c084fc)] focus:ring-1 focus:ring-[var(--color-primary,#c084fc)]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Row 2: Contact Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
  let value = e.target.value;

  // allow only numbers and +
  value = value.replace(/[^0-9+]/g, "");

  // allow only one + at start
  if (value.includes("+")) {
    value = "+" + value.replace(/\+/g, "").replace(/^\+/, "");
  }

  // update state properly
  setFormData({ ...formData, phone: value });
}}
                      placeholder="+91 00000 00000"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-accent,#22d3ee)] focus:ring-1 focus:ring-[var(--color-accent,#22d3ee)]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Alternative Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      name="altPhone"
                      value={formData.altPhone}
                      onChange={handleChange}
                      placeholder="Backup contact number"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-primary,#c084fc)] focus:ring-1 focus:ring-[var(--color-primary,#c084fc)]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Full Row: Academic / Organization Affiliation */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                  Institutional Affiliation
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    required
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="University or Institute Name"
                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-secondary,#f472b6)] focus:ring-1 focus:ring-[var(--color-secondary,#f472b6)]/20 transition-all"
                  />
                </div>
              </div>

              {/* Grid Row 3: Preferences & Security */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Dietary Requirement
                  </label>
                  <div className="relative">
                    <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select
                      name="foodPreference"
                      value={formData.foodPreference}
                      onChange={handleChange}
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-10 text-sm text-white focus:outline-none focus:border-[var(--color-accent,#22d3ee)] focus:ring-1 focus:ring-[var(--color-accent,#22d3ee)]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="veg" className="bg-[#09090b] text-white">
                        Vegetarian
                      </option>
                      <option
                        value="non-veg"
                        className="bg-[#09090b] text-white"
                      >
                        Non-Vegetarian
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-neutral-800 pl-2 text-neutral-500 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Account Password
                  </label>
                  <div className="relative">
                    {/* Left Side Lock Icon */}
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-secondary,#f472b6)] focus:ring-1 focus:ring-[var(--color-secondary,#f472b6)]/20 transition-all"
                    />

                    {/* 👁️ Interactive Show/Hide Toggle Trigger */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none p-1 rounded transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional Submission Button Layer */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full relative group/btn mt-4 rounded-xl p-[1px] font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent,#22d3ee)] via-[var(--color-primary,#c084fc)] to-[var(--color-secondary,#f472b6)] rounded-xl" />

                <div className="relative bg-neutral-950 text-white group-hover/btn:bg-transparent transition-colors duration-300 py-4 px-6 rounded-xl flex items-center justify-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-accent,#22d3ee)] group-hover/btn:text-white transition-colors" />
                  <span className="uppercase tracking-[0.15em] text-xs font-bold font-mono">
                    Complete Registration
                  </span>
                </div>
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default XHackenPage;
