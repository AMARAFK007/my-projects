import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../../lib/utils';

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  className,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const animateCount = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / duration);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        countRef.current = Math.floor(easeOutCubic * end);
        setCount(countRef.current);
        
        if (now < endTime) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={cn('font-bold', className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};