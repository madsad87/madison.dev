import axios from "axios";
import { GraphQLClient } from "graphql-request";

const WP_API_URL = process.env.WORDPRESS_API_URL || "https://madisondotdev.wpenginepowered.com";
const WP_GRAPHQL_URL = `${WP_API_URL}/graphql`;

// GraphQL Client for fetching content
export const wpClient = new GraphQLClient(WP_GRAPHQL_URL);

// Axios client for submitting forms (Ninja Forms REST API)
// Adjust the base URL if your Ninja Forms API is mounted elsewhere
export const wpRestClient = axios.create({
  baseURL: `${WP_API_URL}/wp-json`,
});

export interface WPSkill {
  title: string;
  acfSkills: {
    category: string;
    description: string;
  };
}

export interface WPProject {
  title: string;
  acfProjects: {
    description: string;
    link: string;
    tags: string; // Comma separated or similar, depending on implementation
  };
}

export const QUERIES = {
  GET_SKILLS: `
    query GetSkills {
      skills(first: 100) {
        nodes {
          title
          acfSkills {
            category
            description
          }
        }
      }
    }
  `,
  GET_PROJECTS: `
    query GetProjects {
      projects(first: 100) {
        nodes {
          title
          acfProjects {
            description
            link
            tags
          }
        }
      }
    }
  `,
};
