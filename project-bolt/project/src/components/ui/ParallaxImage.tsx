import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
};

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  speed = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${speed * 100}%`]
  );

  return (
    <div ref={ref} className={cn('overflow-hidden relative', className)}>
      <motion.div
        className="w-full h-full"
        style={{ y: yTransform }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};