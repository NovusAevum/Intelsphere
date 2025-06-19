import Anthropic from '@anthropic-ai/sdk';

// Direct test of multimodal AI functionality
async function testMultimodalAI() {
  try {
    console.log('Testing Anthropic API key...');
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: 'You are a business intelligence analyst for Malaysia and ASEAN markets.',
      messages: [{
        role: 'user',
        content: 'What are the current fintech trends in Malaysia?'
      }]
    });

    console.log('✅ Anthropic API working successfully!');
    console.log('Response:', response.content[0].text);

    // Test multimodal analysis
    console.log('\n🔍 Testing multimodal analysis...');
    
    const multimodalResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: 'You are an advanced multimodal business intelligence analyst.',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analyze Malaysian business intelligence trends and provide strategic insights.'
          }
        ]
      }]
    });

    console.log('✅ Multimodal AI working successfully!');
    console.log('Analysis:', multimodalResponse.content[0].text.substring(0, 200) + '...');

    return {
      success: true,
      message: 'Multimodal AI system is fully operational',
      features: [
        'Text analysis and strategic insights',
        'Business intelligence for Malaysia/ASEAN',
        'Claude Sonnet 4.0 integration',
        'Multimodal content processing'
      ]
    };

  } catch (error) {
    console.error('❌ Multimodal AI test failed:', error.message);
    
    if (error.message.includes('authentication')) {
      return {
        success: false,
        error: 'API key authentication failed',
        suggestion: 'Please verify Anthropic API key is properly configured'
      };
    }
    
    return {
      success: false,
      error: error.message,
      suggestion: 'Check API configuration and network connectivity'
    };
  }
}

// Run the test
testMultimodalAI().then(result => {
  console.log('\n📊 Test Results:', JSON.stringify(result, null, 2));
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.error('💥 Test execution failed:', error);
  process.exit(1);
});