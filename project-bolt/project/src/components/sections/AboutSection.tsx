import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Coffee, Users, Briefcase } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedText } from '../ui/AnimatedText';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ParallaxImage } from '../ui/ParallaxImage';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { 
      icon: <Award className="text-primary" size={24} />, 
      value: 5, 
      label: 'Years Experience', 
      suffix: '+' 
    },
    { 
      icon: <Briefcase className="text-secondary" size={24} />, 
      value: 50, 
      label: 'Projects Completed', 
      suffix: '+' 
    },
    { 
      icon: <Users className="text-accent" size={24} />, 
      value: 30, 
      label: 'Happy Clients', 
      suffix: '+' 
    },
    { 
      icon: <Coffee className="text-primary" size={24} />, 
      value: 1000, 
      label: 'Coffee Cups', 
      suffix: '+' 
    },
  ];

  return (
    <Section id="about" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div ref={ref} className="container relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4"
          >
            About Me
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedText 
              text="Passionate Developer & Problem Solver"
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
            I transform complex challenges into elegant, user-friendly solutions with clean, efficient code
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <motion.div 
              className="relative z-10 overflow-hidden rounded-xl border border-foreground/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <ParallaxImage 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Developer working" 
                className="w-full h-[450px] rounded-xl" 
                speed={0.2}
              />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -right-8 w-72 h-72 bg-background-lighter/80 backdrop-blur-sm rounded-xl border border-foreground/10 z-20 p-5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ y }}
            >
              <div className="h-full w-full rounded-lg p-6 flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold gradient-text">My Mission</h3>
                <p className="text-foreground/80">
                  To create digital experiences that not only solve problems but also inspire and delight users while pushing the boundaries of what's possible on the web.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">Full Stack Developer</span> with a passion for creating innovative web solutions
            </h3>
            
            <p className="text-foreground/80">
              With over 5 years of experience, I specialize in building high-performance, responsive web applications that deliver exceptional user experiences. My expertise spans the entire development stack, from designing beautiful user interfaces to architecting scalable backend systems.
            </p>
            
            <p className="text-foreground/80">
              I approach each project with a focus on solving real problems, writing clean, maintainable code, and continuously learning new technologies to stay at the forefront of web development.
            </p>
            
            <div className="grid grid-cols-2 gap-8 my-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg bg-background-light border border-foreground/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="mb-2">{stat.icon}</div>
                  <h4 className="text-2xl font-bold mb-1">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix} 
                    />
                  </h4>
                  <p className="text-foreground/70 text-sm text-center">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="primary"
                onClick={() => window.location.href = '#projects'}
              >
                View Projects
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};