# Widget Behavior Extraction Analysis

## Core Intelligence Widgets

### 1. System Monitoring Widgets

#### `system-dashboard.tsx` - **Command Center Status Monitor**
- **Widget Name**: System Command Center
- **Purpose**: Real-time system health and operational status monitoring
- **UI Type**: Multi-card status dashboard with live metrics
- **Input Sources**: 
  - Internal state: Agent statistics, system uptime
  - External API: `/api/agents`, `/api/system-logs`
- **Dependencies**: 
  - Agent layer: Agent status integration
  - Enterprise layer: System logging infrastructure
  - Spy-mode: Minimal dependency (status display only)
- **Status Indicators**:
  - Command Center: OPERATIONAL status
  - Database: CONNECTED status  
  - AI Agents: `activeAgents/totalAgents` ratio
  - Security: SECURE status
- **Update Frequency**: 5-second intervals for system logs
- **Integration Value**: Essential for GIDEON/LUXCORE system health monitoring

#### `ai-model-status-dashboard.tsx` - **Multi-Model AI Status**
- **Widget Name**: AI Model Status Dashboard
- **Purpose**: Real-time monitoring of 8-model AI ensemble status
- **UI Type**: Professional dashboard with model cards and architecture metrics
- **Input Sources**:
  - External API: `/api/model-status`
  - Fallback: Comprehensive model status simulation
- **Dependencies**:
  - AI Interface layer: Direct model communication
  - Enterprise layer: API authentication for external models
  - Spy-mode: Independent operation
- **Model Coverage**:
  - GPT-4o (OpenAI): Chat completions
  - Claude Sonnet 4 (Anthropic): Message processing
  - Grok-2 (xAI): Chat completions
  - Mistral Large: Chat completions
  - Gemini Pro (Google): Content generation
  - Command R+ (Cohere): Chat interface
  - Voyage Large: Embeddings processing
  - Claude Haiku: Fast message processing
- **Architecture Metrics**:
  - Tokenization layers: 16
  - Encoder-decoder depth: 32
  - Neural nodes: 8,192
  - Attention heads: 64
  - Context window: 131,072 tokens
- **Performance Tracking**:
  - Response time monitoring
  - Success rate calculation
  - Provider endpoint status
- **Update Frequency**: 30-second intervals
- **Integration Value**: Critical for GIDEON AI orchestration and REDCELL adversarial testing

#### `neural-dashboard.tsx` - **Neural Processing Monitor** 
- **Widget Name**: Neural Activity Dashboard
- **Purpose**: Real-time neural network processing visualization
- **UI Type**: Live activity cards with animated metrics
- **Input Sources**: Simulated neural activity (internal state)
- **Dependencies**:
  - Agent layer: Neural activity correlation with agent operations
  - Spy-mode: Visual enhancement compatibility
  - Enterprise layer: Minimal dependency
- **Neural Metrics**:
  - Agent-specific activity levels (Linny, Tuck, Mingming)
  - System resource utilization (CPU, memory, network)
  - Active connection tracking
  - Task processing counters
- **Capabilities Tracking**:
  - Intelligence gathering operations
  - Data analysis processing
  - Threat assessment activities
  - OSINT operation monitoring
- **Update Frequency**: 2-second intervals
- **Integration Value**: Essential for GIDEON neural network monitoring and LUXCORE processing optimization

### 2. Market Intelligence Widgets

#### `live-widgets.tsx` - **Core Market Intelligence**
- **Widget Name**: Live Market Data Stream
- **Purpose**: Real-time financial market monitoring and intelligence
- **UI Type**: Card-based data feed with scrolling updates
- **Input Sources**:
  - External API: `/api/market-data` (primary)
  - Fallback: Structured demo data (TSLA, AAPL, NVDA, MSFT)
- **Dependencies**:
  - Enterprise layer: Market data provider authentication
  - Spy-mode: Enhanced visual effects during monitoring
  - Agent layer: Integration with strategic analysis agents
- **Market Coverage**:
  - Technology stocks (TSLA, NVDA, AAPL, MSFT)
  - Real-time price tracking
  - Change percentage monitoring
  - Volume analysis
- **Intelligence Features**:
  - Threat landscape integration
  - Regional activity monitoring
  - Intelligence source tracking
- **Update Frequency**: Continuous streaming
- **Integration Value**: Critical for LUXCORE economic intelligence and GIDEON market analysis

#### `enhanced-live-widgets.tsx` - **Professional Market Intelligence**
- **Widget Name**: Enhanced Market Data Intelligence
- **Purpose**: Institutional-grade financial intelligence with deep analytics
- **UI Type**: Professional dashboard cards with trend indicators
- **Input Sources**:
  - External API: `/api/market-data` (authenticated feeds)
  - Real financial data providers
- **Dependencies**:
  - Enterprise layer: High dependency on authenticated financial data
  - Spy-mode: Professional monitoring mode integration
  - Agent layer: Strategic intelligence correlation
- **Features**:
  - Institutional market indices
  - Real-time trend analysis
  - Professional-grade data visualization
  - Authenticated financial feeds
- **Update Frequency**: 5-second intervals
- **Error Handling**: Graceful degradation with loading states
- **Integration Value**: Essential for LUXCORE financial operations and GIDEON economic threat assessment

#### `enhanced-malaysian-widgets.tsx` - **Regional Intelligence Focus**
- **Widget Name**: Malaysia & ASEAN Market Intelligence
- **Purpose**: Specialized regional market and intelligence monitoring
- **UI Type**: Gradient-enhanced cards with regional focus
- **Input Sources**:
  - External API: `/api/market-trends` (regional focus)
  - Malaysia/ASEAN specific data providers
- **Dependencies**:
  - Enterprise layer: Regional data provider authentication
  - Spy-mode: Regional intelligence enhancement
  - Agent layer: ASEAN strategic analysis integration
- **Regional Coverage**:
  - FTSE KLCI (Malaysia primary index)
  - ASEAN market indices
  - Regional economic indicators
  - Local market sentiment
- **Features**:
  - Regional market trend analysis
  - Local economic intelligence
  - ASEAN-focused financial monitoring
  - Cultural and economic context integration
- **Update Frequency**: 30-second intervals
- **Integration Value**: Critical for LUXCORE ASEAN operations and regional GIDEON deployment

### 3. Search & Trend Intelligence Widgets

#### `google-trends-widget.tsx` - **Search Intelligence Monitor**
- **Widget Name**: Global Search Trend Intelligence
- **Purpose**: Search behavior analysis and trend intelligence gathering
- **UI Type**: Interactive card with region/timeframe controls
- **Input Sources**:
  - External API: `/api/google-trends` (simulated Google Trends API)
  - Search volume and trend data
- **Dependencies**:
  - Enterprise layer: Google Trends API authentication
  - Spy-mode: Search pattern analysis enhancement
  - Agent layer: OSINT correlation with search intelligence
- **Intelligence Features**:
  - Global vs regional trend analysis
  - Search volume tracking
  - Related query analysis
  - Trend change percentage monitoring
- **Regional Options**: Global, regional selection
- **Timeframe Options**: 24h, 7d, 30d analysis
- **Categories**: Technology, Finance, Politics, Social
- **Update Frequency**: 60-second intervals
- **Integration Value**: High value for GIDEON trend analysis and OSINT correlation

### 4. Performance & Campaign Intelligence

#### `performance-center.tsx` - **Campaign Performance Intelligence**
- **Widget Name**: Marketing Performance Analytics
- **Purpose**: Real-time marketing campaign performance monitoring and optimization
- **UI Type**: Multi-metric dashboard with KPI tracking
- **Input Sources**: Internal state with performance simulation
- **Dependencies**:
  - Enterprise layer: Marketing platform integration
  - Spy-mode: Campaign intelligence enhancement
  - Agent layer: Strategic campaign analysis
- **KPI Tracking**:
  - ROAS (Return on Ad Spend): 4.2x+ performance
  - CTR (Click-Through Rate): 2.8%+ efficiency
  - Conversion Rate: 8.5%+ optimization
  - CPM (Cost Per Mille): $12+ cost management
- **Campaign Portfolio**:
  - OSINT Marketing: $50,000 budget
  - AI Solutions: $75,000 budget
  - Cybersecurity: $60,000 budget
  - Neural Networks: $40,000 budget
- **Automation Features**:
  - Targeting AI with 97.5% precision
  - Optimization engine with +340% ROI increase
  - Analytics core with 99.2% accuracy
  - Automation hub with 95% automation rate
- **Update Frequency**: 3-second intervals
- **Integration Value**: Essential for LUXCORE influence operations and GIDEON strategic marketing

#### `live-marketing-dashboard.tsx` - **Comprehensive Marketing Intelligence**
- **Widget Name**: Live Marketing Intelligence Dashboard
- **Purpose**: Comprehensive real-time marketing campaign monitoring and strategic intelligence
- **UI Type**: Advanced dashboard with multiple intelligence streams
- **Input Sources**:
  - Mixed: Internal state + external marketing APIs
  - Regional performance data (Global vs Malaysia)
- **Dependencies**:
  - Spy-mode: High dependency for enhanced intelligence gathering
  - Enterprise layer: Marketing platform API authentication
  - Agent layer: Strategic marketing intelligence correlation
- **Intelligence Streams**:
  - Global vs Malaysia performance metrics
  - Campaign budget and ROI tracking
  - Keyword volume and competition analysis
  - Real-time alert system (opportunity, warning, info)
- **Alert Categories**:
  - Opportunity alerts: Market openings
  - Warning alerts: Performance issues
  - Info alerts: Strategic intelligence updates
- **Regional Analysis**:
  - Global market performance
  - Malaysia-specific campaign optimization
  - Regional trend correlation
- **Update Frequency**: 5-second intervals (configurable)
- **Auto-refresh**: User-configurable intervals
- **Integration Value**: Critical for LUXCORE regional operations and GIDEON strategic intelligence

### 5. OSINT & Reconnaissance Widgets

#### `interactive-osint-source-map.tsx` - **OSINT Source Intelligence**
- **Widget Name**: Interactive OSINT Source Network
- **Purpose**: Real-time OSINT source monitoring and intelligence correlation
- **UI Type**: Interactive network visualization with source nodes
- **Input Sources**: Comprehensive OSINT source simulation
- **Dependencies**:
  - Spy-mode: High dependency for enhanced OSINT visualization
  - Agent layer: Direct integration with OSINT agents (Linny)
  - Enterprise layer: OSINT API authentication
- **Source Categories**:
  - Search engines: Google Advanced Search, specialized search
  - Technical: Shodan infrastructure scanning
  - Social media: Multi-platform intelligence gathering
  - Dark web: Specialized intelligence sources
  - Government: Official intelligence feeds
  - Commercial: Business intelligence sources
  - Archives: Historical data sources
  - Threat intelligence: Security feeds
- **Intelligence Metrics**:
  - Source reliability: 0.89-0.94 confidence
  - Data points: 8,750-15,420 per source
  - Intelligence value: Low to Critical assessment
  - Regional coverage: Global to specific regions
- **Network Analysis**:
  - Connection mapping between sources
  - Cross-reference validation
  - Threat correlation analysis
  - Data flow visualization
- **Real-time Features**:
  - Live source status monitoring
  - Intelligence gathering simulation
  - Correlation analysis updates
- **Integration Value**: Essential for GIDEON OSINT operations and REDCELL threat simulation

#### `reconnaissance-visualization.tsx` - **Reconnaissance Intelligence**
- **Widget Name**: Reconnaissance Data Visualization
- **Purpose**: Real-time reconnaissance data analysis and threat visualization
- **UI Type**: Multi-tab interface with network topology and timeline analysis
- **Input Sources**: Comprehensive reconnaissance data simulation
- **Dependencies**:
  - Spy-mode: Moderate dependency for visualization enhancement
  - Agent layer: Integration with reconnaissance agents
  - Enterprise layer: Reconnaissance tool API integration
- **Visualization Modes**:
  - Network topology: Target and asset mapping
  - Timeline analysis: Chronological reconnaissance data
  - Geospatial: Geographic intelligence mapping
  - Threat analysis: Security assessment visualization
- **Data Categories**:
  - Network intelligence: Infrastructure mapping
  - Social intelligence: Social media reconnaissance
  - Infrastructure: Technical asset discovery
  - Threat intelligence: Security threat assessment
  - OSINT: Open source intelligence correlation
- **Source Integration**:
  - Shodan: Infrastructure scanning
  - Maltego: Link analysis
  - SpiderFoot: Automated reconnaissance
  - TheHarvester: Email and domain harvesting
  - Social media: Profile and connection analysis
- **Filtering Options**:
  - Category filtering: Network, social, infrastructure, threat, OSINT
  - Severity filtering: Low, medium, high, critical
  - Time range: Real-time to historical analysis
- **Update Frequency**: Real-time data collection with filtering
- **Integration Value**: Critical for REDCELL adversarial simulation and GIDEON reconnaissance operations

## Widget Dependency Matrix for Unified Dashboard

### Spy-Mode Dependencies
- **Critical**: interactive-osint-source-map.tsx, live-marketing-dashboard.tsx
- **High**: enhanced-malaysian-widgets.tsx, google-trends-widget.tsx
- **Medium**: reconnaissance-visualization.tsx, performance-center.tsx
- **Low**: live-widgets.tsx, system-dashboard.tsx
- **Minimal**: ai-model-status-dashboard.tsx, neural-dashboard.tsx

### Agent Layer Dependencies
- **Critical**: interactive-osint-source-map.tsx (LINNY integration)
- **High**: reconnaissance-visualization.tsx, live-marketing-dashboard.tsx
- **Medium**: ai-model-status-dashboard.tsx, neural-dashboard.tsx
- **Low**: enhanced-live-widgets.tsx, google-trends-widget.tsx
- **Minimal**: system-dashboard.tsx, performance-center.tsx

### Enterprise Layer Dependencies
- **Critical**: enhanced-live-widgets.tsx, enhanced-malaysian-widgets.tsx
- **High**: ai-model-status-dashboard.tsx, live-marketing-dashboard.tsx
- **Medium**: google-trends-widget.tsx, performance-center.tsx
- **Low**: interactive-osint-source-map.tsx, reconnaissance-visualization.tsx
- **Minimal**: live-widgets.tsx, system-dashboard.tsx, neural-dashboard.tsx

## Integration Recommendations for Unified IntelSphere Dashboard

### GIDEON Framework Integration
1. **OSINT Modules**: Direct integration with interactive-osint-source-map.tsx and reconnaissance-visualization.tsx
2. **AI Processing**: Central coordination through ai-model-status-dashboard.tsx and neural-dashboard.tsx
3. **Strategic Intelligence**: Market and trend analysis through enhanced widget suite
4. **System Monitoring**: Health monitoring through system-dashboard.tsx

### LUXCORE Multi-Agent Operations
1. **Regional Intelligence**: Enhanced Malaysian widgets for ASEAN operations
2. **Financial Intelligence**: Professional market intelligence widgets
3. **Campaign Intelligence**: Marketing dashboard for influence operations
4. **Multi-Model AI**: AI status dashboard for distributed processing

### REDCELL Adversarial Simulation
1. **Threat Simulation**: Reconnaissance visualization for adversarial testing
2. **System Stress Testing**: Neural dashboard for performance under load
3. **Intelligence Gathering**: OSINT source map for threat intelligence simulation
4. **Economic Warfare**: Market intelligence widgets for financial threat assessment

### Performance Optimization
1. **Real-time Updates**: Configurable refresh intervals across all widgets
2. **Authentication Management**: Centralized API key management for external sources
3. **Fallback Systems**: Graceful degradation when external APIs unavailable
4. **Regional Customization**: Localized intelligence for global deployment

This comprehensive widget behavior analysis provides the foundation for integrating all intelligence components into the unified IntelSphere dashboard while maintaining compatibility with GIDEON, LUXCORE, and REDCELL frameworks.