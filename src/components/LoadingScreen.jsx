import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ size = 48, message = "Loading..." }) => {
  const [dots, setDots] = useState('.');

  // Cycle dots for loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '.' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="fixed inset-0 z-50 bg-[#030014] flex items-center justify-center">
        <div className="relative">
          {/* Glowing blurred ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full opacity-20 blur-2xl animate-pulse" />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-4 p-8">
            {/* Spinner */}
            <div
                className="rounded-full border-4 border-t-transparent border-[#6366f1] animate-spin"
                style={{ width: size, height: size }}
            />

            {/* Animated message */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded blur opacity-20" />
              <span className="relative text-gray-200 text-sm">
              {message}{dots}
            </span>
            </div>

            {/* Fallback tip */}
            <p className="text-sm text-gray-500 mt-1">This might take a few seconds.</p>
          </div>
        </div>
      </div>
  );
};

export default LoadingScreen;
