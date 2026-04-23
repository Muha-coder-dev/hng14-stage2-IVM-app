export default function Input({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label and Error Message Row */}
      <div className="flex justify-between items-center">
        <label 
          htmlFor={id} 
          className={`text-body transition-colors ${
            error ? 'text-danger' : 'text-slate-muted dark:text-light-bg'
          }`}
        >
          {label}
        </label>
        {error && <span className="text-body text-danger">{error}</span>}
      </div>

      {/* The Input Field */}
      <input
        id={id}
        className={`w-full px-5 py-4 rounded-md border text-heading-s transition-all
          bg-white text-slate-main border-slate-light 
          dark:bg-dark-surface dark:text-white dark:border-dark-border
          focus:outline-none focus:border-brand dark:focus:border-brand
          ${error ? 'border-danger dark:border-danger focus:border-danger dark:focus:border-danger' : ''}
        `}
        {...props}
      />
    </div>
  );
}