import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`card p-6 ${className}`} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;