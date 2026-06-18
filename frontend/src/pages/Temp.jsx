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

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Initializing payload dispatch...", formData);
  };

  return (
    <section className="fixed inset-0 z-50 w-full h-screen bg-[#040207] text-white overflow-y-auto flex items-center justify-center p-3 md:p-6 lg:p-12 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
      
      {/* 🌌 BACKGROUND LAYER MATRIX (Matches Use AI Image Jun 18, 2026, 21_48_25.png) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Base High-Saturated Nebula Flares */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-tr from-[#ff0080] via-[#ff2ea1] to-transparent opacity-40 blur-[120px] rounded-full" />
        <div className="absolute top-[-15%] right-[-10%] w-[600px] md:w-[750px] h-[600px] md:h-[750px] bg-gradient-to-bl from-[#00bfff] via-[#242bf9] to-transparent opacity-45 blur-[120px] rounded-full" />
        
        {/* 2. Cyber Hexagonal Vector Grid Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-lighten"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath fill='%23ffffff' fill-opacity='0.15' d='M14 0L28 8v16l-14 8L0 24V8zM0 33l14 8 14-8v16l-14 8-14-8z'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 70px'
          }}
        />

        {/* 3. Outer Edge Cosmic Space Clouds Dust */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-400/10 blur-[60px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-pink-500/10 blur-[80px] rounded-full mix-blend-screen" />

        {/* 4. Glowing Neon Circuit Tech Vectors */}
        <svg className="absolute inset-0 w-full h-full opacity-40 stroke-current text-cyan-400/70" fill="none" viewBox="0 0 1440 900">
          <path d="M -50,450 L 120,450 L 160,490 L 320,490" strokeWidth="1.5" />
          <circle cx="320" cy="490" r="3" fill="#22d3ee" />
          <path d="M 150,150 L 300,150 L 340,190" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-40 stroke-current text-pink-500/80" fill="none" viewBox="0 0 1440 900">
          <path d="M 1490,550 L 1320,550 L 1270,600 L 1000,600" strokeWidth="1.5" />
          <circle cx="1000" cy="600" r="3" fill="#ff2ea1" />
        </svg>
      </div>

      {/* ❌ Close Trigger Button */}
      <button
        onClick={() => setRegistrationForm(false)}
        type="button"
        className="absolute top-4 right-4 z-50 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 p-2.5 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group"
      >
        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Content Canvas Layout Container */}
      <div className="relative w-full max-w-[1280px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-6">
        
        {/* ================= LEFT SIDE: ACCOUNT INFO TERMINAL ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-6 text-center lg:text-left px-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-2 mx-auto lg:mx-0 w-fit">
              <Terminal className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span className="text-neutral-300 text-[10px] font-bold tracking-[0.25em] uppercase font-mono">
                Registration Terminal
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.1] text-white">
              Create Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#c084fc] to-[#f472b6]">
                Account Profile
              </span>
            </h2>
            
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto lg:mx-0 font-normal leading-relaxed">
              Join the platform to access your dashboard, connect with teams,
              and secure your spot in the upcoming hackathon workspace.
            </p>
          </div>

          {/* 🌌 Cybernetic Animated Center Core Core Graphic Component */}
          <div className="relative w-[190px] sm:w-[260px] lg:w-[320px] aspect-square mx-auto lg:mx-0 flex items-center justify-center group mt-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#22d3ee]/20 to-[#ff2ea1]/20 rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Embedded Decorative Glowing Rings for Depth */}
            <div className="absolute inset-[-10px] border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[-20px] border border-dashed border-pink-500/10 rounded-full animate-[spin_35s_linear_infinite_reverse]" />

            <img 
              src={logo} 
              alt="Cyber Core Portal" 
              className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,46,161,0.25)] group-hover:scale-102 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE: DATA FORM GLASS MATRIX ================= */}
        <div className="lg:col-span-7 relative group w-full px-1">
          {/* Outer Border Glowing Traces */}
          <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-[#22d3ee] via-[#c084fc] to-[#f472b6] rounded-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500 blur-[1px] -z-20" />
          <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-[#22d3ee]/40 to-[#f472b6]/40 rounded-2xl opacity-30 -z-20" />

          {/* Main Translucent Glass Form Container - Fixed Typo */}
          <div className="relative bg-gradient-to-b from-[#100f1c]/80 to-[#07060f]/95 backdrop-blur-3xl p-5 sm:p-8 lg:p-10 rounded-2xl border border-white/[0.06] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              {/* Grid Row 1: Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
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
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
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
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#c084fc] focus:ring-1 focus:ring-[#c084fc]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Row 2: Contact Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
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
                        let value = e.target.value.replace(/[^0-9+]/g, "");
                        if (value.includes("+")) {
                          value = "+" + value.replace(/\+/g, "");
                        }
                        setFormData({ ...formData, phone: value });
                      }}
                      placeholder="+91 00000 00000"
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
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
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#c084fc] focus:ring-1 focus:ring-[#c084fc]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Full Row: Affiliation */}
              <div className="space-y-2">
                <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
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
                    className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#f472b6] focus:ring-1 focus:ring-[#f472b6]/20 transition-all"
                  />
                </div>
              </div>

              {/* Grid Row 3: Requirements & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Dietary Requirement
                  </label>
                  <div className="relative">
                    <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select
                      name="foodPreference"
                      value={formData.foodPreference}
                      onChange={handleChange}
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-10 text-sm text-white focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="veg" className="bg-[#09090b] text-white">
                        Vegetarian
                      </option>
                      <option value="non-veg" className="bg-[#09090b] text-white">
                        Non-Vegetarian
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-neutral-800 pl-2 text-neutral-500 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-mono">
                    Account Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="w-full bg-neutral-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#f472b6] focus:ring-1 focus:ring-[#f472b6]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none p-1 rounded transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Complete Submission Button Action Wrapper */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full relative group/btn mt-2 rounded-xl p-[1px] font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#22d3ee] via-[#c084fc] to-[#f472b6] rounded-xl" />
                <div className="relative bg-neutral-950 text-white group-hover/btn:bg-transparent transition-colors duration-300 py-3.5 px-6 rounded-xl flex items-center justify-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#22d3ee] group-hover/btn:text-white transition-colors" />
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