import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const Section: React.FC<SectionProps> = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      className={cn('py-16 md:py-24 lg:py-32 overflow-hidden', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
};