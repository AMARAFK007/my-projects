import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/cursorStore';

export const CustomCursor: React.FC = () => {
  const { position, cursorType, isVisible, updatePosition, setIsVisible } = useCursorStore();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updatePosition, setIsVisible, isVisible]);
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/40 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          opacity: isVisible ? 1 : 0,
          scale: cursorType === 'hover' ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          mass: 0.3,
          stiffness: 800,
          damping: 50
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-primary/20 z-50 pointer-events-none"
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          opacity: isVisible ? 0.6 : 0,
          scale: cursorType === 'hover' ? 1.7 : 1
        }}
        transition={{
          type: 'spring',
          mass: 0.5,
          stiffness: 400,
          damping: 40,
          delay: 0.03
        }}
      />
    </>
  );
};