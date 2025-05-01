import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useCursorStore } from '../../store/cursorStore';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const { setCursorType } = useCursorStore();

  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline',
  };

  return (
    <motion.button
      type={type}
      className={cn(
        'relative overflow-hidden rounded-md font-medium',
        variants[variant],
        sizeClasses[size],
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setCursorType('hover')}
      onMouseLeave={() => setCursorType('default')}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};