import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for the binary rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Binary rain properties
    const fontSize = 14;
    const columns = Math.floor(canvas.width / (fontSize * window.devicePixelRatio));
    const drops: number[] = [];
    
    // Fill drops with random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Characters - mostly 0s and 1s with some other characters for variety
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(43, 156, 43, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Different shades of green
        const greenIntensity = Math.floor(Math.random() * 2000) + 1000;
        ctx.fillStyle = `rgba(0, ${greenIntensity}, 0, ${Math.random() * 1 + 1})`;
        
        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        
        // Reset drop to top when it reaches bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated binary rain background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/95 z-10"></div>
      
      {/* Content */}
      <div className="container px-4 sm:px-6 mx-auto relative z-20 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-6 border border-cyan-400/30 rounded-full bg-gray-800/50 backdrop-blur-sm text-cyan-400 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            <span>Your Security is Our Priority</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
              Protect Your Digital Identity
            </span>
            <br />
            <span className="ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">From Data Breaches</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Check if your sensitive info has been compromised in data breaches and get real-time alerts for future leaks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="primary"
              className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border border-green-400/30 text-white rounded-md px-4 py-2"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => {
                document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Check for Breaches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;