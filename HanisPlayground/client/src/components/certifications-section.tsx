import { motion } from "framer-motion";

const certifications = [
  {
    title: "GOOGLE CERTIFIED",
    icon: "🎓",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    items: [
      "• Google Ads Professional",
      "• Analytics Certified",
      "• AI-Powered Ads"
    ]
  },
  {
    title: "CYBERSECURITY",
    icon: "🔒",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    items: [
      "• Ethical Hacking",
      "• OSINT Specialist",
      "• Threat Analysis"
    ]
  },
  {
    title: "CLOUD PLATFORMS",
    icon: "☁️",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    items: [
      "• AWS Partner",
      "• Azure AI Engineer",
      "• Google Cloud"
    ]
  }
];

export default function CertificationsSection() {
  return (
    <section id="resume" className="py-20 relative">
      {/* Command center interface background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
          alt="Command center interface with multiple monitoring displays" 
          className="w-full h-full object-cover opacity-10" 
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
            <span className="gradient-text">CERTIFICATION</span> HIGHLIGHTS
          </h2>
          <p className="text-xl text-gray-300">
            100+ Global Certifications • AI/ML • OSINT • Cybersecurity • Quantum Computing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.title}
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${cert.bgColor} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-xl">{cert.icon}</span>
                </div>
                <h3 className={`text-xl font-bold ${cert.color}`}>
                  {cert.title}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {cert.items.map((item, itemIndex) => (
                  <motion.li 
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="bg-gradient-to-r from-[hsl(var(--cyber))] to-[hsl(var(--matrix))] text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transform transition-all hover:animate-glow">
            VIEW ALL 100+ CERTIFICATIONS
          </button>
        </motion.div>
      </div>
    </section>
  );
}
