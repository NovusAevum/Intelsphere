import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, PieChart, Activity, Database, Zap, Brain, Target } from "lucide-react";

export default function AnalyticsLab() {
  const [analyticsData, setAnalyticsData] = useState({
    totalDataPoints: 0,
    processingSpeed: 0,
    accuracy: 98.7,
    modelsActive: 15,
    predictions: 0,
    insights: 0
  });

  const [dataStreams, setDataStreams] = useState([
    { name: "User Behavior", volume: 95, accuracy: 97.2, status: "active" },
    { name: "Market Trends", volume: 82, accuracy: 94.8, status: "active" },
    { name: "Performance Metrics", volume: 88, accuracy: 99.1, status: "processing" },
    { name: "Security Events", volume: 76, accuracy: 96.5, status: "active" },
    { name: "Neural Patterns", volume: 91, accuracy: 98.3, status: "learning" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalDataPoints: prev.totalDataPoints + Math.floor(Math.random() * 10000) + 5000,
        processingSpeed: Math.random() * 1000 + 500,
        predictions: prev.predictions + Math.floor(Math.random() * 50) + 25,
        insights: prev.insights + Math.floor(Math.random() * 20) + 10
      }));

      setDataStreams(prev => prev.map(stream => ({
        ...stream,
        volume: Math.max(60, Math.min(100, stream.volume + (Math.random() - 0.5) * 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const analyticsModules = [
    {
      icon: BarChart3,
      title: "DATA PROCESSING",
      description: "Real-time data ingestion and processing pipelines",
      metrics: ["5TB/day Processed", "Real-time Analysis", "99.9% Uptime"],
      color: "text-blue-400"
    },
    {
      icon: Brain,
      title: "PREDICTIVE MODELS",
      description: "Advanced machine learning models for forecasting and insights",
      metrics: ["15 Models Active", "98.7% Accuracy", "Continuous Learning"],
      color: "text-purple-400"
    },
    {
      icon: Target,
      title: "PERFORMANCE ANALYTICS",
      description: "Comprehensive performance tracking and optimization",
      metrics: ["Real-time KPIs", "Custom Dashboards", "Automated Alerts"],
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "AUTOMATED INSIGHTS",
      description: "AI-powered insight generation and anomaly detection",
      metrics: ["Auto-Discovery", "Pattern Recognition", "Actionable Reports"],
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-mono">
            ANALYTICS LABORATORY
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Advanced data analytics and machine learning laboratory with real-time processing capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400 font-mono">{(analyticsData.totalDataPoints / 1000000).toFixed(1)}M</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">DATA POINTS</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400 font-mono">{analyticsData.processingSpeed.toFixed(0)}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">PROCESSING MB/s</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400 font-mono">{analyticsData.accuracy.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">MODEL ACCURACY</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400 font-mono">{analyticsData.modelsActive}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">ACTIVE MODELS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 font-mono">DATA STREAMS</h3>
            <div className="space-y-4">
              {dataStreams.map((stream, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white font-mono">{stream.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      stream.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      stream.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {stream.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-gray-400 text-sm">Volume:</span>
                      <div className="text-blue-400 font-mono">{stream.volume.toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Accuracy:</span>
                      <div className="text-green-400 font-mono">{stream.accuracy.toFixed(1)}%</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${stream.volume}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">REAL-TIME INSIGHTS</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 font-mono">Predictions Generated</span>
                  <span className="text-2xl font-bold text-green-400 font-mono">{analyticsData.predictions}</span>
                </div>
                <div className="text-xs text-gray-400">Last hour: +{Math.floor(Math.random() * 100) + 50}</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-400 font-mono">AI Insights</span>
                  <span className="text-2xl font-bold text-purple-400 font-mono">{analyticsData.insights}</span>
                </div>
                <div className="text-xs text-gray-400">Automated discovery</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cyan-400 font-mono">Anomalies Detected</span>
                  <span className="text-2xl font-bold text-cyan-400 font-mono">7</span>
                </div>
                <div className="text-xs text-gray-400">Under investigation</div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-orange-400 font-mono">Optimization Score</span>
                  <span className="text-2xl font-bold text-orange-400 font-mono">94.8</span>
                </div>
                <div className="text-xs text-gray-400">Continuously improving</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {analyticsModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <Icon className={`w-12 h-12 ${module.color} mr-4`} />
                  <div>
                    <h4 className={`text-xl font-bold ${module.color} font-mono`}>{module.title}</h4>
                    <p className="text-gray-400 text-sm">{module.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {module.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-blue-400 mb-4 font-mono flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              DATA PIPELINE
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Ingestion Rate:</span>
                <span className="text-blue-400 font-mono">2.3GB/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Lag:</span>
                <span className="text-blue-400 font-mono">&lt; 100ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Storage Efficiency:</span>
                <span className="text-blue-400 font-mono">98.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4 font-mono flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              PERFORMANCE
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Query Speed:</span>
                <span className="text-green-400 font-mono">&lt; 50ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Throughput:</span>
                <span className="text-green-400 font-mono">10K ops/sec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Availability:</span>
                <span className="text-green-400 font-mono">99.99%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              ML OPERATIONS
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Model Training:</span>
                <span className="text-purple-400 font-mono">Continuous</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Deployment:</span>
                <span className="text-purple-400 font-mono">Automated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monitoring:</span>
                <span className="text-purple-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}