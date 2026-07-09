// client/src/components/Button.jsx
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const variants = {
    primary: 'bg-[#0A6E3D] text-white hover:bg-[#08532E] shadow-lg shadow-[#0A6E3D]/20 hover:shadow-xl hover:shadow-[#0A6E3D]/30',
    secondary: 'bg-white text-[#0A6E3D] border-2 border-[#0A6E3D] hover:bg-[#F8FAFC]',
    outline: 'bg-transparent text-[#0A6E3D] border-2 border-[#0A6E3D] hover:bg-[#0A6E3D]/5',
    ghost: 'bg-transparent text-white hover:bg-white/10',
    gold: 'bg-gradient-to-r from-[#C89B2B] to-[#A87B1A] text-white hover:shadow-xl hover:shadow-[#C89B2B]/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};