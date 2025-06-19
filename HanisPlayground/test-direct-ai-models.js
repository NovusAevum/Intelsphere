#!/usr/bin/env node

// Test direct AI model functionality
async function testWorkingModels() {
  console.log('🧪 Testing Direct AI Model Access...\n');
  
  // Test Cohere
  try {
    const { CohereApi } = await import('cohere-ai');
    const cohere = new CohereApi({ token: process.env.COHERE_API_KEY });
    
    console.log('📡 Testing Cohere...');
    const cohereResponse = await cohere.chat({
      model: 'command-r-plus',
      message: 'What is 2+2? Answer briefly.',
      maxTokens: 100
    });
    console.log('✅ Cohere Response:', cohereResponse.text.substring(0, 100));
  } catch (error) {
    console.log('❌ Cohere Error:', error.message);
  }
  
  // Test Google Gemini
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('\n📡 Testing Google Gemini...');
    const result = await model.generateContent('What is 2+2? Answer briefly.');
    const response = result.response;
    console.log('✅ Gemini Response:', response.text().substring(0, 100));
  } catch (error) {
    console.log('❌ Gemini Error:', error.message);
  }
  
  // Test OpenAI with different model
  try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    console.log('\n📡 Testing OpenAI GPT-4o...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'What is 2+2? Answer briefly.' }],
      max_tokens: 100
    });
    console.log('✅ OpenAI Response:', completion.choices[0].message.content.substring(0, 100));
  } catch (error) {
    console.log('❌ OpenAI Error:', error.message);
  }
  
  console.log('\n🔍 Testing complete. Check which models are actually working.');
}

testWorkingModels().catch(console.error);