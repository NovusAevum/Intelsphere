/**
 * Comprehensive IntelSphere Platform Validation Test
 * Tests all 8 API services and core platform functionality
 */

const BASE_URL = 'http://localhost:3006';

async function validateIntelSpherePlatform() {
    console.log('🚀 COMPREHENSIVE INTELSPHERE PLATFORM VALIDATION');
    console.log('=================================================');
    
    const results = {
        apiServices: {},
        coreFeatures: {},
        overallHealth: false
    };
    
    // Test 1: API Service Validation
    console.log('\n📊 Testing API Service Connections...');
    
    const models = ['openai', 'anthropic', 'cohere', 'xai', 'google', 'mistral', 'voyage', 'weatherstack'];
    
    for (const model of models) {
        try {
            const response = await fetch(`${BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Test ${model} API connection`,
                    model: model
                })
            });
            
            const data = await response.json();
            results.apiServices[model] = {
                active: data.serviceActive || false,
                live: data.isLive || false,
                response: data.response ? 'Connected' : 'No response',
                model: data.model || 'Unknown'
            };
            
            if (data.serviceActive && data.isLive) {
                console.log(`✅ ${model.toUpperCase()}: Active - ${data.model}`);
            } else {
                console.log(`⚠️  ${model.toUpperCase()}: Inactive or limited access`);
            }
            
        } catch (error) {
            results.apiServices[model] = {
                active: false,
                live: false,
                error: error.message
            };
            console.log(`❌ ${model.toUpperCase()}: Connection failed - ${error.message}`);
        }
    }
    
    // Test 2: Business Intelligence Feature
    console.log('\n📈 Testing Business Intelligence Feature...');
    try {
        const response = await fetch(`${BASE_URL}/api/business-analysis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                company: 'Apple Inc',
                analysisType: 'market-position',
                model: 'cohere'
            })
        });
        
        const data = await response.json();
        results.coreFeatures.businessIntelligence = {
            working: data.success || false,
            response: data.analysis ? 'Analysis generated' : 'No analysis',
            error: data.error || null
        };
        
        if (data.success) {
            console.log('✅ Business Intelligence: Working - Analysis generated');
        } else {
            console.log(`⚠️  Business Intelligence: ${data.error || 'Unknown issue'}`);
        }
        
    } catch (error) {
        results.coreFeatures.businessIntelligence = {
            working: false,
            error: error.message
        };
        console.log(`❌ Business Intelligence: ${error.message}`);
    }
    
    // Test 3: Market Research Feature
    console.log('\n🔍 Testing Market Research Feature...');
    try {
        const response = await fetch(`${BASE_URL}/api/market-research`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                industry: 'Technology',
                region: 'North America',
                focus: 'competitive-landscape',
                model: 'cohere'
            })
        });
        
        const data = await response.json();
        results.coreFeatures.marketResearch = {
            working: data.success || false,
            response: data.research ? 'Research generated' : 'No research',
            error: data.error || null
        };
        
        if (data.success) {
            console.log('✅ Market Research: Working - Research generated');
        } else {
            console.log(`⚠️  Market Research: ${data.error || 'Unknown issue'}`);
        }
        
    } catch (error) {
        results.coreFeatures.marketResearch = {
            working: false,
            error: error.message
        };
        console.log(`❌ Market Research: ${error.message}`);
    }
    
    // Test 4: AI Chat Feature
    console.log('\n💬 Testing AI Chat Feature...');
    try {
        const response = await fetch(`${BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Provide a brief overview of artificial intelligence trends in 2024',
                model: 'cohere'
            })
        });
        
        const data = await response.json();
        results.coreFeatures.aiChat = {
            working: data.serviceActive || false,
            live: data.isLive || false,
            response: data.response ? 'Response generated' : 'No response',
            model: data.model || 'Unknown'
        };
        
        if (data.serviceActive && data.isLive) {
            console.log(`✅ AI Chat: Working - ${data.model} responding`);
        } else {
            console.log('⚠️  AI Chat: Limited functionality');
        }
        
    } catch (error) {
        results.coreFeatures.aiChat = {
            working: false,
            error: error.message
        };
        console.log(`❌ AI Chat: ${error.message}`);
    }
    
    // Calculate overall health
    const activeServices = Object.values(results.apiServices).filter(s => s.active && s.live).length;
    const workingFeatures = Object.values(results.coreFeatures).filter(f => f.working).length;
    
    results.overallHealth = activeServices >= 1 && workingFeatures >= 2;
    
    // Final Summary
    console.log('\n📋 COMPREHENSIVE VALIDATION SUMMARY');
    console.log('=====================================');
    console.log(`🔌 Active API Services: ${activeServices}/8`);
    console.log(`⚙️  Working Core Features: ${workingFeatures}/3`);
    console.log(`🏥 Overall Platform Health: ${results.overallHealth ? 'HEALTHY' : 'NEEDS ATTENTION'}`);
    
    // Detailed breakdown
    console.log('\n📊 DETAILED SERVICE STATUS:');
    Object.entries(results.apiServices).forEach(([service, status]) => {
        const icon = status.active && status.live ? '✅' : '⚠️';
        console.log(`${icon} ${service.toUpperCase()}: ${status.active && status.live ? 'ACTIVE' : 'INACTIVE'}`);
    });
    
    console.log('\n🔧 CORE FEATURE STATUS:');
    Object.entries(results.coreFeatures).forEach(([feature, status]) => {
        const icon = status.working ? '✅' : '❌';
        const name = feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        console.log(`${icon} ${name}: ${status.working ? 'WORKING' : 'NEEDS ATTENTION'}`);
    });
    
    return results;
}

// Run validation
validateIntelSpherePlatform()
    .then(results => {
        console.log('\n🎯 VALIDATION COMPLETE');
        if (results.overallHealth) {
            console.log('✅ IntelSphere platform is operational and ready for production use');
        } else {
            console.log('⚠️  Platform requires optimization for full functionality');
        }
    })
    .catch(error => {
        console.error('❌ VALIDATION FAILED:', error.message);
    });