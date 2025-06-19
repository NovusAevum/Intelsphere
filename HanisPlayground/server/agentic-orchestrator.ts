import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CohereClient } from 'cohere-ai';

export interface Agent {
  id: string;
  name: string;
  role: 'intelligence_analyst' | 'threat_assessor' | 'data_correlator' | 'web_crawler' | 'social_monitor' | 'tech_scanner' | 'geo_tracker' | 'financial_analyzer';
  model: 'claude-sonnet-4' | 'gpt-4o' | 'gemini-pro' | 'grok-2' | 'cohere-command';
  capabilities: string[];
  status: 'active' | 'processing' | 'idle' | 'error';
  last_task?: string;
  performance_metrics: {
    tasks_completed: number;
    success_rate: number;
    avg_processing_time: number;
    specialization_score: number;
  };
}

export interface A2AMessage {
  sender_agent_id: string;
  receiver_agent_id: string;
  message_type: 'task_assignment' | 'data_share' | 'analysis_request' | 'correlation_query' | 'threat_alert' | 'status_update';
  payload: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  correlation_id?: string;
}

export interface MMA2MMASession {
  session_id: string;
  participating_agents: Agent[];
  target: string;
  orchestration_mode: 'collaborative' | 'competitive' | 'hierarchical' | 'swarm';
  communication_log: A2AMessage[];
  shared_context: Map<string, any>;
  collective_intelligence: {
    aggregated_findings: any[];
    consensus_confidence: number;
    disagreement_points: string[];
    final_assessment: any;
  };
}

export interface AgenticTask {
  task_id: string;
  target: string;
  assigned_agents: string[];
  task_type: 'osint_gathering' | 'threat_analysis' | 'data_correlation' | 'predictive_modeling' | 'vulnerability_assessment';
  parameters: any;
  deadline?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  results?: any;
}

export class AgenticOrchestrator {
  private agents: Map<string, Agent> = new Map();
  private activeSessions: Map<string, MMA2MMASession> = new Map();
  private taskQueue: AgenticTask[] = [];
  private anthropic: Anthropic;
  private openai: OpenAI;
  private googleAI: GoogleGenerativeAI;
  private xaiClient: OpenAI;
  private cohereClient: CohereClient;

  constructor() {
    // Initialize AI clients with proper error handling
    try {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY || 'fallback-key',
      });
    } catch (error) {
      console.warn('Anthropic client initialization failed, using fallback');
    }

    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'fallback-key',
      });
    } catch (error) {
      console.warn('OpenAI client initialization failed, using fallback');
    }

    try {
      this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'fallback-key');
    } catch (error) {
      console.warn('Google AI client initialization failed, using fallback');
    }

    try {
      this.xaiClient = new OpenAI({
        baseURL: "https://api.x.ai/v1",
        apiKey: process.env.XAI_API_KEY || 'fallback-key',
      });
    } catch (error) {
      console.warn('XAI client initialization failed, using fallback');
    }

    try {
      this.cohereClient = new CohereClient({
        token: process.env.COHERE_API_KEY || 'fallback-key',
      });
    } catch (error) {
      console.warn('Cohere client initialization failed, using fallback');
    }

    this.initializeAgents();
  }

  private initializeAgents(): void {
    const agentConfigs: Omit<Agent, 'performance_metrics' | 'status'>[] = [
      {
        id: 'intel_analyst_001',
        name: 'Claude Intelligence Analyst',
        role: 'intelligence_analyst',
        model: 'claude-sonnet-4',
        capabilities: ['deep_analysis', 'pattern_recognition', 'threat_assessment', 'report_generation'],
        last_task: undefined
      },
      {
        id: 'threat_assessor_002',
        name: 'GPT Threat Assessor',
        role: 'threat_assessor',
        model: 'gpt-4o',
        capabilities: ['vulnerability_analysis', 'risk_scoring', 'attack_vector_identification', 'mitigation_planning'],
        last_task: undefined
      },
      {
        id: 'data_correlator_003',
        name: 'Gemini Data Correlator',
        role: 'data_correlator',
        model: 'gemini-pro',
        capabilities: ['cross_platform_correlation', 'timeline_analysis', 'relationship_mapping', 'anomaly_detection'],
        last_task: undefined
      },
      {
        id: 'web_crawler_004',
        name: 'Grok Web Crawler',
        role: 'web_crawler',
        model: 'grok-2',
        capabilities: ['deep_web_scanning', 'content_extraction', 'metadata_analysis', 'link_traversal'],
        last_task: undefined
      },
      {
        id: 'social_monitor_005',
        name: 'Cohere Social Monitor',
        role: 'social_monitor',
        model: 'cohere-command',
        capabilities: ['social_media_analysis', 'sentiment_tracking', 'influence_mapping', 'trend_detection'],
        last_task: undefined
      },
      {
        id: 'tech_scanner_006',
        name: 'Claude Tech Scanner',
        role: 'tech_scanner',
        model: 'claude-sonnet-4',
        capabilities: ['infrastructure_scanning', 'technology_identification', 'security_analysis', 'compliance_checking'],
        last_task: undefined
      },
      {
        id: 'geo_tracker_007',
        name: 'GPT Geo Tracker',
        role: 'geo_tracker',
        model: 'gpt-4o',
        capabilities: ['location_tracking', 'movement_analysis', 'geographic_correlation', 'regional_intelligence'],
        last_task: undefined
      },
      {
        id: 'financial_analyzer_008',
        name: 'Gemini Financial Analyzer',
        role: 'financial_analyzer',
        model: 'gemini-pro',
        capabilities: ['financial_analysis', 'transaction_tracking', 'market_intelligence', 'fraud_detection'],
        last_task: undefined
      }
    ];

    agentConfigs.forEach(config => {
      const agent: Agent = {
        ...config,
        status: 'idle',
        performance_metrics: {
          tasks_completed: 0,
          success_rate: 1.0,
          avg_processing_time: 0,
          specialization_score: 0.95
        }
      };
      this.agents.set(agent.id, agent);
    });
  }

  async createMMA2MMASession(target: string, orchestrationMode: MMA2MMASession['orchestration_mode'] = 'collaborative'): Promise<string> {
    const sessionId = `mma2mma_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const participatingAgents = Array.from(this.agents.values()).filter(agent => 
      agent.status === 'idle' || agent.status === 'active'
    );

    const session: MMA2MMASession = {
      session_id: sessionId,
      participating_agents: participatingAgents,
      target,
      orchestration_mode: orchestrationMode,
      communication_log: [],
      shared_context: new Map(),
      collective_intelligence: {
        aggregated_findings: [],
        consensus_confidence: 0,
        disagreement_points: [],
        final_assessment: null
      }
    };

    this.activeSessions.set(sessionId, session);
    console.log(`🤖 Created MMA2MMA session ${sessionId} with ${participatingAgents.length} agents`);

    return sessionId;
  }

  async performA2ACommunication(message: Omit<A2AMessage, 'timestamp'>): Promise<void> {
    const fullMessage: A2AMessage = {
      ...message,
      timestamp: new Date().toISOString()
    };

    console.log(`📡 A2A Communication: ${message.sender_agent_id} → ${message.receiver_agent_id} (${message.message_type})`);

    // Find active session containing both agents
    const relevantSession = Array.from(this.activeSessions.values()).find(session =>
      session.participating_agents.some(agent => agent.id === message.sender_agent_id) &&
      session.participating_agents.some(agent => agent.id === message.receiver_agent_id)
    );

    if (relevantSession) {
      relevantSession.communication_log.push(fullMessage);
      
      // Process the message based on type
      await this.processA2AMessage(fullMessage, relevantSession);
    }
  }

  private async processA2AMessage(message: A2AMessage, session: MMA2MMASession): Promise<void> {
    const receiverAgent = this.agents.get(message.receiver_agent_id);
    if (!receiverAgent) return;

    switch (message.message_type) {
      case 'task_assignment':
        await this.assignTaskToAgent(message.receiver_agent_id, message.payload, session);
        break;
      case 'data_share':
        session.shared_context.set(`${message.sender_agent_id}_data_${Date.now()}`, message.payload);
        break;
      case 'analysis_request':
        await this.requestAnalysisFromAgent(message.receiver_agent_id, message.payload, session);
        break;
      case 'correlation_query':
        await this.performCorrelationQuery(message.receiver_agent_id, message.payload, session);
        break;
      case 'threat_alert':
        await this.processThreatAlert(message.payload, session);
        break;
      case 'status_update':
        receiverAgent.status = message.payload.status;
        break;
    }
  }

  async orchestrateMMA2MMAIntelligence(sessionId: string): Promise<any> {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    console.log(`🧠 Orchestrating MMA2MMA intelligence for session ${sessionId}`);

    // Phase 1: Task Distribution
    await this.distributeIntelligenceTasks(session);

    // Phase 2: Agent Communication and Collaboration
    await this.facilitateAgentCollaboration(session);

    // Phase 3: Data Aggregation
    await this.aggregateIntelligenceFindings(session);

    // Phase 4: Consensus Building
    await this.buildConsensus(session);

    // Phase 5: Final Assessment
    const finalAssessment = await this.generateFinalAssessment(session);

    session.collective_intelligence.final_assessment = finalAssessment;

    return {
      session_id: sessionId,
      target: session.target,
      participating_agents: session.participating_agents.length,
      communication_events: session.communication_log.length,
      shared_context_items: session.shared_context.size,
      collective_intelligence: session.collective_intelligence,
      orchestration_mode: session.orchestration_mode
    };
  }

  private async distributeIntelligenceTasks(session: MMA2MMASession): Promise<void> {
    const tasks = [
      { type: 'osint_gathering', agent_role: 'intelligence_analyst' },
      { type: 'threat_analysis', agent_role: 'threat_assessor' },
      { type: 'data_correlation', agent_role: 'data_correlator' },
      { type: 'web_scanning', agent_role: 'web_crawler' },
      { type: 'social_analysis', agent_role: 'social_monitor' },
      { type: 'tech_analysis', agent_role: 'tech_scanner' },
      { type: 'geo_analysis', agent_role: 'geo_tracker' },
      { type: 'financial_analysis', agent_role: 'financial_analyzer' }
    ];

    for (const task of tasks) {
      const agent = session.participating_agents.find(a => a.role === task.agent_role);
      if (agent) {
        await this.performA2ACommunication({
          sender_agent_id: 'orchestrator',
          receiver_agent_id: agent.id,
          message_type: 'task_assignment',
          payload: { task_type: task.type, target: session.target },
          priority: 'high'
        });
      }
    }
  }

  private async facilitateAgentCollaboration(session: MMA2MMASession): Promise<void> {
    // Simulate agent collaboration through A2A communication
    const agents = session.participating_agents;
    
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        const agent1 = agents[i];
        const agent2 = agents[j];

        // Request correlation between different agent findings
        await this.performA2ACommunication({
          sender_agent_id: agent1.id,
          receiver_agent_id: agent2.id,
          message_type: 'correlation_query',
          payload: { request_type: 'cross_domain_correlation', target: session.target },
          priority: 'medium'
        });
      }
    }
  }

  private async aggregateIntelligenceFindings(session: MMA2MMASession): Promise<void> {
    const findings: any[] = [];
    
    // Collect findings from shared context
    for (const [key, value] of session.shared_context.entries()) {
      if (key.includes('_data_')) {
        findings.push(value);
      }
    }

    session.collective_intelligence.aggregated_findings = findings;
  }

  private async buildConsensus(session: MMA2MMASession): Promise<void> {
    const findings = session.collective_intelligence.aggregated_findings;
    
    if (findings.length > 0) {
      // Calculate consensus confidence based on agreement between agents
      const confidenceScores = findings.map(f => f.confidence || 0.5);
      const averageConfidence = confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length;
      
      session.collective_intelligence.consensus_confidence = averageConfidence;
      
      // Identify disagreement points
      const lowConfidenceFindings = findings.filter(f => (f.confidence || 0.5) < 0.6);
      session.collective_intelligence.disagreement_points = lowConfidenceFindings.map(f => f.description || 'Low confidence finding');
    }
  }

  private async generateFinalAssessment(session: MMA2MMASession): Promise<any> {
    try {
      const findingsSummary = session.collective_intelligence.aggregated_findings
        .map(f => `${f.source || 'Unknown'}: ${f.description || f.summary || 'No description'}`)
        .join('\n');

      const assessmentPrompt = `Multi-Modal Agent Collective Intelligence Assessment for: "${session.target}"

PARTICIPATING AGENTS: ${session.participating_agents.map(a => `${a.name} (${a.role})`).join(', ')}

AGGREGATED FINDINGS:
${findingsSummary}

COMMUNICATION EVENTS: ${session.communication_log.length}
CONSENSUS CONFIDENCE: ${Math.round(session.collective_intelligence.consensus_confidence * 100)}%

Generate comprehensive final assessment including:
1. Executive summary
2. Key findings with confidence levels
3. Threat assessment
4. Recommendations
5. Agent collaboration effectiveness

Return as JSON with keys: executive_summary, key_findings, threat_level, recommendations, collaboration_score`;

      // Check if API key is available before making request
      if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'fallback-key') {
        console.log('Using structured assessment - API key not available');
        return this.generateFallbackAssessment(session);
      }

      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: assessmentPrompt
        }]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        try {
          return JSON.parse(content.text);
        } catch {
          return this.generateFallbackAssessment(session);
        }
      }

      return this.generateFallbackAssessment(session);
    } catch (error) {
      console.log('Final assessment generation error:', error);
      return this.generateFallbackAssessment(session);
    }
  }

  private generateFallbackAssessment(session: MMA2MMASession): any {
    return {
      executive_summary: `Multi-modal agent analysis completed for ${session.target}. ${session.participating_agents.length} agents collaborated to gather and analyze intelligence across multiple domains.`,
      key_findings: [
        `${session.collective_intelligence.aggregated_findings.length} intelligence sources analyzed`,
        `${session.communication_log.length} inter-agent communications recorded`,
        `Consensus confidence: ${Math.round(session.collective_intelligence.consensus_confidence * 100)}%`,
        `Orchestration mode: ${session.orchestration_mode}`
      ],
      threat_level: session.collective_intelligence.consensus_confidence > 0.8 ? 'medium' : 'low',
      recommendations: [
        'Continue monitoring identified intelligence sources',
        'Expand analysis scope based on agent findings',
        'Implement recommended security measures',
        'Schedule follow-up intelligence gathering'
      ],
      collaboration_score: Math.min(0.95, session.communication_log.length / 20)
    };
  }

  private async assignTaskToAgent(agentId: string, task: any, session: MMA2MMASession): Promise<void> {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    agent.status = 'processing';
    agent.last_task = task.task_type;

    // Simulate task execution and result sharing
    setTimeout(async () => {
      const result = await this.simulateAgentTaskExecution(agent, task, session.target);
      
      // Share results with session
      await this.performA2ACommunication({
        sender_agent_id: agentId,
        receiver_agent_id: 'orchestrator',
        message_type: 'data_share',
        payload: result,
        priority: 'medium'
      });

      agent.status = 'active';
      agent.performance_metrics.tasks_completed++;
    }, Math.random() * 2000 + 1000); // 1-3 second simulation
  }

  private async requestAnalysisFromAgent(agentId: string, request: any, session: MMA2MMASession): Promise<void> {
    // Simulate analysis request processing
    const agent = this.agents.get(agentId);
    if (!agent) return;

    const analysisResult = {
      agent_id: agentId,
      analysis_type: request.analysis_type,
      target: session.target,
      confidence: 0.75 + Math.random() * 0.25,
      findings: `Analysis completed by ${agent.name} for ${request.analysis_type}`,
      timestamp: new Date().toISOString()
    };

    session.shared_context.set(`analysis_${agentId}_${Date.now()}`, analysisResult);
  }

  private async performCorrelationQuery(agentId: string, query: any, session: MMA2MMASession): Promise<void> {
    // Simulate correlation analysis
    const correlationResult = {
      agent_id: agentId,
      correlation_type: query.request_type,
      target: session.target,
      correlations_found: Math.floor(Math.random() * 5) + 1,
      confidence: 0.6 + Math.random() * 0.4,
      description: `Cross-domain correlation analysis completed`,
      timestamp: new Date().toISOString()
    };

    session.shared_context.set(`correlation_${agentId}_${Date.now()}`, correlationResult);
  }

  private async processThreatAlert(alert: any, session: MMA2MMASession): Promise<void> {
    console.log(`🚨 Threat Alert in session ${session.session_id}:`, alert);
    
    // Broadcast threat alert to all agents in session
    for (const agent of session.participating_agents) {
      await this.performA2ACommunication({
        sender_agent_id: 'orchestrator',
        receiver_agent_id: agent.id,
        message_type: 'threat_alert',
        payload: alert,
        priority: 'critical'
      });
    }
  }

  private async simulateAgentTaskExecution(agent: Agent, task: any, target: string): Promise<any> {
    // Simulate different types of agent task execution
    const baseResult = {
      agent_id: agent.id,
      agent_name: agent.name,
      task_type: task.task_type,
      target: target,
      timestamp: new Date().toISOString(),
      confidence: 0.7 + Math.random() * 0.3
    };

    switch (agent.role) {
      case 'intelligence_analyst':
        return {
          ...baseResult,
          findings: ['OSINT sources identified', 'Digital footprint analyzed', 'Threat indicators collected'],
          data_points: Math.floor(Math.random() * 50) + 25,
          source: 'multi_source_analysis'
        };

      case 'threat_assessor':
        return {
          ...baseResult,
          threat_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          vulnerabilities: Math.floor(Math.random() * 10),
          risk_score: Math.random() * 10,
          source: 'threat_intelligence'
        };

      case 'social_monitor':
        return {
          ...baseResult,
          social_profiles: Math.floor(Math.random() * 8) + 2,
          sentiment_score: (Math.random() - 0.5) * 2,
          activity_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          source: 'social_media_analysis'
        };

      default:
        return {
          ...baseResult,
          generic_findings: `${agent.role} analysis completed for ${target}`,
          source: agent.role
        };
    }
  }

  getAgentStatus(): Agent[] {
    return Array.from(this.agents.values());
  }

  getActiveSessions(): MMA2MMASession[] {
    return Array.from(this.activeSessions.values());
  }

  async terminateSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      // Set all participating agents back to idle
      session.participating_agents.forEach(agent => {
        const agentRef = this.agents.get(agent.id);
        if (agentRef) {
          agentRef.status = 'idle';
        }
      });

      this.activeSessions.delete(sessionId);
      console.log(`🔚 Terminated MMA2MMA session ${sessionId}`);
    }
  }
}

export const agenticOrchestrator = new AgenticOrchestrator();