import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Input;