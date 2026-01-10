import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-8 flex flex-col h-full z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-white/5 text-white">
            <Github className="w-6 h-6" />
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <h3 className="text-2xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium font-mono bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
