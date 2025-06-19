import Anthropic from '@anthropic-ai/sdk';

// Clean multimodal AI assistant
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function processMultimodalRequest(request: {
  message?: string;
  image?: { data: string; type: string };
  documents?: Array<{ data: string; type: string; mimeType: string }>;
}) {
  try {
    const { message, image, documents } = request;
    
    const contentParts: Array<{
      type: 'text' | 'image';
      text?: string;
      source?: {
        type: 'base64';
        media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
        data: string;
      };
    }> = [];

    // Add text message
    if (message) {
      contentParts.push({
        type: 'text',
        text: message
      });
    }

    // Add image analysis
    if (image) {
      contentParts.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: (image.type || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
          data: image.data
        }
      });
      
      if (!message) {
        contentParts.push({
          type: 'text',
          text: 'Analyze this image for business intelligence insights. Identify any text, charts, graphs, logos, people, or relevant business information.'
        });
      }
    }

    // Add document analysis
    if (documents && documents.length > 0) {
      for (const doc of documents) {
        if (doc.type === 'image') {
          contentParts.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: (doc.mimeType || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: doc.data
            }
          });
        }
      }
      
      if (!message) {
        contentParts.push({
          type: 'text',
          text: 'Analyze these documents for business intelligence. Extract key information, trends, competitive insights, or strategic intelligence.'
        });
      }
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: `You are an advanced multimodal business intelligence analyst specializing in OSINT, market research, competitive analysis, and strategic insights for Malaysia and ASEAN markets.

**Intelligence Modules Available:**
1. Market Research & Analysis
2. Lead Generation & Prospecting  
3. Sales Intelligence Hub
4. Business Analytics Intelligence
5. Competitive Intelligence Monitoring
6. Financial Risk Analysis
7. Social Media Intelligence
8. OSINT Collection & Analysis
9. Threat Intelligence & Security
10. News & Media Intelligence
11. CRM & Pipeline Intelligence
12. Enhanced Multimodal AI Assistant
13. Compliance & Risk Monitoring

**Regional Focus:** Malaysia and ASEAN markets with deep understanding of local business landscape.

Provide detailed analysis with actionable business intelligence insights.`,
      messages: [{
        role: 'user',
        content: contentParts
      }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return {
        success: true,
        response: content.text,
        analysisType: image || documents ? 'multimodal' : 'text',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: false,
      error: 'Invalid response format',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Multimodal AI error:', error);
    return {
      success: false,
      error: 'AI analysis failed',
      message: 'Unable to process request at this time',
      timestamp: new Date().toISOString()
    };
  }
}

export async function beginAnalysis(request: {
  target?: string;
  analysisType?: string;
  context?: string;
}) {
  try {
    const { target, analysisType, context } = request;
    
    return {
      status: 'initiated',
      analysisId: `analysis-${Date.now()}`,
      target: target || 'general',
      type: analysisType || 'comprehensive',
      timestamp: new Date().toISOString(),
      message: `Analysis initiated for target: ${target || 'general intelligence gathering'}`,
      modules_activated: [
        'Market Research & Analysis',
        'Competitive Intelligence',
        'OSINT Collection',
        'Financial Analysis',
        'Social Media Intelligence'
      ],
      next_steps: [
        'Data collection from authentic sources',
        'Pattern analysis and correlation',
        'Strategic insight generation',
        'Actionable recommendations'
      ]
    };
  } catch (error) {
    console.error('Begin Analysis error:', error);
    return {
      status: 'error',
      error: 'Analysis initiation failed',
      message: 'Unable to start analysis at this time',
      timestamp: new Date().toISOString()
    };
  }
}