import React, { useState } from 'react';

function Banner({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-blue-100 p-3 rounded-lg shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center w-auto px-5">
      <p className="text-center text-blue-800">{message}</p>
      <span
        className="text-neutral-400 hover:text-black cursor-pointer ml-5 text-sm"
        onClick={() => setIsVisible(false)}
      >
        ✕
      </span>
    </div>
  );
}

export default Banner;
