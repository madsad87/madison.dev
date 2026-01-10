import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type ContactInput } from "@shared/routes";
import Navbar from "@/components/Navbar";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { useSkills, useProjects } from "@/hooks/use-content";
import { useContact } from "@/hooks/use-contact";
import { Loader2, Send, ChevronDown, Terminal, Database, Cloud } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: skills, isLoading: isLoadingSkills } = useSkills();
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const contactMutation = useContact();

  const form = useForm<ContactInput>({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactInput) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Available for new projects</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
                Architecting <br />
                <span className="text-gradient">Digital Intelligence</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                I'm Madison Sadler, specializing in Cloud WordPress, Automation, and Agentic Development. 
                I build robust, scalable systems that power the next generation of the web.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full text-base h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full text-base h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="relative glass-card rounded-2xl p-8 border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                      <Cloud className="w-8 h-8 text-primary mb-3" />
                      <div className="font-mono text-sm text-muted-foreground">uptime</div>
                      <div className="text-2xl font-bold text-white">99.99%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                      <Database className="w-8 h-8 text-accent mb-3" />
                      <div className="font-mono text-sm text-muted-foreground">projects</div>
                      <div className="text-2xl font-bold text-white">50+</div>
                    </div>
                    <div className="col-span-2 p-4 rounded-xl bg-background/50 border border-white/5">
                      <Terminal className="w-8 h-8 text-green-400 mb-3" />
                      <div className="font-mono text-xs text-muted-foreground mb-2">$ initializing_agent...</div>
                      <div className="font-mono text-sm text-green-400">{">"} systemic_optimization_complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mastering the intersection of infrastructure, automation, and intelligent agents.
            </p>
          </div>

          {isLoadingSkills ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {groupedSkills && Object.entries(groupedSkills).map(([category, items], idx) => (
                <SkillCard key={category} category={category} skills={items} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-xl">
                A selection of work demonstrating capabilities in headless CMS architecture and automated workflows.
              </p>
            </div>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              View Github Profile
            </Button>
          </div>

          {isLoadingProjects ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Let's Build Something Amazing</h2>
            <p className="text-muted-foreground">
              Whether you need a headless WordPress architecture or a custom automation agent, I'm ready to help.
            </p>
          </div>

          <div className="bg-background border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-secondary/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            className="bg-secondary/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="bg-secondary/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 min-h-[160px] rounded-xl resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Madison Sadler. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
