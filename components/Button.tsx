import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 ease-out";
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-white",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;