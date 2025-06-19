import { useState, useEffect } from 'react';
import { Brain, Zap, Code, Target, Globe, Award, ChevronDown, Play, Pause } from 'lucide-react';
import { useLocation } from 'wouter';
import GoBackButton from '@/components/ui/go-back-button';

export default function NeuralBio() {
  const [, navigate] = useLocation();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const storyChapters = [
    {
      id: 'genesis',
      title: 'The Genesis Protocol',
      subtitle: 'Where Digital Dreams Take Flight',
      content: `In the vast expanse of Malaysia's digital landscape, a young mind began questioning the boundaries between human intelligence and artificial possibility. Born in Saujana Utama, Sungai Buloh, Wan Mohamad Hanis discovered early that technology wasn't just about codes and algorithms—it was about bridging worlds.

Growing up surrounded by the rapid technological transformation of Southeast Asia, Hanis witnessed the digital revolution unfold from the ground up. While peers were consuming technology, he was deconstructing it, understanding its core, and envisioning how it could be reimagined to serve humanity better.

The spark ignited during his teenage years when he first encountered the concept of Open Source Intelligence (OSINT). It wasn't just about gathering information—it was about understanding the digital footprints that connect our modern world. This revelation would become the foundation of his life's work.`,
      year: '1995-2010',
      milestone: 'Digital Awakening'
    },
    {
      id: 'evolution',
      title: 'The Intelligence Evolution',
      subtitle: 'From Curiosity to Mastery',
      content: `The university years marked a transformative period where theoretical knowledge met practical application. Pursuing Computer Science with a specialization in Cybersecurity and Intelligence Systems, Hanis didn't just study—he experimented, failed, and innovated.

His breakthrough came during a cybersecurity competition where he developed a novel approach to digital footprinting that could trace complex network intrusions across multiple jurisdictions. This wasn't just technical prowess—it was strategic thinking applied to digital warfare.

The professors noticed. Industry mentors took interest. But more importantly, Hanis realized that the future of intelligence wasn't just about human analysis or pure AI—it was about creating symbiotic relationships between human intuition and artificial precision.

During this period, he began developing what would later become his signature methodology: treating intelligence gathering as an art form where technology amplifies human insight rather than replacing it.`,
      year: '2010-2016',
      milestone: 'Academic Excellence'
    },
    {
      id: 'synthesis',
      title: 'The Marketing-Intelligence Synthesis',
      subtitle: 'When Worlds Collide',
      content: `A pivotal moment arrived when Hanis realized that the same methodologies used in intelligence gathering could revolutionize digital marketing. Consumer behavior, market dynamics, competitive analysis—all were forms of intelligence that could be elevated through systematic OSINT approaches.

This wasn't just career pivot—it was the birth of a new discipline. Hanis began developing frameworks that applied military-grade intelligence techniques to commercial challenges. The results were extraordinary: campaigns that didn't just reach audiences but understood them at unprecedented levels.

His work with major brands demonstrated something remarkable: when you truly understand your digital landscape through intelligence methodologies, you don't just market to people—you create value for them. Conversion rates soared not through manipulation, but through genuine understanding.

This period established Hanis as a pioneer in what he termed "Intelligence-Driven Marketing"—an approach that would influence industry standards across Southeast Asia and beyond.`,
      year: '2016-2020',
      milestone: 'Revolutionary Integration'
    },
    {
      id: 'convergence',
      title: 'The AI Convergence',
      subtitle: 'Building Tomorrow Today',
      content: `As artificial intelligence matured from concept to capability, Hanis saw an opportunity that others missed. While the industry focused on replacing human intelligence with artificial alternatives, he envisioned something more sophisticated: amplification.

The development of his AI frameworks wasn't about creating machines that think like humans, but about building systems that enhance human thinking in ways previously impossible. His custom neural networks don't replace analysts—they empower them to process information at scales and speeds that unlock new possibilities.

His work with Wonder Pets AI agents represents this philosophy in action. Linny, Tuck, and Ming-Ming aren't just AI assistants—they're specialized intelligence amplifiers, each designed to enhance specific aspects of human decision-making and analysis.

This approach caught the attention of organizations worldwide, establishing Hanis as a thought leader in human-AI collaboration rather than human-AI competition.`,
      year: '2020-2023',
      milestone: 'AI Innovation Leadership'
    },
    {
      id: 'universe',
      title: 'The Digital Universe',
      subtitle: 'Beyond Boundaries',
      content: `Today, the HANIS DIGITAL UNIVERSE represents more than a portfolio—it's a manifestation of a vision where technology serves humanity's highest aspirations. Every project, every innovation, every strategic initiative flows from a core belief: that intelligence, whether human or artificial, should amplify our capacity for understanding and positive impact.

The universe continues expanding, incorporating quantum computing research, advanced neural architectures, and breakthrough methodologies in digital intelligence. But at its core remains the same principle that guided a curious teenager in Saujana Utama: technology should make us more human, not less.

As we stand at the threshold of unprecedented technological capability, Hanis continues pushing boundaries—not for the sake of innovation alone, but to ensure that our digital future enhances rather than diminishes our capacity for wisdom, creativity, and connection.

The journey continues, and the best chapters are yet to be written.`,
      year: '2023-Present',
      milestone: 'Infinite Possibilities'
    }
  ];

  const coreValues = [
    {
      icon: Brain,
      title: 'Intelligence Amplification',
      description: 'Technology should enhance human capability, not replace it'
    },
    {
      icon: Target,
      title: 'Strategic Precision',
      description: 'Every action guided by data-driven insights and clear objectives'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Solutions that transcend boundaries and create worldwide value'
    },
    {
      icon: Zap,
      title: 'Continuous Evolution',
      description: 'Perpetual learning and adaptation in an ever-changing digital landscape'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentChapter(prev => (prev + 1) % storyChapters.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, storyChapters.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black">
          {/* Neural Network Visualization */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <GoBackButton className="text-cyan-400 hover:text-cyan-300" />
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
            <Brain className="w-6 h-6 mr-2 text-cyan-400" />
            Digital Identity
          </h1>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
          </button>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Neural Biography
            </h1>
            <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              The story of a digital pioneer who bridges worlds, amplifies intelligence, 
              and builds tomorrow's solutions today.
            </p>
            
            {/* Chapter Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {storyChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setCurrentChapter(index)}
                  className={`
                    px-6 py-3 rounded-xl transition-all font-semibold
                    ${currentChapter === index 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                      : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-500/30'
                    }
                  `}
                >
                  Chapter {index + 1}
                </button>
              ))}
            </div>

            <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce mx-auto" />
          </div>
        </section>

        {/* Story Chapters */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-cyan-400 font-mono text-sm mb-2">
                    {storyChapters[currentChapter].year}
                  </div>
                  <h2 className="text-4xl font-bold mb-2 text-white">
                    {storyChapters[currentChapter].title}
                  </h2>
                  <p className="text-xl text-purple-400 italic">
                    {storyChapters[currentChapter].subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm">
                    {storyChapters[currentChapter].milestone}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg prose-invert max-w-none">
                {storyChapters[currentChapter].content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-700/50">
                <button
                  onClick={() => setCurrentChapter(prev => prev > 0 ? prev - 1 : storyChapters.length - 1)}
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  <span>Previous Chapter</span>
                </button>

                <div className="flex space-x-2">
                  {storyChapters.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentChapter ? 'bg-cyan-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentChapter(prev => (prev + 1) % storyChapters.length)}
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Next Chapter</span>
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Core Values & Principles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 hover:border-cyan-500/30 transition-all group"
                  >
                    <Icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:animate-pulse" />
                    <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                    <p className="text-gray-300 text-lg">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Personal Philosophy */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/20">
              <h2 className="text-3xl font-bold mb-8 text-cyan-400">Personal Philosophy</h2>
              <blockquote className="text-2xl text-gray-300 italic leading-relaxed mb-8">
                "Technology is not about replacing human intelligence—it's about amplifying it. 
                Every algorithm should make us more creative, every analysis should deepen our understanding, 
                and every innovation should strengthen our connections to each other and our world."
              </blockquote>
              <cite className="text-lg text-purple-400 font-semibold">
                — Wan Mohamad Hanis, Strategic Intelligence Architect
              </cite>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Continue the Journey</h2>
            <p className="text-xl text-gray-300 mb-12">
              The story continues to evolve. Every project, every collaboration, 
              every innovation adds new chapters to this digital narrative.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate('/command-center')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all font-semibold"
              >
                Explore Command Center
              </button>
              <button
                onClick={() => navigate('/connect')}
                className="border border-cyan-500/50 px-8 py-4 rounded-xl hover:bg-cyan-500/10 transition-all font-semibold"
              >
                Start Collaboration
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}