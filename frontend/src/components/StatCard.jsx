import React, { useState, useEffect, useRef } from 'react';

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ stat, index }) {
  const { count, ref } = useCounter(stat.value, 2000 + index * 200);

  return (
    <div
      ref={ref}
      className="bg-white/85 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[180px] sm:min-h-[210px]"
    >
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 ${stat.color}`}
      >
        {stat.icon}
      </div>

      <p className="text-[2rem] sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 leading-none break-words">
        {count.toLocaleString()}
        <span className="text-indigo-500 dark:text-indigo-400">+</span>
      </p>

      <p className="text-sm sm:text-base text-gray-500 dark:text-slate-300 font-medium leading-snug">
        {stat.title}
      </p>
    </div>
  );
}

export default StatCard;