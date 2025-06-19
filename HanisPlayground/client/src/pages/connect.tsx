import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, User, FileText, Zap, Globe, ExternalLink } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Connect() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = [
    'OSINT Investigation',
    'AI/ML Development',
    'Digital Marketing Strategy',
    'Cybersecurity Consultation',
    'Intelligence Analysis',
    'Custom AI Solutions',
    'Performance Marketing',
    'Strategic Consultation',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwrzrgl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          projectType: formData.projectType,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello Hanis! I'm interested in discussing a collaboration opportunity through your Digital Universe website.");
    window.open(`https://wa.me/60179275907?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Collaboration Inquiry - HANIS DIGITAL UNIVERSE");
    const body = encodeURIComponent("Hello Hanis,\n\nI'm interested in discussing a potential collaboration. Please let me know your availability.\n\nBest regards,");
    window.open(`mailto:wmh2u@proton.me?subject=${subject}&body=${body}`, '_blank');
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
            <Globe className="w-6 h-6 mr-2 text-cyan-400" />
            Network Access
          </h1>
          
          <div className="text-green-400 text-sm">
            🟢 Available for Collaboration
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Connect with the Universe
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your digital intelligence capabilities? Let's collaborate on building the future together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center">
              <Send className="w-8 h-8 mr-3" />
              Secure Communication Channel
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400">Message transmitted successfully! Expect a response within 24 hours.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400">Transmission failed. Please try alternative communication methods below.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Brief description of your project"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Describe your project requirements, timeline, and how we can collaborate..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-4 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Initiate Contact</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Direct Contact Methods */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400">Direct Communication</h2>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group">
                  <Mail className="w-8 h-8 text-cyan-400 mr-4 group-hover:animate-pulse" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">Secure Email</h3>
                    <p className="text-gray-400">Primary communication channel</p>
                  </div>
                  <button
                    onClick={handleEmail}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>wmh2u@proton.me</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group">
                  <MessageSquare className="w-8 h-8 text-green-400 mr-4 group-hover:animate-pulse" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">WhatsApp</h3>
                    <p className="text-gray-400">Instant secure messaging</p>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-500/20 hover:bg-green-500/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>+60179275907</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg">
                  <MapPin className="w-8 h-8 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-white font-semibold">Strategic Location</h3>
                    <p className="text-gray-400">Saujana Utama, Sungai Buloh, Selangor</p>
                    <p className="text-sm text-purple-400">Malaysia • Southeast Asia Hub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                Geographic Intelligence
              </h2>
              
              <div className="relative h-64 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63776.77566831508!2d101.5298!3d3.2541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc48e25ac2623b%3A0xb6c7ddd1fa4f49c2!2sSaujana%20Utama%2C%20Sungai%20Buloh%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <p className="text-cyan-400 text-sm font-semibold">📍 Intelligence Hub</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Strategically positioned in Malaysia's tech corridor, serving global operations 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Areas */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Collaboration Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'OSINT Operations',
                description: 'Advanced intelligence gathering, digital footprinting, and threat assessment',
                color: 'text-red-400'
              },
              {
                icon: User,
                title: 'AI Development',
                description: 'Custom neural networks, machine learning solutions, and intelligent automation',
                color: 'text-blue-400'
              },
              {
                icon: Globe,
                title: 'Digital Marketing',
                description: 'Performance marketing, conversion optimization, and growth strategies',
                color: 'text-green-400'
              },
              {
                icon: FileText,
                title: 'Strategic Consulting',
                description: 'Technology roadmaps, digital transformation, and innovation strategies',
                color: 'text-purple-400'
              },
              {
                icon: MapPin,
                title: 'Security Audits',
                description: 'Comprehensive cybersecurity assessments and penetration testing',
                color: 'text-yellow-400'
              },
              {
                icon: Send,
                title: 'Custom Solutions',
                description: 'Bespoke technology solutions tailored to your unique requirements',
                color: 'text-pink-400'
              }
            ].map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all group"
                >
                  <Icon className={`w-12 h-12 ${area.color} mb-4 group-hover:animate-pulse`} />
                  <h3 className="text-xl font-bold mb-3 text-white">{area.title}</h3>
                  <p className="text-gray-300">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Time Commitment */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">Response Commitment</h2>
            <p className="text-xl text-gray-300 mb-6">
              Professional inquiries receive responses within 24 hours. Urgent matters are prioritized for same-day response.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{"< 24h"}</div>
                <div className="text-gray-400">Standard Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{"< 4h"}</div>
                <div className="text-gray-400">Urgent Matters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-400">Emergency Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}