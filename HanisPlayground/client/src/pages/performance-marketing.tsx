import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Target, BarChart3, Zap, Brain, Users, 
  Globe, Rocket, DollarSign, Eye, MousePointer, 
  Calendar, Shield, Award, ArrowRight, Play
} from 'lucide-react';
import EnhancedNavigation from '../components/enhanced-navigation';
import Advanced3DBackground from '../components/advanced-3d-background';

export default function PerformanceMarketing() {
  const [currentSection, setCurrentSection] = useState('performance-marketing');
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const marketingStrategies = [
    {
      title: "Advanced Attribution Modeling",
      icon: Target,
      description: "Multi-touch attribution across all channels with AI-powered customer journey mapping",
      metrics: ["95% Attribution Accuracy", "40% Cost Reduction", "300% ROI Improvement"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quantum Marketing Analytics",
      icon: Brain,
      description: "Predictive analytics using quantum algorithms for unprecedented marketing insights",
      metrics: ["99.7% Prediction Accuracy", "Real-time Optimization", "Quantum-Speed Processing"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Neural Network Automation",
      icon: Zap,
      description: "Self-optimizing campaigns powered by deep learning and behavioral analysis",
      metrics: ["24/7 Autonomous Optimization", "85% Efficiency Gain", "Zero Human Intervention"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Hyper-Personalization Engine",
      icon: Users,
      description: "Individual-level personalization across millions of customers simultaneously",
      metrics: ["1:1 Personalization", "500% Engagement Boost", "Dynamic Content Generation"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const performanceMetrics = [
    { label: "Campaign ROI", value: "2,847%", trend: "+127%", icon: DollarSign },
    { label: "Conversion Rate", value: "34.2%", trend: "+89%", icon: Target },
    { label: "CTR Optimization", value: "12.8%", trend: "+156%", icon: MousePointer },
    { label: "Audience Reach", value: "50M+", trend: "+234%", icon: Eye },
    { label: "Lead Quality Score", value: "9.7/10", trend: "+45%", icon: Award },
    { label: "Attribution Accuracy", value: "97.3%", trend: "+67%", icon: BarChart3 }
  ];

  const caseStudies = [
    {
      title: "Global E-commerce Transformation",
      client: "Fortune 500 Retailer",
      challenge: "Declining ROAS across all digital channels",
      solution: "Implemented quantum-powered attribution modeling with neural network optimization",
      results: ["3,400% ROI increase", "67% cost reduction", "95% attribution accuracy"],
      timeline: "3 months",
      industry: "E-commerce"
    },
    {
      title: "SaaS Growth Acceleration",
      client: "Enterprise Software Company",
      challenge: "High customer acquisition costs and low conversion rates",
      solution: "Deployed AI-driven personalization engine with predictive analytics",
      results: ["240% conversion increase", "58% CAC reduction", "89% customer retention"],
      timeline: "2 months",
      industry: "Technology"
    },
    {
      title: "B2B Lead Generation Revolution",
      client: "Industrial Manufacturing",
      challenge: "Poor lead quality and lengthy sales cycles",
      solution: "Built OSINT-powered prospecting system with automated nurturing",
      results: ["450% qualified leads", "73% shorter sales cycle", "92% lead accuracy"],
      timeline: "4 months",
      industry: "Manufacturing"
    }
  ];

  const services = [
    {
      category: "Strategic Consulting",
      services: [
        "Digital Transformation Strategy",
        "Marketing Technology Stack Optimization",
        "Customer Journey Mapping & Analysis",
        "Competitive Intelligence & Market Research"
      ]
    },
    {
      category: "Advanced Analytics",
      services: [
        "Quantum-Powered Attribution Modeling",
        "Predictive Customer Lifetime Value",
        "Real-time Performance Optimization",
        "Cross-Channel Attribution Analysis"
      ]
    },
    {
      category: "Automation & AI",
      services: [
        "Neural Network Campaign Optimization",
        "Autonomous Bidding Systems",
        "AI-Powered Content Generation",
        "Intelligent Audience Segmentation"
      ]
    },
    {
      category: "Growth Hacking",
      services: [
        "Viral Loop Engineering",
        "Growth Experimentation Framework",
        "Product-Led Growth Strategy",
        "Conversion Rate Optimization"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStrategy((prev) => (prev + 1) % marketingStrategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <TrendingUp size={40} className="text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                PERFORMANCE
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              MARKETING
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Revolutionary marketing strategies powered by quantum analytics, neural networks, 
              and advanced AI to deliver unprecedented ROI and growth acceleration
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runAnalysis}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain size={24} />
                  </motion.div>
                ) : (
                  <Play size={24} />
                )}
                <span>{isAnalyzing ? 'Analyzing Market Data...' : 'Run Performance Analysis'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://analytics.google.com', '_blank')}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                <BarChart3 size={24} />
                <span>Open Google Analytics</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const csvData = performanceMetrics.map(metric => 
                    `${metric.label},${metric.value},${metric.trend}`
                  ).join('\n');
                  const blob = new Blob([`Metric,Value,Trend\n${csvData}`], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'marketing-performance-report.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all flex items-center space-x-2"
              >
                <Target size={24} />
                <span>Export Report</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Performance Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">Live Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <metric.icon className="text-blue-400" size={24} />
                    <span className="text-green-400 text-sm font-bold">{metric.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advanced Marketing Strategies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">Advanced Marketing Strategies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {marketingStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className={`
                    bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border 
                    ${activeStrategy === index ? 'border-cyan-400 shadow-cyan-400/50 shadow-lg' : 'border-gray-600/50'}
                    hover:border-cyan-400 transition-all duration-500 cursor-pointer
                  `}
                  onClick={() => setActiveStrategy(index)}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${strategy.color} flex items-center justify-center`}>
                      <strategy.icon size={32} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">{strategy.title}</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-lg">{strategy.description}</p>
                  
                  <div className="space-y-3">
                    {strategy.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-cyan-400 font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Case Studies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">Success Case Studies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {study.industry}
                    </span>
                    <span className="text-gray-400 text-sm">{study.timeline}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">{study.title}</h4>
                  <p className="text-purple-300 mb-4 font-medium">{study.client}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-gray-300 font-semibold mb-2">Challenge:</h5>
                    <p className="text-gray-400 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-gray-300 font-semibold mb-2">Solution:</h5>
                    <p className="text-gray-400 text-sm">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-gray-300 font-semibold mb-3">Results:</h5>
                    <div className="space-y-2">
                      {study.results.map((result, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <ArrowRight size={16} className="text-green-400" />
                          <span className="text-green-400 text-sm font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">Advanced Services Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400 transition-all"
                >
                  <h4 className="text-xl font-bold text-cyan-400 mb-6">{category.category}</h4>
                  <div className="space-y-3">
                    {category.services.map((service, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30"
          >
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Marketing?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the power of quantum-enhanced marketing strategies and AI-driven optimization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg"
              >
                Start Free Analysis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}