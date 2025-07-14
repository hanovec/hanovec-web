import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  disabled?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  href,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 disabled:bg-orange-500/60',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500 disabled:bg-slate-700/60 disabled:text-slate-400',
  };

  const className = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={`${className} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick();
        }}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
