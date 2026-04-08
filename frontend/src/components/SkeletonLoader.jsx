import React from 'react';

// A skeleton is a grey animated placeholder that looks like
// the real content but is just a loading animation.
// Much better than a spinning circle.

function SkeletonLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Simulates a page heading */}
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-6 animate-pulse"></div>

      {/* Simulates a grid of 6 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* We use Array.from to repeat this card 6 times */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            {/* Simulates card image area */}
            <div className="h-40 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>

            {/* Simulates card title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>

            {/* Simulates card subtitle */}
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>

            {/* Simulates a button */}
            <div className="h-10 bg-gray-200 rounded-xl mt-4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;