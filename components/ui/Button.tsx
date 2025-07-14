import React from 'react';

// Base props shared by both button and anchor variants
type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
};

// Props specific to the component when it's a <button>
type ButtonAsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

// Props specific to the component when it's an <a>
type ButtonAsAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

// The final props type is a combination of base props and a discriminated union
// of element-specific props, keyed by the presence of `href`.
type ButtonProps = ButtonBaseProps & (ButtonAsButtonProps | ButtonAsAnchorProps);


const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className: customClassName,
  ...rest
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
  
  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${customClassName || ''}`;

  // If `href` exists, we render an anchor tag. The type guard `'href' in rest`
  // narrows the type of `rest` to `ButtonAsAnchorProps`.
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    const disabled = anchorProps.disabled || anchorProps['aria-disabled'];
    
    return (
      <a
        {...anchorProps}
        href={disabled ? undefined : href}
        className={`${finalClassName} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (anchorProps.onClick) anchorProps.onClick(e);
        }}
      >
        {children}
      </a>
    );
  }
  
  // Otherwise, we render a button. `rest` is narrowed to `ButtonAsButtonProps`.
  const buttonProps = rest;

  return (
    <button {...buttonProps} className={finalClassName}>
      {children}
    </button>
  );
};

export default Button;
