
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, description, footer }) => {
  return (
    <div className={`bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ${className}`}>
        {(title || description) && (
             <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                {title && <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>}
                {description && <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>}
            </div>
        )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && (
        <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
