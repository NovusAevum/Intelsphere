import { motion } from "framer-motion";

const capabilities = [
  {
    id: "resume",
    title: "RESUME",
    description: "Comprehensive professional profile with 100+ certifications and strategic partnerships.",
    icon: "📄",
    color: "text-[hsl(var(--cyber))]",
    bgColor: "bg-[hsl(var(--cyber))]/20",
    hoverColor: "hover:border-[hsl(var(--cyber))]"
  },
  {
    id: "neural-net",
    title: "NEURAL NET",
    description: "Advanced AI neural network visualization and machine learning model analytics.",
    icon: "🧠",
    color: "text-[hsl(var(--tuck))]",
    bgColor: "bg-[hsl(var(--tuck))]/20",
    hoverColor: "hover:border-[hsl(var(--tuck))]"
  },
  {
    id: "quantum-lab",
    title: "QUANTUM LAB",
    description: "Quantum computing research and advanced computational experiments.",
    icon: "⚛️",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    hoverColor: "hover:border-purple-500"
  },
  {
    id: "ai-matrix",
    title: "AI MATRIX",
    description: "Advanced AI decision matrix and intelligent automation systems.",
    icon: "🔮",
    color: "text-[hsl(var(--matrix))]",
    bgColor: "bg-[hsl(var(--matrix))]/20",
    hoverColor: "hover:border-[hsl(var(--matrix))]"
  }
];

const marketingExpertise = [
  {
    title: "GOOGLE ADS",
    subtitle: "Search & Display",
    icon: "🎯",
    color: "text-[hsl(var(--ming))]",
    bgColor: "bg-[hsl(var(--ming))]/20"
  },
  {
    title: "ANALYTICS",
    subtitle: "GA4 & GTM",
    icon: "📊",
    color: "text-[hsl(var(--linny))]",
    bgColor: "bg-[hsl(var(--linny))]/20"
  },
  {
    title: "SOCIAL MEDIA",
    subtitle: "Multi-Platform",
    icon: "📱",
    color: "text-[hsl(var(--tuck))]",
    bgColor: "bg-[hsl(var(--tuck))]/20"
  },
  {
    title: "AUTOMATION",
    subtitle: "AI-Powered",
    icon: "🔄",
    color: "text-[hsl(var(--cyber))]",
    bgColor: "bg-[hsl(var(--cyber))]/20"
  }
];

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 relative">
      {/* Cybersecurity dashboard background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Cybersecurity dashboard with multiple monitoring screens" 
          className="w-full h-full object-cover opacity-15" 
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">ADVANCED</span> CAPABILITIES
          </h2>
          <p className="text-xl text-gray-300">
            Cutting-edge AI solutions and intelligence frameworks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div 
              key={capability.id}
              className={`glass rounded-xl p-6 text-center ${capability.hoverColor} transition-all transform hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 ${capability.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{capability.icon}</span>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${capability.color}`}>
                {capability.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {capability.description}
              </p>
              <button className={`${capability.color} hover:opacity-80 font-semibold transition-colors`}>
                EXPLORE {capability.title}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Digital Marketing Expertise */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--ming))]">
            DIGITAL MARKETING EXPERTISE
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {marketingExpertise.map((item, index) => (
              <motion.div 
                key={item.title}
                className="text-center glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-20 h-20 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${item.color}`}>
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
