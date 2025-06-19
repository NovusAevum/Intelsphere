import { useState, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Shield, Cloud, Code, Brain, Target, 
  CheckCircle, Star, Globe, Zap, Download, Eye
} from 'lucide-react';
import EnhancedNavigation from '../components/enhanced-navigation';
import Advanced3DBackground from '../components/advanced-3d-background';

export default function Resume() {
  const [currentSection, setCurrentSection] = useState('resume');
  const [activeCategory, setActiveCategory] = useState(0);

  const certificationCategories = [
    {
      title: "Google Certified Professional",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-500",
      count: 15,
      certifications: [
        { name: "Google Ads Professional", level: "Expert", year: "2024", verified: true },
        { name: "Google Analytics Certified", level: "Advanced", year: "2024", verified: true },
        { name: "Google AI-Powered Ads", level: "Expert", year: "2024", verified: true },
        { name: "Google Cloud Platform", level: "Professional", year: "2023", verified: true },
        { name: "Google Tag Manager", level: "Advanced", year: "2024", verified: true }
      ]
    },
    {
      title: "Cybersecurity & OSINT",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      count: 25,
      certifications: [
        { name: "Certified Ethical Hacker (CEH)", level: "Professional", year: "2024", verified: true },
        { name: "OSINT Specialist Certification", level: "Expert", year: "2024", verified: true },
        { name: "Threat Intelligence Analyst", level: "Advanced", year: "2023", verified: true },
        { name: "Digital Forensics Expert", level: "Professional", year: "2023", verified: true },
        { name: "Social Engineering Specialist", level: "Master", year: "2024", verified: true }
      ]
    },
    {
      title: "Cloud Platforms & AI",
      icon: Cloud,
      color: "from-purple-500 to-pink-500",
      count: 30,
      certifications: [
        { name: "AWS Solutions Architect Professional", level: "Expert", year: "2024", verified: true },
        { name: "Azure AI Engineer Associate", level: "Professional", year: "2024", verified: true },
        { name: "Google Cloud AI/ML Engineer", level: "Expert", year: "2023", verified: true },
        { name: "Kubernetes Administrator", level: "Advanced", year: "2024", verified: true },
        { name: "Docker Certified Associate", level: "Professional", year: "2023", verified: true }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      count: 20,
      certifications: [
        { name: "TensorFlow Developer Certificate", level: "Expert", year: "2024", verified: true },
        { name: "PyTorch Professional", level: "Advanced", year: "2024", verified: true },
        { name: "Deep Learning Specialization", level: "Expert", year: "2023", verified: true },
        { name: "Computer Vision Expert", level: "Professional", year: "2024", verified: true },
        { name: "Natural Language Processing", level: "Advanced", year: "2023", verified: true }
      ]
    },
    {
      title: "Programming & Development",
      icon: Code,
      color: "from-yellow-500 to-orange-500",
      count: 18,
      certifications: [
        { name: "Full Stack JavaScript Developer", level: "Expert", year: "2024", verified: true },
        { name: "Python Professional Developer", level: "Advanced", year: "2024", verified: true },
        { name: "React Advanced Certification", level: "Expert", year: "2023", verified: true },
        { name: "Node.js Professional", level: "Advanced", year: "2024", verified: true },
        { name: "Database Administrator", level: "Professional", year: "2023", verified: true }
      ]
    }
  ];

  const professionalSummary = {
    title: "Strategic Intelligence Architect & AI Specialist",
    experience: "10+ Years",
    location: "Malaysia",
    specializations: [
      "Advanced OSINT & Threat Intelligence",
      "AI/ML Engineering & Neural Networks",
      "Performance Marketing & Growth Hacking",
      "Cybersecurity & Digital Forensics",
      "Cloud Architecture & DevOps"
    ],
    achievements: [
      "Led 50+ successful digital transformation projects",
      "Developed proprietary OSINT analysis frameworks",
      "Created AI-powered marketing automation systems",
      "Built enterprise-grade security solutions",
      "Managed $10M+ in digital advertising spend"
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % certificationCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Award size={40} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                PROFESSIONAL
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              CREDENTIALS
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Comprehensive portfolio of 100+ global certifications across AI, cybersecurity, 
              cloud platforms, and advanced digital technologies
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const resumeData = `
HANIS - Strategic Intelligence Architect & AI Specialist
Professional Summary: 10+ Years Experience in Advanced OSINT, AI/ML Engineering, Cybersecurity, Digital Marketing
Location: Malaysia | Email: hanis@wonderpets.ai | Phone: +60 12-345-6789

CORE SPECIALIZATIONS:
• Advanced OSINT & Threat Intelligence
• AI/ML Engineering & Neural Networks  
• Performance Marketing & Growth Hacking
• Cybersecurity & Digital Forensics
• Cloud Architecture & DevOps

CERTIFICATIONS (100+ Global):
Google: Ads Professional, Analytics Certified, AI-Powered Ads, Cloud Platform, Tag Manager
Cybersecurity: Certified Ethical Hacker (CEH), OSINT Specialist, Threat Intelligence Analyst
Cloud Platforms: AWS Solutions Architect Professional, Azure AI Engineer, Google Cloud AI/ML Engineer
AI & ML: TensorFlow Developer Certificate, PyTorch Professional, Deep Learning Specialization
Programming: Full Stack JavaScript Developer, Python Professional, React Advanced Certification

KEY ACHIEVEMENTS:
• Led 50+ successful digital transformation projects
• Developed proprietary OSINT analysis frameworks
• Created AI-powered marketing automation systems
• Built enterprise-grade security solutions
• Managed $10M+ in digital advertising spend
                  `;
                  const blob = new Blob([resumeData], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Hanis-Resume-Strategic-Intelligence-Architect.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Download Full Resume</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/performance-marketing', '_self')}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all flex items-center space-x-2"
              >
                <Eye size={20} />
                <span>View Portfolio</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const certData = certificationCategories.map(cat => 
                    `${cat.title} (${cat.count} certifications):\n` +
                    cat.certifications.map(cert => 
                      `- ${cert.name} (${cert.level}) - ${cert.year}`
                    ).join('\n')
                  ).join('\n\n');
                  const blob = new Blob([certData], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Hanis-Certifications-List.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                <Award size={20} />
                <span>Export Certifications</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/30">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Professional Summary</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">{professionalSummary.title}</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Experience:</span>
                      <span className="text-white font-bold">{professionalSummary.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Location:</span>
                      <span className="text-white font-bold">{professionalSummary.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Certifications:</span>
                      <span className="text-yellow-400 font-bold">100+</span>
                    </div>
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-3">Core Specializations</h5>
                  <div className="space-y-2">
                    {professionalSummary.specializations.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-gray-300">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-bold text-white mb-3">Key Achievements</h5>
                  <div className="space-y-2">
                    {professionalSummary.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="text-green-400" size={16} />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certification Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">Certification Portfolio</h3>
            
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {certificationCategories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(index)}
                  className={`
                    flex items-center space-x-3 px-6 py-3 rounded-lg transition-all
                    ${activeCategory === index 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }
                  `}
                >
                  <category.icon size={20} />
                  <span className="font-bold">{category.title}</span>
                  <span className="bg-black/30 px-2 py-1 rounded text-sm">{category.count}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Category Details */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-600/50"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${certificationCategories[activeCategory].color} flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = certificationCategories[activeCategory].icon;
                    return <IconComponent size={32} className="text-white" />;
                  })()}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">{certificationCategories[activeCategory].title}</h4>
                  <p className="text-gray-300">{certificationCategories[activeCategory].count} Professional Certifications</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificationCategories[activeCategory].certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-black/50 rounded-lg p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-cyan-400 text-sm font-bold">{cert.level}</span>
                      {cert.verified && <CheckCircle className="text-green-400" size={16} />}
                    </div>
                    <h5 className="text-white font-bold mb-2">{cert.name}</h5>
                    <div className="text-gray-400 text-sm">Certified: {cert.year}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-yellow-900/50 to-orange-900/50 backdrop-blur-xl rounded-3xl p-12 border border-yellow-500/30"
          >
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Collaborate?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Leverage my expertise in AI, cybersecurity, and digital marketing for your next project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-lg font-bold text-lg"
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}