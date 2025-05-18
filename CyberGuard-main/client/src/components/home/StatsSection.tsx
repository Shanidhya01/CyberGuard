import React, { useEffect, useRef } from 'react';

interface StatProps {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatProps[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const countersRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCountedRef.current) {
          hasCountedRef.current = true;
          startCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  const startCounters = () => {
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach((counter) => {
      const targetText = counter.textContent || '';
      let current = 0;
      const updateCounter = () => {
        // For non-numeric values (like 14.2B), we just animate the numeric part
        const isNumeric = !isNaN(parseFloat(targetText));
        
        if (isNumeric) {
          const target = parseInt(targetText, 10);
          const increment = Math.ceil(target / 60); // Reach target in ~1s with 60fps
          
          if (current < target) {
            current += increment;
            if (current > target) current = target;
            counter.textContent = current.toString();
            
            if (current < target) {
              requestAnimationFrame(updateCounter);
            }
          }
        } else {
          // For formatted numbers like "14.2B" - extract the number and suffix
          const match = targetText.match(/^([\d.]+)([a-zA-Z%+]*)$/);
          
          if (match) {
            const numPart = parseFloat(match[1]);
            const suffix = match[2];
            const increment = numPart / 40; // Reach target in ~0.7s
            
            if (current < numPart) {
              current += increment;
              if (current > numPart) current = numPart;
              counter.textContent = current.toFixed(1) + suffix;
              
              if (current < numPart) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = targetText; // Ensure we end with exact target
              }
            }
          } else {
            // If format doesn't match, just show the target
            counter.textContent = targetText;
          }
        }
      };
      
      updateCounter();
    });
  };

  return (
    <section className="py-20 bg-gray-900 relative">
      {/* Background circuit board pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#31E1F7" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="#31E1F7" />
            <path d="M50,0 L50,30 M0,50 L30,50 M50,70 L50,100 M70,50 L100,50" stroke="#31E1F7" strokeWidth="1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      <div className="container px-4 sm:px-6 mx-auto relative">
        <div 
          ref={countersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 transform transition-transform hover:scale-105"
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                <span className="ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">{stat.value}</span>
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;