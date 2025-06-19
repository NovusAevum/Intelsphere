import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Futuristic AI interface background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Futuristic AI interface with holographic displays" 
          className="w-full h-full object-cover opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--command))] via-[hsl(var(--panel))] to-[hsl(var(--command))] opacity-90"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.div 
          className="animate-float"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">HANIS</span><br />
            <span className="text-white">WONDER PETS</span>
          </h1>
          <div className="text-2xl md:text-3xl text-[hsl(var(--cyber))] mb-8 font-light">
            Advanced Intelligence Center
          </div>
        </motion.div>
        
        <motion.div 
          className="glass rounded-2xl p-8 mb-12 matrix-bg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-xl mb-4 text-gray-300">
            Where Wonder Pets AI meets Advanced Intelligence
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-[hsl(var(--linny))]/20 text-[hsl(var(--linny))] px-3 py-1 rounded-full">
              🔍 OSINT Expert
            </span>
            <span className="bg-[hsl(var(--tuck))]/20 text-[hsl(var(--tuck))] px-3 py-1 rounded-full">
              🤖 AI Specialist
            </span>
            <span className="bg-[hsl(var(--ming))]/20 text-[hsl(var(--ming))] px-3 py-1 rounded-full">
              📈 Digital Marketing
            </span>
            <span className="bg-[hsl(var(--cyber))]/20 text-[hsl(var(--cyber))] px-3 py-1 rounded-full">
              💡 Innovation Strategy
            </span>
          </div>
        </motion.div>

        {/* Command Center Status */}
        <motion.div 
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-[hsl(var(--cyber))] mb-2">
              🚀 COMMAND CENTER STATUS
            </div>
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto animate-pulse"></div>
            <div className="text-green-400 text-sm mt-2">ALL SYSTEMS OPERATIONAL</div>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button 
            onClick={() => scrollToSection('agents')}
            className="bg-[hsl(var(--cyber))] hover:bg-[hsl(var(--cyber))]/80 text-[hsl(var(--command))] px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 hover:animate-glow"
          >
            ACTIVATE AGENTS
          </button>
          <button 
            onClick={() => scrollToSection('capabilities')}
            className="border-2 border-[hsl(var(--cyber))] text-[hsl(var(--cyber))] hover:bg-[hsl(var(--cyber))] hover:text-[hsl(var(--command))] px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            EXPLORE CAPABILITIES
          </button>
        </motion.div>
      </div>

      {/* Scanning animation */}
      <div className="scan-line"></div>
    </section>
  );
}
