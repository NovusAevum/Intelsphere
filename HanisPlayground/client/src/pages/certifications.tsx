import { useState } from 'react';
import { Award, ExternalLink, Eye, Shield, Brain, Target, Code, Database, Globe, Zap, Calendar, Star } from 'lucide-react';
import { useLocation } from 'wouter';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationLink: string;
  category: 'security' | 'ai' | 'cloud' | 'marketing' | 'intelligence';
  level: 'Professional' | 'Expert' | 'Master' | 'Associate';
  description: string;
  skills: string[];
  image?: string;
}

export default function Certifications() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: 'ceh',
      title: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      date: '2023',
      credentialId: 'ECC-CEH-2023-12345',
      verificationLink: 'https://aspen.eccouncil.org/Verify',
      category: 'security',
      level: 'Professional',
      description: 'Advanced ethical hacking techniques, penetration testing methodologies, and vulnerability assessment protocols.',
      skills: ['Penetration Testing', 'Vulnerability Assessment', 'Network Security', 'Social Engineering', 'Malware Analysis']
    },
    {
      id: 'aws-solutions',
      title: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAP-2023-67890',
      verificationLink: 'https://aws.amazon.com/verification',
      category: 'cloud',
      level: 'Professional',
      description: 'Design and deploy dynamically scalable, highly available, fault-tolerant, and reliable applications on AWS.',
      skills: ['Cloud Architecture', 'AWS Services', 'High Availability', 'Security', 'Cost Optimization']
    },
    {
      id: 'gcp-ml',
      title: 'Google Cloud Professional ML Engineer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-MLE-2023-11111',
      verificationLink: 'https://cloud.google.com/certification/verify',
      category: 'ai',
      level: 'Professional',
      description: 'Design, build, and productionize ML models to solve business challenges using Google Cloud technologies.',
      skills: ['Machine Learning', 'TensorFlow', 'BigQuery ML', 'Vertex AI', 'MLOps']
    },
    {
      id: 'cissp',
      title: 'CISSP - Certified Information Systems Security Professional',
      issuer: '(ISC)² International',
      date: '2022',
      credentialId: 'CISSP-2022-22222',
      verificationLink: 'https://www.isc2.org/Certification-Verification',
      category: 'security',
      level: 'Expert',
      description: 'Advanced knowledge in cybersecurity across eight domains of the CISSP Common Body of Knowledge.',
      skills: ['Security Architecture', 'Risk Management', 'Cryptography', 'Identity Management', 'Security Operations']
    },
    {
      id: 'cia',
      title: 'Certified Intelligence Analyst (CIA)',
      issuer: 'International Association for Intelligence Education',
      date: '2022',
      credentialId: 'CIA-2022-33333',
      verificationLink: 'https://www.iafie.org/verification',
      category: 'intelligence',
      level: 'Expert',
      description: 'Advanced intelligence analysis methodologies, threat assessment, and strategic intelligence reporting.',
      skills: ['OSINT', 'Threat Intelligence', 'Analysis Techniques', 'Intelligence Reporting', 'Source Evaluation']
    },
    {
      id: 'azure-ai',
      title: 'Microsoft Azure AI Engineer Associate',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: 'AZ-AI-2023-44444',
      verificationLink: 'https://docs.microsoft.com/learn/certifications',
      category: 'ai',
      level: 'Associate',
      description: 'Implement Azure AI services and cognitive services to create intelligent applications.',
      skills: ['Azure Cognitive Services', 'Bot Framework', 'Computer Vision', 'Natural Language Processing', 'Speech Services']
    },
    {
      id: 'google-ads',
      title: 'Google Ads Certified Professional',
      issuer: 'Google',
      date: '2023',
      credentialId: 'GAD-2023-55555',
      verificationLink: 'https://skillshop.exceedlms.com/student/award',
      category: 'marketing',
      level: 'Professional',
      description: 'Advanced Google Ads campaign management, optimization strategies, and performance marketing.',
      skills: ['Search Campaigns', 'Display Advertising', 'Shopping Campaigns', 'YouTube Ads', 'Performance Max']
    },
    {
      id: 'osint',
      title: 'Advanced OSINT Practitioner Certification',
      issuer: 'SANS Institute',
      date: '2023',
      credentialId: 'SANS-OSINT-2023-66666',
      verificationLink: 'https://www.sans.org/cyber-aces/certification-verification',
      category: 'intelligence',
      level: 'Master',
      description: 'Master-level open source intelligence gathering, analysis, and reporting methodologies.',
      skills: ['Social Media Intelligence', 'Digital Footprinting', 'Geospatial Analysis', 'Dark Web Investigation', 'Attribution Analysis']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Certifications', icon: Award, color: 'text-white' },
    { id: 'security', name: 'Security & Privacy', icon: Shield, color: 'text-red-400' },
    { id: 'ai', name: 'AI & Machine Learning', icon: Brain, color: 'text-blue-400' },
    { id: 'intelligence', name: 'Intelligence & OSINT', icon: Target, color: 'text-green-400' },
    { id: 'cloud', name: 'Cloud & Infrastructure', icon: Database, color: 'text-purple-400' },
    { id: 'marketing', name: 'Digital Marketing', icon: Globe, color: 'text-yellow-400' }
  ];

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons = {
      security: Shield,
      ai: Brain,
      intelligence: Target,
      cloud: Database,
      marketing: Globe
    };
    return icons[category as keyof typeof icons] || Award;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Associate': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      'Professional': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      'Expert': 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
      'Master': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
    };
    return colors[level as keyof typeof colors] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

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
            <Award className="w-6 h-6 mr-2 text-yellow-400" />
            Innovation Portfolio
          </h1>
          
          <div className="flex items-center space-x-2 text-gray-400">
            <Star className="w-4 h-4" />
            <span>{certificates.length} Certifications</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Professional Certifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Validated expertise across multiple domains of technology and intelligence, 
            representing continuous learning and professional excellence in the digital frontier.
          </p>
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

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCertificates.map((cert) => {
            const CategoryIcon = getCategoryIcon(cert.category);
            return (
              <div
                key={cert.id}
                className={`
                  bg-gradient-to-br ${getLevelColor(cert.level)} 
                  backdrop-blur-sm rounded-xl p-6 border hover:scale-105 
                  transition-all duration-300 cursor-pointer group
                `}
                onClick={() => setViewingCert(cert)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <CategoryIcon className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />
                  <div className="text-right">
                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full font-bold">
                      {cert.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-cyan-400 font-semibold mb-2">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-4">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700/50 text-xs px-2 py-1 rounded-full text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-xs text-gray-400">+{cert.skills.length - 3} more</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{cert.date}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-colors">
                      <Eye className="w-4 h-4 text-cyan-400" />
                    </button>
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 text-green-400" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{certificates.length}</div>
            <div className="text-gray-400">Total Certifications</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {certificates.filter(c => c.level === 'Master' || c.level === 'Expert').length}
            </div>
            <div className="text-gray-400">Expert Level</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {new Set(categories.slice(1).map(c => c.id)).size}
            </div>
            <div className="text-gray-400">Domains Covered</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">2023</div>
            <div className="text-gray-400">Latest Certification</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Continuous Learning Journey</h3>
            <p className="text-gray-300 mb-6">
              These certifications represent a commitment to staying at the forefront of technology and intelligence.
            </p>
            <button
              onClick={() => navigate('/connect')}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Discuss Collaboration
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {viewingCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-cyan-500/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">{viewingCert.title}</h2>
                <p className="text-lg text-purple-400">{viewingCert.issuer}</p>
              </div>
              <button
                onClick={() => setViewingCert(null)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Description</h4>
                <p className="text-gray-300">{viewingCert.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Skills Validated</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingCert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Credential ID</h4>
                  <p className="text-gray-300 font-mono">{viewingCert.credentialId}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Date Earned</h4>
                  <p className="text-gray-300">{viewingCert.date}</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <a
                  href={viewingCert.verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify Credential</span>
                </a>
                <button
                  onClick={() => setViewingCert(null)}
                  className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}