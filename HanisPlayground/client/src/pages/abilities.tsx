import { useState, useEffect } from 'react';
import { Brain, Shield, Target, Code, Database, Globe, Zap, Eye, Network, Award, TrendingUp, Activity } from 'lucide-react';
import { useLocation } from 'wouter';

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
  projects: number;
  yearsExp: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

export default function Abilities() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'all',
      name: 'All Competencies',
      icon: Brain,
      color: 'text-white',
      description: 'Complete skill matrix across all domains'
    },
    {
      id: 'intelligence',
      name: 'Intelligence & OSINT',
      icon: Eye,
      color: 'text-red-400',
      description: 'Advanced intelligence gathering and analysis capabilities'
    },
    {
      id: 'ai',
      name: 'AI & Machine Learning',
      icon: Brain,
      color: 'text-blue-400',
      description: 'Neural networks, deep learning, and intelligent systems'
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: Shield,
      color: 'text-green-400',
      description: 'Penetration testing, threat analysis, and security architecture'
    },
    {
      id: 'development',
      name: 'Development & Engineering',
      icon: Code,
      color: 'text-purple-400',
      description: 'Full-stack development and software architecture'
    },
    {
      id: 'data',
      name: 'Data & Analytics',
      icon: Database,
      color: 'text-yellow-400',
      description: 'Big data processing, analysis, and visualization'
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      icon: Target,
      color: 'text-pink-400',
      description: 'Performance marketing and growth optimization'
    }
  ];

  const skills: Skill[] = [
    // Intelligence & OSINT
    { name: 'OSINT Methodology', level: 98, category: 'intelligence', description: 'Advanced open source intelligence gathering techniques', projects: 150, yearsExp: 8 },
    { name: 'Digital Footprinting', level: 96, category: 'intelligence', description: 'Comprehensive digital persona analysis', projects: 200, yearsExp: 7 },
    { name: 'Social Media Intelligence', level: 94, category: 'intelligence', description: 'Platform-specific intelligence extraction', projects: 180, yearsExp: 6 },
    { name: 'Geospatial Analysis', level: 92, category: 'intelligence', description: 'Location-based intelligence and mapping', projects: 120, yearsExp: 5 },
    { name: 'Dark Web Investigation', level: 90, category: 'intelligence', description: 'Deep web research and threat identification', projects: 80, yearsExp: 4 },

    // AI & Machine Learning
    { name: 'Neural Networks', level: 95, category: 'ai', description: 'Deep learning architecture design and optimization', projects: 100, yearsExp: 6 },
    { name: 'Natural Language Processing', level: 93, category: 'ai', description: 'Text analysis and language understanding systems', projects: 85, yearsExp: 5 },
    { name: 'Computer Vision', level: 91, category: 'ai', description: 'Image recognition and visual intelligence', projects: 70, yearsExp: 4 },
    { name: 'Reinforcement Learning', level: 88, category: 'ai', description: 'Self-improving AI systems and decision making', projects: 45, yearsExp: 3 },
    { name: 'MLOps & Deployment', level: 94, category: 'ai', description: 'Production ML pipeline management', projects: 90, yearsExp: 5 },

    // Cybersecurity
    { name: 'Penetration Testing', level: 97, category: 'security', description: 'Comprehensive security vulnerability assessment', projects: 130, yearsExp: 7 },
    { name: 'Threat Intelligence', level: 95, category: 'security', description: 'Advanced persistent threat analysis', projects: 110, yearsExp: 6 },
    { name: 'Digital Forensics', level: 92, category: 'security', description: 'Evidence collection and analysis', projects: 95, yearsExp: 5 },
    { name: 'Security Architecture', level: 90, category: 'security', description: 'Enterprise security framework design', projects: 75, yearsExp: 6 },
    { name: 'Malware Analysis', level: 89, category: 'security', description: 'Reverse engineering and threat analysis', projects: 65, yearsExp: 4 },

    // Development & Engineering
    { name: 'Python', level: 96, category: 'development', description: 'Advanced Python development and automation', projects: 250, yearsExp: 8 },
    { name: 'JavaScript/TypeScript', level: 94, category: 'development', description: 'Full-stack web application development', projects: 200, yearsExp: 7 },
    { name: 'React/Node.js', level: 93, category: 'development', description: 'Modern web framework expertise', projects: 180, yearsExp: 6 },
    { name: 'Cloud Architecture', level: 91, category: 'development', description: 'AWS, GCP, Azure infrastructure design', projects: 120, yearsExp: 5 },
    { name: 'DevOps & CI/CD', level: 89, category: 'development', description: 'Automated deployment and infrastructure', projects: 100, yearsExp: 4 },

    // Data & Analytics
    { name: 'Big Data Processing', level: 94, category: 'data', description: 'Large-scale data pipeline design', projects: 140, yearsExp: 6 },
    { name: 'SQL & NoSQL', level: 96, category: 'data', description: 'Advanced database design and optimization', projects: 220, yearsExp: 8 },
    { name: 'Data Visualization', level: 92, category: 'data', description: 'Interactive dashboard and reporting', projects: 160, yearsExp: 5 },
    { name: 'Statistical Analysis', level: 90, category: 'data', description: 'Advanced statistical modeling', projects: 130, yearsExp: 6 },
    { name: 'ETL Pipelines', level: 93, category: 'data', description: 'Data extraction, transformation, and loading', projects: 150, yearsExp: 5 },

    // Digital Marketing
    { name: 'Google Ads', level: 97, category: 'marketing', description: 'Advanced campaign optimization and automation', projects: 300, yearsExp: 7 },
    { name: 'Facebook Advertising', level: 95, category: 'marketing', description: 'Social media advertising mastery', projects: 280, yearsExp: 6 },
    { name: 'SEO & Content Strategy', level: 93, category: 'marketing', description: 'Organic growth and content optimization', projects: 200, yearsExp: 6 },
    { name: 'Conversion Optimization', level: 94, category: 'marketing', description: 'A/B testing and funnel optimization', projects: 250, yearsExp: 5 },
    { name: 'Marketing Analytics', level: 96, category: 'marketing', description: 'Attribution modeling and performance analysis', projects: 220, yearsExp: 6 }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getSkillColor = (level: number) => {
    if (level >= 95) return 'from-green-500 to-emerald-400';
    if (level >= 90) return 'from-blue-500 to-cyan-400';
    if (level >= 85) return 'from-purple-500 to-violet-400';
    return 'from-yellow-500 to-orange-400';
  };

  const stats = [
    { label: 'Total Skills', value: skills.length, icon: Brain },
    { label: 'Expert Level (90+)', value: skills.filter(s => s.level >= 90).length, icon: Award },
    { label: 'Total Projects', value: skills.reduce((acc, s) => acc + s.projects, 0), icon: TrendingUp },
    { label: 'Years Experience', value: Math.max(...skills.map(s => s.yearsExp)), icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Universe
          </button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-400" />
            Core Competencies
          </h1>
          
          <div className="text-green-400 text-sm font-mono">
            {filteredSkills.length} Skills Active
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Strategic Capabilities Matrix
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of technical expertise, strategic competencies, 
            and operational capabilities across multiple high-impact domains.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30">
                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Filter by Domain</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-xl transition-all
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50'
                      : 'bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/30'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${category.color}`} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all cursor-pointer group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">{skill.level}%</div>
                  <div className="text-xs text-gray-400">{skill.yearsExp}y exp</div>
                </div>
              </div>

              {/* Skill Bar */}
              <div className="relative mb-4">
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{skill.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>{skill.projects} projects</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  skill.level >= 95 ? 'bg-green-500/20 text-green-400' :
                  skill.level >= 90 ? 'bg-blue-500/20 text-blue-400' :
                  skill.level >= 85 ? 'bg-purple-500/20 text-purple-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {skill.level >= 95 ? 'Master' :
                   skill.level >= 90 ? 'Expert' :
                   skill.level >= 85 ? 'Advanced' : 'Proficient'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Competency Matrix */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Strategic Impact Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(1).map((category) => {
              const Icon = category.icon;
              const categorySkills = skills.filter(s => s.category === category.id);
              const avgLevel = categorySkills.reduce((acc, s) => acc + s.level, 0) / categorySkills.length;
              
              return (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 hover:border-cyan-500/30 transition-all group"
                >
                  <Icon className={`w-12 h-12 ${category.color} mb-6 group-hover:animate-pulse`} />
                  <h3 className="text-2xl font-bold mb-4 text-white">{category.name}</h3>
                  <p className="text-gray-300 mb-6">{category.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Domain Mastery</span>
                      <span className="text-cyan-400 font-bold">{Math.round(avgLevel)}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r ${getSkillColor(avgLevel)} rounded-full transition-all duration-1000`}
                        style={{ width: `${avgLevel}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{categorySkills.length} skills</span>
                      <span>{categorySkills.reduce((acc, s) => acc + s.projects, 0)} projects</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Philosophy */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">Capability Philosophy</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              "True expertise is not just about mastering individual skills—it's about understanding how they interconnect, 
              amplify each other, and create solutions that transcend the sum of their parts. Every capability in this matrix 
              serves a larger purpose: building a more intelligent, secure, and connected digital future."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/neural-bio')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Explore Journey
              </button>
              <button
                onClick={() => navigate('/certifications')}
                className="border border-cyan-500/50 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                View Certifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}