export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon = false 
}) {
  
  // Base styles that apply to EVERY button (padding, font, rounded corners, smooth hover transitions)
  const baseStyles = "font-bold rounded-full transition-colors duration-200 flex items-center justify-center";
  
  // Dynamic sizing based on whether it has that circular "+" icon from Button 1
  const sizingStyles = icon ? "py-2 pr-4 pl-2" : "py-4 px-6";

  // The specific colors mapped directly from your Figma screenshot and our tailwind.config.js
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-light", // Buttons 1 & 2
    edit: "bg-slate-light text-slate-muted dark:bg-dark-surface dark:text-light-bg hover:bg-[#DFE3FA] dark:hover:bg-white/10", // Button 3
    draft: "bg-[#373B53] text-[#DFE3FA] hover:bg-dark-main", // Button 4
    danger: "bg-danger text-white hover:bg-[#FF9797]", // Button 5
    add: "bg-[#F9FAFE] text-slate-muted dark:bg-dark-surface dark:text-light-bg hover:bg-[#DFE3FA] dark:hover:bg-white/10 w-full" // Button 6
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${sizingStyles} ${variants[variant]} ${className}`}
    >
      {/* If the button needs the plus icon, we render this white circle SVG */}
      {icon && (
        <div className="bg-white rounded-full p-3 mr-4 flex items-center justify-center">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA" fillRule="nonzero"/>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
}