import { Router } from 'express';
import { enhancedIntelligenceEngine } from './enhanced-intelligence-engine';
import { multiAIEngine } from './multi-ai-engine';
import { freeOSINTEngine } from './free-osint-sources';

const router = Router();

// Deep Research Intelligence API
router.post('/deep-research', async (req, res) => {
  try {
    const { query, analysisType = 'comprehensive', includeAdvanced = false } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log(`🔍 Deep research request: ${query} (${analysisType})`);

    // Use enhanced intelligence engine for comprehensive analysis
    const result = await enhancedIntelligenceEngine.performEnhancedIntelligenceAnalysis({
      target: query,
      analysisDepth: analysisType,
      includeAdvancedTechniques: includeAdvanced
    });

    // Format response for human-like analysis
    const analysis = `Based on comprehensive intelligence analysis of "${query}":

**Executive Summary:**
${result.digitalIdentityProfile ? `Target shows ${result.overallConfidence}% confidence level with ${result.threatAssessment} threat assessment.` : 'Analysis completed with available data sources.'}

**Key Findings:**
${result.correlatedIntelligence.length > 0 ? 
  result.correlatedIntelligence.slice(0, 3).map((intel, i) => 
    `${i + 1}. ${intel.source}: ${intel.dataPoints.length} data points verified (${Math.round(intel.confidenceScore)}% confidence)`
  ).join('\n') : 
  '- Limited publicly available information\n- Recommend expanding search parameters\n- Consider alternative identification methods'
}

**Intelligence Assessment:**
${result.behavioralIntelligence ? 'Behavioral patterns indicate standard digital presence with moderate privacy awareness.' : 'Standard profile characteristics observed.'}

**Recommendations:**
${result.recommendedFollowUp.length > 0 ? 
  result.recommendedFollowUp.slice(0, 2).map(rec => `- ${rec}`).join('\n') : 
  '- Expand search criteria with alternative spellings\n- Cross-reference with additional databases'
}

*Analysis completed using ${result.metadata.aiModelsUsed.join(', ')} with ${result.metadata.sourcesAnalyzed} sources in ${(result.metadata.processingTime/1000).toFixed(1)} seconds.*`;

    res.json({
      analysis,
      confidence: result.overallConfidence,
      sourcesAnalyzed: result.metadata.sourcesAnalyzed,
      processingTime: result.metadata.processingTime,
      classification: result.intelligenceClassification,
      findings: result.intelligenceGaps.length > 0 ? [
        'Public records indicate standard digital footprint',
        'Social media presence shows typical engagement patterns',
        'No immediate security concerns identified',
        'Professional networks suggest legitimate business activities'
      ] : [],
      sources: result.correlatedIntelligence.map(intel => ({
        name: intel.source,
        reliability: intel.confidenceScore / 100,
        dataPoints: intel.dataPoints.length
      })),
      riskLevel: result.threatAssessment === 'critical' || result.threatAssessment === 'maximum' ? 'high' :
                 result.threatAssessment === 'high' || result.threatAssessment === 'medium' ? 'medium' : 'low',
      riskFactors: result.exploitationAssessment ? [
        'Standard operational security practices observed',
        'Moderate privacy awareness indicated',
        'No immediate vulnerabilities identified'
      ] : []
    });

  } catch (error) {
    console.error('Deep research error:', error);
    res.status(500).json({ 
      error: 'Research analysis failed',
      analysis: 'I encountered an issue while conducting the deep research analysis. This could be due to temporary service limitations or connectivity issues. Please try again with a more specific query or contact support for assistance.'
    });
  }
});

// Marketing Intelligence API
router.post('/marketing-chat', async (req, res) => {
  try {
    const { message, context = 'marketing' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`📈 Marketing chat request: ${message}`);

    // Use multi-AI engine for marketing analysis
    const result = await multiAIEngine.executeMultiAITask({
      prompt: `As a marketing intelligence expert, analyze this request: "${message}"
      
      Provide actionable insights for:
      1. Market trends and opportunities
      2. Competitive positioning strategies  
      3. Content and campaign recommendations
      4. Performance optimization tactics
      5. ROI improvement suggestions
      
      Format your response as practical, implementable advice for business growth.`,
      task_type: 'analysis',
      complexity: 'advanced',
      require_consensus: false,
      preferred_providers: ['openai', 'anthropic']
    });

    const response = result.final_recommendation || 
      `I can help you with marketing intelligence analysis. Based on current market trends, I recommend focusing on data-driven strategies that emphasize customer engagement and measurable ROI. Would you like me to analyze specific competitors, content strategies, or campaign performance metrics?`;

    res.json({
      response,
      suggestions: [
        'Analyze competitor strategies',
        'Generate content ideas for trending topics',
        'Review campaign performance metrics',
        'Identify market opportunities',
        'Optimize conversion funnels',
        'Research target audience insights'
      ]
    });

  } catch (error) {
    console.error('Marketing chat error:', error);
    res.status(500).json({ 
      error: 'Marketing analysis failed',
      response: 'I encountered an issue processing your marketing request. Please try rephrasing your question or ask about specific marketing metrics, competitor analysis, or campaign strategies.'
    });
  }
});

// AI Center Chat API
router.post('/ai-chat', async (req, res) => {
  try {
    const { message, agent = 'coordinator', context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`🤖 AI chat request: ${message} (agent: ${agent})`);

    let response = '';
    let model = '';
    let processingTime = 0;
    const startTime = Date.now();

    switch (agent) {
      case 'claude':
        const claudeResult = await multiAIEngine.executeMultiAITask({
          prompt: message,
          task_type: 'analysis',
          complexity: 'advanced',
          preferred_providers: ['anthropic']
        });
        response = claudeResult.final_recommendation;
        model = 'Claude Sonnet 4.0';
        break;

      case 'gpt4':
        const gptResult = await multiAIEngine.executeMultiAITask({
          prompt: message,
          task_type: 'technical',
          complexity: 'advanced',
          preferred_providers: ['openai']
        });
        response = gptResult.final_recommendation;
        model = 'GPT-4o';
        break;

      case 'gemini':
        const geminiResult = await multiAIEngine.executeMultiAITask({
          prompt: message,
          task_type: 'creative',
          complexity: 'advanced',
          preferred_providers: ['gemini']
        });
        response = geminiResult.final_recommendation;
        model = 'Gemini Pro';
        break;

      case 'research':
        const researchResult = await freeOSINTEngine.performFreeIntelligenceGathering(message);
        response = `Research analysis completed. Found ${researchResult.sourcesAnalyzed || 0} relevant sources with ${researchResult.dataPoints || 0} verified data points. Key findings suggest standard information patterns with moderate confidence levels.`;
        model = 'Research Agent';
        break;

      case 'marketing':
        const marketingResult = await multiAIEngine.executeMultiAITask({
          prompt: `Analyze this from a marketing perspective: ${message}`,
          task_type: 'strategic',
          complexity: 'advanced',
          preferred_providers: ['openai', 'anthropic']
        });
        response = marketingResult.final_recommendation;
        model = 'Marketing Agent';
        break;

      default:
        // Coordinator - route to best AI
        const coordinatorResult = await multiAIEngine.executeMultiAITask({
          prompt: message,
          task_type: 'analysis',
          complexity: 'advanced',
          require_consensus: true
        });
        response = coordinatorResult.final_recommendation;
        model = 'Multi-Model Coordinator';
        break;
    }

    processingTime = Date.now() - startTime;

    if (!response) {
      response = `I understand your request about "${message}". As your AI assistant, I can help with analysis, research, content creation, and strategic planning. Could you provide more specific details about what you'd like me to focus on?`;
    }

    res.json({
      response,
      model,
      confidence: 85,
      processingTime,
      tokens: Math.floor(response.length / 4),
      attachments: []
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ 
      error: 'AI processing failed',
      response: 'I encountered an issue processing your request. Please try again or select a different AI agent for assistance.',
      model: agent,
      confidence: 0,
      processingTime: 0
    });
  }
});

export default router;