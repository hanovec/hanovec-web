import React from 'react';

// Define props for a base button/anchor
type BaseProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
};

// Props for a real <button> element
type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | 'onClick'> & {
    href?: undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

// Props for an <a> element that looks like a button
type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'onClick'> & {
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

// Union of the two types, making it a polymorphic component
type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', size = 'md', className: customClassName, children } = props;

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 disabled:bg-orange-500/60',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500 disabled:bg-slate-700/60 disabled:text-slate-400',
  };
  
  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${customClassName || ''}`;

  if (props.href) {
    // If href exists, props is narrowed to ButtonAsLink.
    // We destructure out our component-specific props and onClick to handle it specially.
    // 'rest' will contain only valid anchor attributes.
    const { children, variant, size, className, onClick, ...rest } = props;
    
    // Treat any 'disabled' or 'aria-disabled' as a signal to disable the link.
    const disabled = (rest as any).disabled || props['aria-disabled'];
    
    return (
      <a
        {...rest}
        href={disabled ? undefined : props.href}
        className={`${finalClassName} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          // onClick is now correctly typed for an anchor element.
          if (onClick) onClick(e);
        }}
      >
        {children}
      </a>
    );
  }

  // If href doesn't exist, props is narrowed to ButtonAsButton.
  // 'rest' will contain only valid button attributes.
  const { children, variant, size, className, ...rest } = props;

  return (
    <button {...rest} className={finalClassName}>
      {children}
    </button>
  );
};

export default Button;
