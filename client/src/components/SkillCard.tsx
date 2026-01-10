import { motion } from "framer-motion";
import { Server, Zap, Globe, Cpu } from "lucide-react";
import type { Skill } from "@shared/schema";

const categoryIcons: Record<string, React.ReactNode> = {
  "Cloud Hosting": <Server className="w-6 h-6" />,
  "Automation": <Zap className="w-6 h-6" />,
  "Layer 7": <Globe className="w-6 h-6" />,
  "Agentic Dev": <Cpu className="w-6 h-6" />,
};

interface SkillCardProps {
  category: string;
  skills: Skill[];
  index: number;
}

export function SkillCard({ category, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-card/50 hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
          {categoryIcons[category] || <Cpu className="w-6 h-6" />}
        </div>
        <h3 className="text-xl font-bold font-display tracking-tight text-white">{category}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="relative pl-4 border-l-2 border-white/10 hover:border-primary transition-colors">
            <h4 className="font-semibold text-foreground">{skill.name}</h4>
            {skill.description && (
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {skill.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
