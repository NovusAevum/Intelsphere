import { db } from "./db";
import { 
  intelligenceOperations, 
  aiAgents, 
  apiCredentials, 
  searchEngineResults, 
  deepWebIntelligence, 
  nlpAnalysis, 
  platformCoverage,
  type IntelligenceOperation,
  type InsertIntelligenceOperation,
  type AiAgent,
  type InsertAiAgent,
  type ApiCredential,
  type InsertApiCredential
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Intelligence Operations
  createIntelligenceOperation(operation: InsertIntelligenceOperation): Promise<IntelligenceOperation>;
  getIntelligenceOperation(operationId: string): Promise<IntelligenceOperation | undefined>;
  updateIntelligenceOperation(operationId: string, updates: Partial<IntelligenceOperation>): Promise<IntelligenceOperation>;
  getAllIntelligenceOperations(): Promise<IntelligenceOperation[]>;

  // AI Agents
  createAiAgent(agent: InsertAiAgent): Promise<AiAgent>;
  getAiAgent(agentId: string): Promise<AiAgent | undefined>;
  updateAiAgent(agentId: string, updates: Partial<AiAgent>): Promise<AiAgent>;
  getAllAiAgents(): Promise<AiAgent[]>;

  // API Credentials
  createApiCredential(credential: InsertApiCredential): Promise<ApiCredential>;
  getApiCredential(serviceName: string): Promise<ApiCredential | undefined>;
  updateApiCredential(serviceName: string, updates: Partial<ApiCredential>): Promise<ApiCredential>;
  getAllApiCredentials(): Promise<ApiCredential[]>;
}

export class DatabaseStorage implements IStorage {
  // Intelligence Operations
  async createIntelligenceOperation(operation: InsertIntelligenceOperation): Promise<IntelligenceOperation> {
    const [created] = await db
      .insert(intelligenceOperations)
      .values(operation)
      .returning();
    return created;
  }

  async getIntelligenceOperation(operationId: string): Promise<IntelligenceOperation | undefined> {
    const [operation] = await db
      .select()
      .from(intelligenceOperations)
      .where(eq(intelligenceOperations.operationId, operationId));
    return operation || undefined;
  }

  async updateIntelligenceOperation(operationId: string, updates: Partial<IntelligenceOperation>): Promise<IntelligenceOperation> {
    const [updated] = await db
      .update(intelligenceOperations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(intelligenceOperations.operationId, operationId))
      .returning();
    return updated;
  }

  async getAllIntelligenceOperations(): Promise<IntelligenceOperation[]> {
    return await db.select().from(intelligenceOperations);
  }

  // AI Agents
  async createAiAgent(agent: InsertAiAgent): Promise<AiAgent> {
    const [created] = await db
      .insert(aiAgents)
      .values(agent)
      .returning();
    return created;
  }

  async getAiAgent(agentId: string): Promise<AiAgent | undefined> {
    const [agent] = await db
      .select()
      .from(aiAgents)
      .where(eq(aiAgents.agentId, agentId));
    return agent || undefined;
  }

  async updateAiAgent(agentId: string, updates: Partial<AiAgent>): Promise<AiAgent> {
    const [updated] = await db
      .update(aiAgents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(aiAgents.agentId, agentId))
      .returning();
    return updated;
  }

  async getAllAiAgents(): Promise<AiAgent[]> {
    return await db.select().from(aiAgents);
  }

  // API Credentials
  async createApiCredential(credential: InsertApiCredential): Promise<ApiCredential> {
    const [created] = await db
      .insert(apiCredentials)
      .values(credential)
      .returning();
    return created;
  }

  async getApiCredential(serviceName: string): Promise<ApiCredential | undefined> {
    const [credential] = await db
      .select()
      .from(apiCredentials)
      .where(eq(apiCredentials.serviceName, serviceName));
    return credential || undefined;
  }

  async updateApiCredential(serviceName: string, updates: Partial<ApiCredential>): Promise<ApiCredential> {
    const [updated] = await db
      .update(apiCredentials)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(apiCredentials.serviceName, serviceName))
      .returning();
    return updated;
  }

  async getAllApiCredentials(): Promise<ApiCredential[]> {
    return await db.select().from(apiCredentials);
  }
}

export const storage = new DatabaseStorage();