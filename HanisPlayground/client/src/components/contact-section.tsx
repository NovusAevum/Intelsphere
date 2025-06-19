import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: "💬",
    label: "Email",
    value: "wmh2u@proton.me",
    color: "text-[hsl(var(--cyber))]",
    bgColor: "bg-[hsl(var(--cyber))]/20"
  },
  {
    icon: "📧",
    label: "Phone", 
    value: "+60 17-927 5907",
    color: "text-[hsl(var(--tuck))]",
    bgColor: "bg-[hsl(var(--tuck))]/20"
  },
  {
    icon: "🌍",
    label: "Location",
    value: "Malaysia",
    color: "text-[hsl(var(--ming))]",
    bgColor: "bg-[hsl(var(--ming))]/20"
  }
];

const quickCommands = [
  { label: "SEND", color: "hover:bg-[hsl(var(--cyber))]/20" },
  { label: "SYSTEM STATUS", color: "hover:bg-[hsl(var(--linny))]/20" },
  { label: "OSINT SCAN", color: "hover:bg-[hsl(var(--tuck))]/20" },
  { label: "AI ANALYSIS", color: "hover:bg-[hsl(var(--ming))]/20" }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">CONTACT THE</span> COMMAND CENTER
          </h2>
          <p className="text-xl text-gray-300">Ready to deploy advanced AI solutions</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass rounded-xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={info.label}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-12 h-12 ${info.bgColor} rounded-full flex items-center justify-center`}>
                    <span className="text-xl">{info.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className={`text-lg font-semibold ${info.color}`}>
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8 pt-8 border-t border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickCommands.map((command, index) => (
                  <motion.button 
                    key={command.label}
                    className={`glass p-4 rounded-lg ${command.color} transition-colors text-sm font-semibold`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {command.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
