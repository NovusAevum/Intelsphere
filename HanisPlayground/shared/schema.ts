import { pgTable, text, integer, timestamp, jsonb, boolean, real, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Intelligence Operations Table
export const intelligenceOperations = pgTable('intelligence_operations', {
  id: uuid('id').primaryKey().defaultRandom(),
  operationId: text('operation_id').notNull().unique(),
  target: text('target').notNull(),
  operationType: text('operation_type').notNull(), // 'comprehensive', 'blackice_phase1', 'blackice_phase2', etc.
  status: text('status').notNull().default('initializing'), // 'initializing', 'scanning', 'analyzing', 'complete', 'error'
  threatLevel: text('threat_level').notNull().default('MEDIUM'), // 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  confidence: real('confidence').notNull().default(0.0),
  
  // AI Analysis Results
  aiInsights: jsonb('ai_insights').$type<{
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    riskAssessment: string;
    adversarialTactics: string[];
  }>(),
  
  // OSINT Findings
  osintData: jsonb('osint_data').$type<any[]>().default([]),
  socialProfiles: jsonb('social_profiles').$type<any[]>().default([]),
  technicalIntelligence: jsonb('technical_intelligence').$type<any[]>().default([]),
  financialData: jsonb('financial_data').$type<any[]>().default([]),
  geospatialData: jsonb('geospatial_data').$type<any[]>().default([]),
  behavioralPatterns: jsonb('behavioral_patterns').$type<any[]>().default([]),
  networkConnections: jsonb('network_connections').$type<any[]>().default([]),
  threatIndicators: jsonb('threat_indicators').$type<any[]>().default([]),
  
  // Voice Synthesis Configuration
  voiceSynthesis: jsonb('voice_synthesis').$type<{
    enabled: boolean;
    personality: string;
    language: string;
    dialect: string;
  }>(),
  
  // Framework Execution Results
  frameworkResults: jsonb('framework_results').$type<{
    blackice_phase1?: any;
    blackice_phase2?: any;
    luxcore_gideon?: any;
    greycell_recon?: any;
    osint_handbook?: any;
    deep_web_osint?: any;
  }>(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Multi-Modal AI Agents Table
export const aiAgents = pgTable('ai_agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: text('agent_id').notNull().unique(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'A2A_SOLDIER', 'MMA2MMA_CAPTAIN', 'AMMA2AMMA_COMMANDER', 'CHIEF_STATE_COMMANDER'
  status: text('status').notNull().default('standby'), // 'active', 'processing', 'standby', 'error'
  capabilities: jsonb('capabilities').$type<string[]>().default([]),
  currentTask: text('current_task'),
  
  // Performance Metrics
  performanceMetrics: jsonb('performance_metrics').$type<{
    tasksCompleted: number;
    successRate: number;
    responseTime: number;
    accuracy: number;
  }>(),
  
  // AI Model Configuration
  modelConfig: jsonb('model_config').$type<{
    primaryModel: string;
    fallbackModels: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
  }>(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// API Credentials Management Table
export const apiCredentials = pgTable('api_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceName: text('service_name').notNull().unique(),
  apiKey: text('api_key').notNull(),
  apiSecret: text('api_secret'),
  endpoint: text('endpoint'),
  rateLimit: integer('rate_limit').default(1000),
  lastUsed: timestamp('last_used'),
  usage: jsonb('usage').$type<{
    dailyCount: number;
    monthlyCount: number;
    totalCount: number;
  }>().default({ dailyCount: 0, monthlyCount: 0, totalCount: 0 }),
  isActive: boolean('is_active').default(true),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Search Engine Integration Table
export const searchEngineResults = pgTable('search_engine_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  operationId: text('operation_id').notNull(),
  searchEngine: text('search_engine').notNull(), // 'google', 'bing', 'duckduckgo', etc.
  query: text('query').notNull(),
  results: jsonb('results').$type<any[]>().default([]),
  totalResults: integer('total_results').default(0),
  searchTime: real('search_time').default(0.0),
  relevanceScore: real('relevance_score').default(0.0),
  
  createdAt: timestamp('created_at').defaultNow(),
});

// Deep Web Intelligence Table
export const deepWebIntelligence = pgTable('deep_web_intelligence', {
  id: uuid('id').primaryKey().defaultRandom(),
  operationId: text('operation_id').notNull(),
  source: text('source').notNull(), // 'tor_network', 'academic_database', 'private_repository', etc.
  dataType: text('data_type').notNull(), // 'deleted_content', 'private_data', 'archived_content'
  content: jsonb('content').$type<any>(),
  confidenceLevel: real('confidence_level').default(0.0),
  verificationStatus: text('verification_status').default('unverified'), // 'verified', 'unverified', 'disputed'
  accessMethod: text('access_method'), // 'wayback_machine', 'google_cache', 'archive_today', 'tor_crawler'
  
  createdAt: timestamp('created_at').defaultNow(),
});

// Advanced NLP Processing Table
export const nlpAnalysis = pgTable('nlp_analysis', {
  id: uuid('id').primaryKey().defaultRandom(),
  operationId: text('operation_id').notNull(),
  textContent: text('text_content').notNull(),
  language: text('language').notNull(),
  sentiment: jsonb('sentiment').$type<{
    score: number;
    magnitude: number;
    label: string;
  }>(),
  entities: jsonb('entities').$type<any[]>().default([]),
  keywords: jsonb('keywords').$type<string[]>().default([]),
  topics: jsonb('topics').$type<string[]>().default([]),
  threatIndicators: jsonb('threat_indicators').$type<string[]>().default([]),
  
  // Multi-language Analysis
  translations: jsonb('translations').$type<Record<string, string>>().default({}),
  languageConfidence: real('language_confidence').default(0.0),
  
  createdAt: timestamp('created_at').defaultNow(),
});

// Platform Coverage Tracking Table
export const platformCoverage = pgTable('platform_coverage', {
  id: uuid('id').primaryKey().defaultRandom(),
  operationId: text('operation_id').notNull(),
  platform: text('platform').notNull(), // 'facebook', 'twitter', 'linkedin', 'corporate_intranet', etc.
  accessType: text('access_type').notNull(), // 'public', 'private', 'deleted_recovery', 'deep_web'
  dataCollected: jsonb('data_collected').$type<any>(),
  collectionMethod: text('collection_method'), // 'api', 'scraping', 'archive_recovery', 'tor_access'
  status: text('status').default('pending'), // 'pending', 'success', 'failed', 'partial'
  
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const intelligenceOperationsRelations = relations(intelligenceOperations, ({ many }) => ({
  searchResults: many(searchEngineResults),
  deepWebData: many(deepWebIntelligence),
  nlpAnalysis: many(nlpAnalysis),
  platformCoverage: many(platformCoverage),
}));

export const searchEngineResultsRelations = relations(searchEngineResults, ({ one }) => ({
  operation: one(intelligenceOperations, {
    fields: [searchEngineResults.operationId],
    references: [intelligenceOperations.operationId],
  }),
}));

export const deepWebIntelligenceRelations = relations(deepWebIntelligence, ({ one }) => ({
  operation: one(intelligenceOperations, {
    fields: [deepWebIntelligence.operationId],
    references: [intelligenceOperations.operationId],
  }),
}));

export const nlpAnalysisRelations = relations(nlpAnalysis, ({ one }) => ({
  operation: one(intelligenceOperations, {
    fields: [nlpAnalysis.operationId],
    references: [intelligenceOperations.operationId],
  }),
}));

export const platformCoverageRelations = relations(platformCoverage, ({ one }) => ({
  operation: one(intelligenceOperations, {
    fields: [platformCoverage.operationId],
    references: [intelligenceOperations.operationId],
  }),
}));

// Insert Schemas
export const insertIntelligenceOperationSchema = createInsertSchema(intelligenceOperations);
export const insertAiAgentSchema = createInsertSchema(aiAgents);
export const insertApiCredentialSchema = createInsertSchema(apiCredentials);
export const insertSearchEngineResultSchema = createInsertSchema(searchEngineResults);
export const insertDeepWebIntelligenceSchema = createInsertSchema(deepWebIntelligence);
export const insertNlpAnalysisSchema = createInsertSchema(nlpAnalysis);
export const insertPlatformCoverageSchema = createInsertSchema(platformCoverage);

// Types
export type IntelligenceOperation = typeof intelligenceOperations.$inferSelect;
export type InsertIntelligenceOperation = z.infer<typeof insertIntelligenceOperationSchema>;
export type AiAgent = typeof aiAgents.$inferSelect;
export type InsertAiAgent = z.infer<typeof insertAiAgentSchema>;
export type ApiCredential = typeof apiCredentials.$inferSelect;
export type InsertApiCredential = z.infer<typeof insertApiCredentialSchema>;
export type SearchEngineResult = typeof searchEngineResults.$inferSelect;
export type InsertSearchEngineResult = z.infer<typeof insertSearchEngineResultSchema>;
export type DeepWebIntelligence = typeof deepWebIntelligence.$inferSelect;
export type InsertDeepWebIntelligence = z.infer<typeof insertDeepWebIntelligenceSchema>;
export type NlpAnalysis = typeof nlpAnalysis.$inferSelect;
export type InsertNlpAnalysis = z.infer<typeof insertNlpAnalysisSchema>;
export type PlatformCoverage = typeof platformCoverage.$inferSelect;
export type InsertPlatformCoverage = z.infer<typeof insertPlatformCoverageSchema>;