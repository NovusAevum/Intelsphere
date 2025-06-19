import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, User, MessageSquare, 
  CheckCircle, ExternalLink, Shield, Award, Clock
} from 'lucide-react';
import EnhancedNavigation from '../components/enhanced-navigation';
import Advanced3DBackground from '../components/advanced-3d-background';

export default function Contact() {
  const [currentSection, setCurrentSection] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const contactInfo = {
    email: "hanis@wonderpets.ai",
    phone: "+60 12-345-6789",
    location: "Kuala Lumpur, Malaysia",
    timezone: "GMT+8 (Malaysia Time)",
    languages: ["English", "Bahasa Malaysia", "Mandarin"],
    responseTime: "Within 24 hours"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Advanced3DBackground />
      
      <EnhancedNavigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <div className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.5)',
                  '0 0 40px rgba(34, 197, 94, 0.8)',
                  '0 0 20px rgba(34, 197, 94, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center"
            >
              <Mail size={40} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                CONNECT
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              WITH THE TEAM
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Ready to explore advanced intelligence solutions? Let's discuss your project requirements
              and discover how Wonder Pets AI can transform your digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30"
            >
              <h3 className="text-3xl font-bold text-white mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Email Address</p>
                    <p className="text-white font-bold">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Phone Number</p>
                    <p className="text-white font-bold">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Location</p>
                    <p className="text-white font-bold">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Response Time</p>
                    <p className="text-white font-bold">{contactInfo.responseTime}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">Languages Supported</h4>
                <div className="flex flex-wrap gap-2">
                  {contactInfo.languages.map((lang, index) => (
                    <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-bold text-white mb-4">Timezone</h4>
                <p className="text-gray-300">{contactInfo.timezone}</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30"
            >
              <h3 className="text-3xl font-bold text-white mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all"
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-all resize-none"
                      placeholder="Describe your project requirements, questions, or how we can assist you..."
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Security & Privacy Notice */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Shield className="text-blue-400" size={32} />
              <h3 className="text-2xl font-bold text-white">Secure Communication</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-3xl mx-auto">
              All communications are encrypted and handled with the highest security standards. 
              Your information is protected and will never be shared with third parties.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center space-x-2 text-blue-400">
                <CheckCircle size={16} />
                <span>End-to-End Encryption</span>
              </span>
              <span className="flex items-center space-x-2 text-green-400">
                <CheckCircle size={16} />
                <span>GDPR Compliant</span>
              </span>
              <span className="flex items-center space-x-2 text-purple-400">
                <CheckCircle size={16} />
                <span>SOC 2 Certified</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}