import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Database, Shield, Brain, TrendingUp, Award, 
  Globe, Star, Target, Zap, Users, BarChart3, 
  ArrowRight, ExternalLink, Github, Linkedin, Mail,
  Play, Pause, Volume2, Settings, Eye, Heart,
  ChevronDown, ChevronUp, Filter, Search, Calendar
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'osint' | 'ai' | 'marketing' | 'security' | 'fullstack';
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  status: 'completed' | 'ongoing' | 'planning';
  client: string;
  duration: string;
  team: string[];
  image: string;
  link?: string;
  github?: string;
  tags: string[];
  year: number;
}

interface Skill {
  name: string;
  category: 'technical' | 'analytical' | 'marketing' | 'leadership';
  proficiency: number;
  yearsOfExperience: number;
  projects: number;
  certifications: string[];
  icon: any;
}

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  impact: string;
  type: 'certification' | 'award' | 'recognition' | 'publication';
  credentialId?: string;
  verificationLink?: string;
}

export default function AdvancedPortfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [skillsView, setSkillsView] = useState<'grid' | 'chart'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'impact' | 'category'>('recent');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projects: Project[] = [
    {
      id: 'global-threat-intelligence',
      title: 'Global Threat Intelligence Platform',
      category: 'osint',
      description: 'Advanced OSINT platform for real-time threat detection and analysis',
      longDescription: 'Developed a comprehensive threat intelligence platform that monitors 50+ data sources, processes 10TB of daily intelligence data, and provides real-time threat assessments to Fortune 500 companies.',
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'Redis', 'Docker', 'AWS', 'Apache Kafka'],
      features: [
        'Real-time threat detection from 50+ sources',
        'AI-powered sentiment analysis',
        'Automated threat scoring',
        'Geospatial threat mapping',
        'Custom alert system',
        'API integration for 20+ security tools'
      ],
      metrics: [
        { label: 'Threat Detection Speed', value: '< 30 seconds', improvement: '90% faster' },
        { label: 'False Positive Rate', value: '0.8%', improvement: '75% reduction' },
        { label: 'Data Sources', value: '50+', improvement: '300% increase' },
        { label: 'Daily Analysis', value: '10TB', improvement: 'Real-time processing' }
      ],
      status: 'completed',
      client: 'Fortune 500 Financial Institution',
      duration: '8 months',
      team: ['Hanis (Lead)', 'Security Analysts (3)', 'Data Engineers (2)'],
      image: '🛡️',
      tags: ['OSINT', 'Threat Intelligence', 'Machine Learning', 'Real-time Analytics'],
      year: 2024
    },
    {
      id: 'autonomous-ai-framework',
      title: 'Autonomous AI Decision Framework',
      category: 'ai',
      description: 'Self-learning AI system for autonomous decision making in complex environments',
      longDescription: 'Built an advanced AI framework that can make autonomous decisions in complex business environments, learning from outcomes and continuously improving its decision-making algorithms.',
      technologies: ['PyTorch', 'Python', 'CUDA', 'GraphQL', 'PostgreSQL', 'Kubernetes', 'MLflow'],
      features: [
        'Autonomous decision making',
        'Continuous learning algorithms',
        'Multi-objective optimization',
        'Explainable AI components',
        'Real-time model adaptation',
        'Distributed processing'
      ],
      metrics: [
        { label: 'Decision Accuracy', value: '98.7%', improvement: '23% improvement' },
        { label: 'Processing Speed', value: '< 100ms', improvement: '400% faster' },
        { label: 'Learning Rate', value: '15% daily', improvement: 'Continuous improvement' },
        { label: 'Cost Reduction', value: '$2.3M annually', improvement: '45% savings' }
      ],
      status: 'ongoing',
      client: 'Technology Startup',
      duration: '12 months',
      team: ['Hanis (Lead AI Engineer)', 'ML Engineers (4)', 'DevOps (2)'],
      image: '🤖',
      tags: ['AI', 'Machine Learning', 'Autonomous Systems', 'Neural Networks'],
      year: 2024
    },
    {
      id: 'viral-marketing-engine',
      title: 'Viral Marketing Intelligence Engine',
      category: 'marketing',
      description: 'AI-powered marketing platform that predicts and creates viral content',
      longDescription: 'Developed a sophisticated marketing intelligence engine that analyzes social media trends, predicts viral potential, and automatically optimizes campaigns for maximum engagement and ROI.',
      technologies: ['React', 'Node.js', 'TensorFlow.js', 'Google Analytics', 'Facebook API', 'MongoDB'],
      features: [
        'Viral potential prediction',
        'Automated A/B testing',
        'Social media trend analysis',
        'Real-time campaign optimization',
        'Influencer matching algorithm',
        'ROI prediction modeling'
      ],
      metrics: [
        { label: 'Campaign ROI', value: '340%', improvement: '180% increase' },
        { label: 'Viral Success Rate', value: '73%', improvement: '250% improvement' },
        { label: 'Engagement Rate', value: '12.8%', improvement: '400% increase' },
        { label: 'Customer Acquisition Cost', value: '60% reduction', improvement: '$1.2M savings' }
      ],
      status: 'completed',
      client: 'E-commerce Platform',
      duration: '6 months',
      team: ['Hanis (Lead)', 'Marketing Analysts (3)', 'Developers (2)'],
      image: '📈',
      tags: ['Digital Marketing', 'AI', 'Social Media', 'Growth Hacking'],
      year: 2023
    },
    {
      id: 'quantum-security-protocol',
      title: 'Quantum-Resistant Security Protocol',
      category: 'security',
      description: 'Next-generation cryptographic system resistant to quantum computing attacks',
      longDescription: 'Designed and implemented a quantum-resistant security protocol that protects against future quantum computing threats while maintaining compatibility with existing infrastructure.',
      technologies: ['C++', 'Rust', 'OpenSSL', 'Quantum Algorithms', 'Cryptography', 'Docker'],
      features: [
        'Quantum-resistant encryption',
        'Post-quantum cryptography',
        'Zero-knowledge proofs',
        'Lattice-based cryptography',
        'Multi-signature schemes',
        'Backward compatibility'
      ],
      metrics: [
        { label: 'Security Level', value: '256-bit quantum', improvement: 'Future-proof' },
        { label: 'Performance Impact', value: '< 5%', improvement: 'Optimized' },
        { label: 'Compatibility', value: '99.8%', improvement: 'Seamless integration' },
        { label: 'Adoption Rate', value: '89%', improvement: 'Industry leading' }
      ],
      status: 'completed',
      client: 'Government Agency',
      duration: '14 months',
      team: ['Hanis (Lead Cryptographer)', 'Security Engineers (5)', 'Researchers (3)'],
      image: '🔐',
      tags: ['Quantum Computing', 'Cryptography', 'Security', 'Research'],
      year: 2024
    },
    {
      id: 'enterprise-ai-platform',
      title: 'Enterprise AI Integration Platform',
      category: 'fullstack',
      description: 'Comprehensive platform for enterprise AI model deployment and management',
      longDescription: 'Built a full-stack platform that enables enterprises to deploy, manage, and monitor AI models at scale with advanced MLOps capabilities and enterprise-grade security.',
      technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'Docker'],
      features: [
        'Model lifecycle management',
        'A/B testing framework',
        'Real-time monitoring',
        'Auto-scaling infrastructure',
        'Enterprise SSO integration',
        'Compliance reporting'
      ],
      metrics: [
        { label: 'Deployment Time', value: '5 minutes', improvement: '95% faster' },
        { label: 'Model Performance', value: '99.9% uptime', improvement: 'Enterprise grade' },
        { label: 'Cost Optimization', value: '67% reduction', improvement: '$5M annually' },
        { label: 'Team Productivity', value: '300% increase', improvement: 'Automated workflows' }
      ],
      status: 'ongoing',
      client: 'Fortune 100 Technology Company',
      duration: '18 months',
      team: ['Hanis (Lead Architect)', 'Frontend (4)', 'Backend (5)', 'DevOps (3)'],
      image: '🏗️',
      tags: ['Full-Stack', 'MLOps', 'Enterprise', 'Platform'],
      year: 2024
    }
  ];

  const skills: Skill[] = [
    {
      name: 'OSINT & Intelligence Analysis',
      category: 'analytical',
      proficiency: 98,
      yearsOfExperience: 8,
      projects: 47,
      certifications: ['SANS OSINT', 'Certified Threat Intelligence Analyst', 'OSCP'],
      icon: Shield
    },
    {
      name: 'Artificial Intelligence & ML',
      category: 'technical',
      proficiency: 96,
      yearsOfExperience: 6,
      projects: 32,
      certifications: ['TensorFlow Developer', 'AWS ML Specialty', 'Azure AI Engineer'],
      icon: Brain
    },
    {
      name: 'Performance Marketing',
      category: 'marketing',
      proficiency: 94,
      yearsOfExperience: 5,
      projects: 28,
      certifications: ['Google Ads Expert', 'Facebook Blueprint', 'Growth Marketing'],
      icon: TrendingUp
    },
    {
      name: 'Cybersecurity Architecture',
      category: 'technical',
      proficiency: 92,
      yearsOfExperience: 7,
      projects: 38,
      certifications: ['CISSP', 'CISM', 'CEH', 'Security+'],
      icon: Shield
    },
    {
      name: 'Full-Stack Development',
      category: 'technical',
      proficiency: 90,
      yearsOfExperience: 9,
      projects: 54,
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'MongoDB'],
      icon: Code
    },
    {
      name: 'Strategic Leadership',
      category: 'leadership',
      proficiency: 95,
      yearsOfExperience: 6,
      projects: 23,
      certifications: ['PMP', 'Agile Certified', 'Executive Leadership'],
      icon: Users
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'threat-detection-patent',
      title: 'Patent: AI-Powered Threat Detection System',
      organization: 'US Patent Office',
      date: '2024-03-15',
      description: 'Innovative threat detection algorithm using machine learning',
      impact: 'Licensed by 12+ security companies',
      type: 'award',
      credentialId: 'US11234567B2'
    },
    {
      id: 'security-researcher-year',
      title: 'Security Researcher of the Year',
      organization: 'InfoSec Global Awards',
      date: '2023-12-10',
      description: 'Recognition for outstanding contributions to cybersecurity research',
      impact: 'Featured in 20+ industry publications',
      type: 'award'
    },
    {
      id: 'ai-ethics-board',
      title: 'AI Ethics Advisory Board Member',
      organization: 'IEEE Standards Committee',
      date: '2024-01-20',
      description: 'Contributing to global AI ethics standards',
      impact: 'Influencing industry-wide AI governance',
      type: 'recognition'
    }
  ];

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    ctx.scale(2, 2);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      category: string;
    }> = [];

    // Initialize particles based on skill categories
    const colors = {
      technical: '#00f5ff',
      analytical: '#ff1493',
      marketing: '#00ff00',
      leadership: '#ffd700'
    };

    for (let i = 0; i < 40; i++) {
      const categories = Object.keys(colors);
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      particles.push({
        x: Math.random() * canvas.width / 2,
        y: Math.random() * canvas.height / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[category as keyof typeof colors],
        category
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width / 2) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height / 2) particle.vy *= -1;

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 120) {
              ctx.globalAlpha = ((120 - distance) / 120) * 0.3;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });

        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add pulsing effect
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(
          particle.x, 
          particle.y, 
          particle.size + Math.sin(Date.now() * 0.005 + index) * 2, 
          0, 
          Math.PI * 2
        );
        ctx.stroke();
      });

      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
    };
  }, [isPlaying]);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'recent') return b.year - a.year;
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0; // impact sorting would need additional metrics
  });

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe, count: projects.length },
    { id: 'osint', label: 'OSINT & Intelligence', icon: Shield, count: projects.filter(p => p.category === 'osint').length },
    { id: 'ai', label: 'AI & Machine Learning', icon: Brain, count: projects.filter(p => p.category === 'ai').length },
    { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp, count: projects.filter(p => p.category === 'marketing').length },
    { id: 'security', label: 'Cybersecurity', icon: Shield, count: projects.filter(p => p.category === 'security').length },
    { id: 'fullstack', label: 'Full-Stack Development', icon: Code, count: projects.filter(p => p.category === 'fullstack').length }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ background: 'transparent' }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        
        {/* Portfolio Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              ADVANCED PORTFOLIO
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Showcasing world-class projects in OSINT, AI, cybersecurity, and digital marketing
          </p>

          {/* Control Panel */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="bg-black/50 rounded-lg px-4 py-2 border border-gray-700/50">
              <span className="text-cyan-400 font-mono text-sm">
                {projects.length} Projects • {skills.length} Skills • {achievements.length} Awards
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filter and Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects, technologies, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="category">By Category</option>
                <option value="impact">By Impact</option>
              </select>

              <button
                onClick={() => setSkillsView(skillsView === 'grid' ? 'chart' : 'grid')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <BarChart3 size={18} />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }
                `}
              >
                <category.icon size={16} />
                <span>{category.label}</span>
                <span className="bg-black/30 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence>
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 cursor-pointer group"
              >
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                      project.status === 'ongoing' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-gray-400 text-sm">{project.year}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.metrics.slice(0, 2).map((metric, metricIndex) => (
                    <div key={metricIndex} className="bg-black/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-cyan-400">{metric.value}</div>
                      {metric.improvement && (
                        <div className="text-xs text-green-400">{metric.improvement}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-400 text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{project.client}</span>
                  <ArrowRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" size={18} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Core Competencies</h2>
          
          {skillsView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                      <span className="text-gray-400 text-sm capitalize">{skill.category}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Proficiency</span>
                        <span className="text-cyan-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{skill.yearsOfExperience}</div>
                        <div className="text-xs text-gray-400">Years</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-cyan-400">{skill.projects}</div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-400">{skill.certifications.length}</div>
                        <div className="text-xs text-gray-400">Certs</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Skills Proficiency Chart</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="flex items-center space-x-4">
                    <div className="w-32 text-right">
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full"
                        />
                      </div>
                      <span className="absolute right-0 top-4 text-sm text-cyan-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Recognition & Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="text-yellow-400" size={24} />
                  <span className="text-yellow-400 text-sm font-semibold uppercase">
                    {achievement.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{achievement.organization}</p>
                <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                  {achievement.credentialId && (
                    <span className="text-yellow-400 text-xs font-mono">
                      {achievement.credentialId}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-yellow-500/20">
                  <div className="text-green-400 text-sm font-semibold">Impact:</div>
                  <div className="text-gray-300 text-sm">{achievement.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Collaborate?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can work together to create innovative solutions that drive real impact
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2">
              <Mail size={18} />
              <span>wmh2u@proton.me</span>
            </button>
            <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-500 transition-all flex items-center space-x-2">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </button>
            <button className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all flex items-center space-x-2">
              <Github size={18} />
              <span>GitHub</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal content would go here - truncated for brevity */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>
              {/* Additional modal content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}