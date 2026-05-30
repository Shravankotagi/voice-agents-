import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant, className = '', ...props }) => {
  const baseStyles = "px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-zinc-900 hover:opacity-90 focus:ring-[var(--color-primary)]",
    secondary: "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 focus:ring-zinc-500",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 focus:ring-zinc-500"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

