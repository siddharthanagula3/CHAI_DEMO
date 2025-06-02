import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  fallback = 'https://via.placeholder.com/400x300?text=Loading...', 
  className = '',
  ...props 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(fallback);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
    
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
  }, [src]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
        {...props}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;