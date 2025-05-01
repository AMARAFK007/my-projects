import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/cursorStore';

export const Footer: React.FC = () => {
  const { setCursorType } = useCursorStore();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-background-light py-12 border-t border-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4">
            <motion.a 
              href="#hero"
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              DevFolio
            </motion.a>
            <p className="text-foreground/70 mt-4 max-w-md">
              Creating exceptional digital experiences with clean, efficient code and beautiful design.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-background-lighter text-foreground/80 flex items-center justify-center hover:text-primary hover:bg-background transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Consulting', 'SEO Optimization'].map((item) => (
                <li key={item}>
                  <a 
                    href="#contact"
                    className="text-foreground/70 hover:text-primary transition-colors"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-foreground/70 space-y-2">
              <p>123 Developer Way</p>
              <p>Web City, Digital State 10101</p>
              <p>contact@example.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-foreground/60 text-sm">
            &copy; {currentYear} DevFolio. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm mt-2 md:mt-0 flex items-center">
            Made with <Heart size={16} className="mx-1 text-accent" /> by a passionate developer
          </p>
        </div>
      </div>
    </footer>
  );
};