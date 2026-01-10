import { db } from "./db";
import {
  skills, projects, messages,
  type Skill, type Project, type Message, type InsertMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async seedData(): Promise<void> {
    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "WP Engine", category: "Cloud Hosting", description: "Headless WordPress, Atlas" },
        { name: "AWS", category: "Cloud Hosting", description: "EC2, S3, CloudFront" },
        { name: "n8n", category: "Automation", description: "Workflow automation" },
        { name: "Zapier", category: "Automation", description: "Integration workflows" },
        { name: "Cloudflare", category: "Layer 7 Tools", description: "Workers, Pages, Security" },
        { name: "Replit Agent", category: "Agentic Dev", description: "AI-assisted development" },
        { name: "LangChain", category: "Agentic Dev", description: "LLM orchestration" },
      ]);
    }

    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          title: "Headless WordPress Portfolio",
          description: "A high-performance portfolio site built with WP Engine Atlas and Next.js.",
          link: "https://wpengine.com/atlas",
          tags: ["Next.js", "WordPress", "GraphQL"]
        },
        {
          title: "Automated Lead Intake",
          description: "End-to-end automation pipeline using n8n to process leads from web forms to CRM.",
          link: "#",
          tags: ["n8n", "CRM", "Webhooks"]
        },
        {
          title: "Edge Computed Security",
          description: "Layer 7 security rules implemented via Cloudflare Workers for high-traffic sites.",
          link: "#",
          tags: ["Cloudflare", "JavaScript", "Security"]
        }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
