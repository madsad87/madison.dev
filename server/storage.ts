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

import { wpClient, wpRestClient, QUERIES, type WPSkill, type WPProject } from "./wordpress";

// ... existing interfaces ...

export class WordPressStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    try {
      const data = await wpClient.request<{ skills: { nodes: WPSkill[] } }>(QUERIES.GET_SKILLS);
      return data.skills.nodes.map((node, index) => ({
        id: index + 1, // Mock ID or map from WP ID
        name: node.title,
        category: node.acfSkills.category,
        description: node.acfSkills.description,
      }));
    } catch (error) {
      console.error("Failed to fetch skills from WordPress:", error);
      return [];
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      const data = await wpClient.request<{ projects: { nodes: WPProject[] } }>(QUERIES.GET_PROJECTS);
      return data.projects.nodes.map((node, index) => ({
        id: index + 1,
        title: node.title,
        description: node.acfProjects.description,
        link: node.acfProjects.link,
        tags: node.acfProjects.tags ? node.acfProjects.tags.split(',').map(t => t.trim()) : [],
      }));
    } catch (error) {
      console.error("Failed to fetch projects from WordPress:", error);
      return [];
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
      // Ninja Forms Submission
      // Note: You need to find the specific Form ID and Field IDs for your Ninja Form
      const FORM_ID = process.env.NINJA_FORM_ID || '1';

      // Example payload structure for Ninja Forms REST API
      // This often requires specific field IDs (e.g., id_1, id_2)
      // For now, we are sending a generic payload, but this will likely need
      // to be adjusted to match the specific form's field IDs.
      const formData = new FormData();
      formData.append('formData', JSON.stringify({
        fields: [
          { id: 1, value: insertMessage.name }, // Name field ID
          { id: 2, value: insertMessage.email }, // Email field ID
          { id: 3, value: insertMessage.message } // Message field ID
        ]
      }));

      const response = await wpRestClient.post(`/ninja-forms-submission/v1/submissions`, formData);

      return {
        id: response.data.id || Math.floor(Math.random() * 1000),
        ...insertMessage,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error("Failed to submit message to Ninja Forms:", error);
      throw new Error("Failed to send message.");
    }
  }

  async seedData(): Promise<void> {
    // No-op for Headless WP as data is managed in CMS
    console.log("Seed data skipped for Headless WP");
  }
}

export const storage = new WordPressStorage();
