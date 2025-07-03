import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl border border-gray-100 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-gray-200 transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}