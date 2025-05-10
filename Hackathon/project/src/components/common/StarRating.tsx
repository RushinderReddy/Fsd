import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'md',
  readOnly = false
}) => {
  const totalStars = 5;
  
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <button
            key={index}
            type="button"
            className={`
              ${!readOnly ? 'cursor-pointer' : 'cursor-default'} 
              p-0 mx-0.5 focus:outline-none
            `}
            onClick={() => handleClick(starValue)}
            disabled={readOnly}
            aria-label={`${starValue} stars`}
          >
            <Star
              className={`${sizeClass[size]} ${
                starValue <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } transition-colors duration-150`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;