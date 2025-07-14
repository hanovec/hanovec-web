
import React from 'react';

// A simplified and robust props definition for a polymorphic button.
// It accepts props for both button and anchor elements.
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
  href?: string;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'disabled'>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className: customClassName,
  href,
  disabled,
  ...rest
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const sizeStyles = {
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500',
  };

  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${customClassName || ''}`;

  // If href is provided, it's a link.
  if (href) {
    // For disabled links, render a non-interactive span to prevent navigation.
    if (disabled) {
      return (
        <span className={`${finalClassName} opacity-60 cursor-not-allowed`} aria-disabled="true">
          {children}
        </span>
      );
    }
    // Render a normal, enabled link.
    return (
      <a href={href} className={finalClassName} {...rest}>
        {children}
      </a>
    );
  }

  // Otherwise, render a button.
  return (
    <button
      className={`${finalClassName} disabled:opacity-60 disabled:cursor-not-allowed`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
