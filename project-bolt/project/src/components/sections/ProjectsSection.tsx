import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { useCursorStore } from '../../store/cursorStore';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  category: 'web' | 'mobile' | 'design';
};

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A comprehensive e-commerce solution with cart functionality, payment processing, and admin dashboard.',
    image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
  },
  {
    id: 2,
    title: 'Crypto Dashboard',
    description: 'Real-time cryptocurrency tracking dashboard with price alerts and portfolio management.',
    image: 'https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'TypeScript', 'WebSockets', 'Chart.js'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A Kanban-style task management application with drag-and-drop functionality.',
    image: 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
  },
  {
    id: 4,
    title: 'Social Media Mobile App',
    description: 'A feature-rich social media app with real-time messaging and content sharing.',
    image: 'https://images.pexels.com/photos/4549415/pexels-photo-4549415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React Native', 'Firebase', 'Redux'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'mobile',
  },
  {
    id: 5,
    title: 'Travel Booking Platform',
    description: 'A comprehensive travel booking application with hotel, flight, and activity reservations.',
    image: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Tailwind'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
  },
  {
    id: 6,
    title: 'Music Streaming App',
    description: 'A Spotify-like music streaming application with playlists and recommendations.',
    image: 'https://images.pexels.com/photos/4152505/pexels-photo-4152505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'mobile' | 'design'>('all');
  const { setCursorType } = useCursorStore();
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'UI/UX Design' },
  ];

  return (
    <Section id="projects" className="relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
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
            My Portfolio
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedText 
              text="Featured Projects"
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
            A selection of my recent work showcasing my skills and expertise in web development
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-background-light text-foreground/70 hover:bg-background-lighter'
                }`}
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="card card-hover overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden h-48 -mx-6 -mt-6 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-foreground/10">
                    {project.category === 'web' ? 'Web App' : project.category === 'mobile' ? 'Mobile App' : 'UI/UX Design'}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-background-lighter rounded-full text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <a
                    href={project.demoUrl}
                    className="flex items-center text-primary hover:text-primary-hover font-medium text-sm"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    Live Demo
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                  
                  <a
                    href={project.codeUrl}
                    className="flex items-center text-foreground/70 hover:text-primary font-medium text-sm"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    Source Code
                    <Github size={14} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="group"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Layers size={16} className="mr-2" />
            View More Projects
            <span className="ml-1 group-hover:ml-2 transition-all">→</span>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};