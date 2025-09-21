
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, helperText, className, ...props }) => {
  const errorClasses = error ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          className={`block w-full rounded-md shadow-sm sm:text-sm ${errorClasses} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Input;
