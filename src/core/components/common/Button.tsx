import React from 'react';

interface ButtonProps {
   children: React.ReactNode;
   onClick: () => void;
   variant?: 'primary' | 'secondary';
   disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   children,
   onClick,
   variant = 'primary',
   disabled = false,
}) => {
   const baseStyle =
      'px-4 py-2 rounded-md font-semibold transition-colors duration-200';
   const primaryStyle = 'bg-blue-500 text-white hover:bg-blue-600';
   const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
   const disabledStyle = 'opacity-50 cursor-not-allowed';

   const style = `${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${disabled ? disabledStyle : ''}`;

   return (
      <button className={style} onClick={onClick} disabled={disabled}>
         {children}
      </button>
   );
};

export default Button;
