import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';
import { AnimatedText } from '../ui/AnimatedText';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!shapesRef.current) return;
    
    const shapes = shapesRef.current.querySelectorAll('.shape');
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      
      shapes.forEach((shape) => {
        const speed = parseFloat((shape as HTMLElement).dataset.speed || '1');
        gsap.to(shape, {
          x: x * speed,
          y: y * speed,
          duration: 1,
          ease: 'power2.out',
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden retro-grid"
    >
      {/* Animated shapes */}
      <div ref={shapesRef} className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="shape absolute top-1/4 right-[20%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
          data-speed="0.5"
        />
        <div 
          className="shape absolute bottom-1/4 left-[15%] w-80 h-80 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-3xl"
          data-speed="0.7"
        />
        <div 
          className="shape absolute top-1/3 left-[30%] w-40 h-40 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-2xl"
          data-speed="1.2"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium"
              >
                Full Stack Developer
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <AnimatedText 
                  text="Crafting Digital Experiences That Inspire"
                  className="gradient-text"
                  once
                />
              </h1>
              
              <motion.p 
                className="text-lg md:text-xl text-foreground/80 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                I build elegant, high-performance web applications with cutting-edge technologies and exceptional user experiences.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.location.href = '#projects'}
                  className="group"
                >
                  View My Work
                  <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '#contact'}
                >
                  Get In Touch
                </Button>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-foreground/60 font-medium">Tech Stack:</p>
                {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'].map((tech, index) => (
                  <motion.span 
                    key={tech}
                    className="flex items-center text-foreground/80 font-mono"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <Code size={16} className="mr-1 text-primary" />
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-foreground/10 overflow-hidden backdrop-blur-sm">
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Developer portrait" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-background rounded-lg border border-foreground/10 p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="h-full w-full bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold gradient-text">5+</span>
                    <span className="text-sm text-foreground/80">Years Exp.</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 w-36 h-36 bg-background rounded-lg border border-foreground/10 p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="h-full w-full bg-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold gradient-text">50+</span>
                    <span className="text-sm text-foreground/80">Projects Completed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-foreground/60 text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};