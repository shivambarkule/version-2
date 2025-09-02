interface ButtonProps {
  text: string;
  type?: 'primary' | 'secondary' | 'outline';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  text, 
  type = 'primary', 
  onClick, 
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const typeClasses = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary/90 focus:ring-brand-primary/20",
    secondary: "bg-brand-secondary text-white hover:bg-brand-secondary/90 focus:ring-brand-secondary/20",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary/20"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`${baseClasses} ${typeClasses[type]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
