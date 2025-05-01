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
      value: 20,
      label: 'Projects Completed',
      suffix: '+'
    },
    {
      icon: <Users className="text-accent" size={24} />,
      value: 15,
      label: 'Happy Clients',
      suffix: '+'
    },
    {
      icon: <Coffee className="text-primary" size={24} />,
      value: 500,
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium"
          >
            About Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            <AnimatedText text="My Journey & Experience" once />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-foreground/70 mt-4"
          >
            Hello! I'm Amarjit Pradhan, a passionate Full Stack Developer from Bhubaneswar, India, specializing in building exceptional digital experiences that combine creativity with technical expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <ParallaxImage
              src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Amarjit Pradhan working on code"
              className="rounded-lg shadow-xl"
              height={500}
              offset={20}
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">My Background</h3>
              <p className="text-foreground/70">
                With over 5 years of experience in web development, I've cultivated a deep understanding of both frontend and backend technologies. I have a passion for creating intuitive user interfaces and robust backend systems that work seamlessly together.
              </p>
              <p className="text-foreground/70 mt-4">
                I graduated with a degree in Computer Science and have since worked with various technologies and frameworks, always staying at the cutting edge of web development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <h4 className="font-bold mb-2">Frontend</h4>
                <ul className="space-y-1 text-foreground/70">
                  <li>React.js / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Backend</h4>
                <ul className="space-y-1 text-foreground/70">
                  <li>Node.js / Express</li>
                  <li>MongoDB / PostgreSQL</li>
                  <li>GraphQL</li>
                  <li>AWS / Firebase</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="primary" 
                onClick={() => window.location.href = '#contact'}
                className="mt-6"
              >
                Let's Work Together
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background-lighter p-6 rounded-lg border border-foreground/10 shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-background-lightest">
                  {stat.icon}
                </div>
              </div>
              <div className="flex justify-center items-baseline">
                <AnimatedCounter
                  value={stat.value}
                  className="text-3xl font-bold"
                />
                <span className="ml-1 text-2xl font-bold">{stat.suffix}</span>
              </div>
              <p className="text-foreground/70 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}; 