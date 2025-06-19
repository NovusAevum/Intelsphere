import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Globe, Clock, Send, 
  MessageCircle, Linkedin, Github, Twitter,
  Shield, Award, Zap, Star, CheckCircle
} from 'lucide-react';

export default function AdvancedContact() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const contactInfo = {
    email: 'wmh2u@proton.me',
    phone: '+60 17-927 5907',
    location: 'Malaysia',
    timezone: 'GMT+8'
  };

  const certificationHighlights = [
    {
      category: 'GOOGLE CERTIFIED',
      icon: CheckCircle,
      certifications: [
        'Google Ads Professional',
        'Analytics Certified',
        'AI-Powered Ads'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'CYBERSECURITY',
      icon: Shield,
      certifications: [
        'Ethical Hacking',
        'OSINT Specialist',
        'Threat Analysis'
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      category: 'CLOUD PLATFORMS',
      icon: Zap,
      certifications: [
        'AWS Partner',
        'Azure AI Engineer',
        'Google Cloud'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const digitalMarketingExpertise = [
    { name: 'GOOGLE ADS', subtitle: 'Search & Display', icon: '🎯' },
    { name: 'ANALYTICS', subtitle: 'GA4 & GTM', icon: '📊' },
    { name: 'SOCIAL MEDIA', subtitle: 'Multi-Platform', icon: '📱' },
    { name: 'AUTOMATION', subtitle: 'AI-Powered', icon: '🔄' }
  ];

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const { time, date } = formatTime(currentTime);

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30">
      {/* Header with Real-time Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h3 className="text-4xl font-bold text-white mb-4">
          CONTACT THE COMMAND CENTER
        </h3>
        
        {/* Live Status Bar */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">ONLINE</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="text-cyan-400" size={16} />
            <span className="text-cyan-400 font-mono">{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-purple-400" size={16} />
            <span className="text-purple-400">{contactInfo.location}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-2xl font-bold text-white mb-6">Direct Communication</h4>
          
          <div className="space-y-6 mb-8">
            <motion.a
              href={`mailto:${contactInfo.email}`}
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center space-x-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-all"
            >
              <Mail className="text-blue-400" size={24} />
              <div>
                <div className="text-white font-bold">Email Command Center</div>
                <div className="text-blue-400">wmh2u@proton.me</div>
              </div>
            </motion.a>
            
            <motion.a
              href="tel:+60179275907"
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center space-x-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30 hover:border-green-400 transition-all"
            >
              <Phone className="text-green-400" size={24} />
              <div>
                <div className="text-white font-bold">Direct Line</div>
                <div className="text-green-400">+60 17-927-5907</div>
              </div>
            </motion.a>
            
            <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30">
              <Globe className="text-purple-400" size={24} />
              <div>
                <div className="text-white font-bold">Location & Timezone</div>
                <div className="text-purple-400">Kuala Lumpur, Malaysia (GMT+8)</div>
              </div>
            </div>
          </div>

          {/* Digital Marketing Expertise */}
          <div className="mb-8">
            <h5 className="text-xl font-bold text-cyan-400 mb-4">DIGITAL MARKETING EXPERTISE</h5>
            <div className="grid grid-cols-2 gap-4">
              {digitalMarketingExpertise.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-black/50 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="text-white font-bold text-sm">{skill.name}</div>
                  <div className="text-gray-400 text-xs">{skill.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certification Highlights */}
          <div>
            <h5 className="text-xl font-bold text-cyan-400 mb-4">CERTIFICATION HIGHLIGHTS</h5>
            <div className="space-y-4">
              {certificationHighlights.map((cert, index) => (
                <motion.div
                  key={cert.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-gradient-to-r ${cert.color}/20 rounded-lg p-4 border border-gray-600/50`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <cert.icon className="text-cyan-400" size={20} />
                    <span className="text-white font-bold text-sm">{cert.category}</span>
                  </div>
                  <div className="space-y-1">
                    {cert.certifications.map((certification, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300 text-xs">{certification}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg transition-all"
            >
              VIEW ALL 100+ CERTIFICATIONS
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-2xl font-bold text-white mb-6">Send Secure Message</h4>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-cyan-400 text-sm font-bold mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-cyan-400 text-sm font-bold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <MessageCircle size={20} />
                </motion.div>
              ) : (
                <Send size={20} />
              )}
              <span>{isSubmitting ? 'Sending Secure Message...' : 'SEND SECURE MESSAGE'}</span>
            </motion.button>
          </form>

          {/* Quick Actions */}
          <div className="mt-8">
            <h5 className="text-white font-bold mb-4">Quick Actions</h5>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 py-3 rounded-lg font-bold text-sm hover:border-green-400 transition-all"
              >
                Schedule Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 py-3 rounded-lg font-bold text-sm hover:border-blue-400 transition-all"
              >
                Request Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-8 border-t border-gray-700 text-center"
      >
        <div className="text-gray-400 mb-4">
          © 2025 Hanis Wonder Pets Intelligence Center - Advanced AI Solutions 🚀
        </div>
        <div className="text-cyan-400 text-sm">
          Powered by Wonder Pets AI • Built with Innovation • Secured by OSINT
        </div>
      </motion.div>
    </div>
  );
}