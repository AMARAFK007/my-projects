import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Settings, Server, Smartphone } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedText } from '../ui/AnimatedText';

type SkillCategory = {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  level: number; // 0-100
};

const skillCategories: SkillCategory[] = [
  {
    icon: <Code size={24} className="text-primary" />,
    title: 'Frontend Development',
    description: 'Creating responsive, intuitive user interfaces with modern frameworks',
    skills: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React & React Native', level: 90 },
      { name: 'Vue.js', level: 85 },
      { name: 'Next.js', level: 90 },
      { name: 'CSS/SCSS/Tailwind', level: 95 },
    ],
  },
  {
    icon: <Server size={24} className="text-secondary" />,
    title: 'Backend Development',
    description: 'Building robust, scalable server-side applications and APIs',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 85 },
      { name: 'Python/Django', level: 80 },
      { name: 'GraphQL', level: 85 },
      { name: 'RESTful APIs', level: 95 },
    ],
  },
  {
    icon: <Database size={24} className="text-accent" />,
    title: 'Database & DevOps',
    description: 'Managing data and deployment infrastructure',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'Docker/Kubernetes', level: 85 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    icon: <Layout size={24} className="text-primary" />,
    title: 'UI/UX Design',
    description: 'Designing beautiful, intuitive user experiences',
    skills: [
      { name: 'Figma', level: 90 },
      { name: 'Adobe XD', level: 85 },
      { name: 'Wireframing', level: 95 },
      { name: 'Prototyping', level: 90 },
      { name: 'User Research', level: 80 },
    ],
  },
  {
    icon: <Smartphone size={24} className="text-secondary" />,
    title: 'Mobile Development',
    description: 'Building cross-platform mobile applications',
    skills: [
      { name: 'React Native', level: 90 },
      { name: 'Flutter', level: 75 },
      { name: 'iOS/Swift', level: 70 },
      { name: 'Android/Kotlin', level: 70 },
      { name: 'Mobile UI/UX', level: 85 },
    ],
  },
  {
    icon: <Settings size={24} className="text-accent" />,
    title: 'Other Skills',
    description: 'Additional technologies and methodologies',
    skills: [
      { name: 'Git/Version Control', level: 95 },
      { name: 'Agile/Scrum', level: 90 },
      { name: 'Testing (Jest, Cypress)', level: 85 },
      { name: 'Performance Optimization', level: 90 },
      { name: 'SEO', level: 85 },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <Section id="skills" className="relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4"
          >
            My Expertise
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedText 
              text="Skills & Technologies"
              once
            />
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-foreground/80 text-lg"
          >
            A comprehensive overview of my technical skills and areas of expertise
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-background-lighter mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <p className="text-foreground/70 mb-6">
                {category.description}
              </p>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-foreground/60">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-lighter rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};