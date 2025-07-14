
import React from 'react';

// Společné vlastnosti pro obě varianty
interface CommonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

// Definuje typy pro props pomocí tzv. "discriminated union".
// TypeScript tak přesně ví, jaké atributy povolit na základě toho, zda existuje `href`.
type ButtonProps = CommonProps & (
  (
    // Varianta pro <button>
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
      href?: undefined;
    }
  ) |
  (
    // Varianta pro <a>
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'disabled'> & {
      href: string;
    }
  )
);


const Button: React.FC<ButtonProps> = (props) => {
  const { 
    children, 
    variant = 'primary', 
    size = 'md', 
    className: customClassName,
    disabled = false,
    ...rest 
  } = props;

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const sizeStyles = {
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500',
  };

  const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-60';
  
  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${customClassName || ''}`;

  // Pokud existuje `href`, vykreslíme odkaz <a>
  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'disabled'>;

    if (disabled) {
       // Pro "disabled" odkaz odstraníme `href` a zamezíme prokliku
      return (
        <a 
          {...anchorProps}
          className={finalClassName}
          aria-disabled="true"
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </a>
      );
    }
    
    return (
      <a {...anchorProps} href={href} className={finalClassName}>
        {children}
      </a>
    );
  }

  // Jinak vykreslíme tlačítko <button>
  const buttonProps = rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

  return (
    <button {...buttonProps} disabled={disabled} className={finalClassName}>
      {children}
    </button>
  );
};

export default Button;