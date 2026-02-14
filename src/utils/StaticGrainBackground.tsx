import { useEffect, useRef } from 'react';

interface StaticGrainBackgroundProps {
  className?: string;
}

function StaticGrainBackground({ className = '' }: StaticGrainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Static colors (blue tones)
    const colors: string[] = [
      '#0f1419', // base blue-black
      '#12181f', // lighter blue
      '#151c24', // more visible blue
      '#0d1116', // darker
      '#101621', // medium blue
      '#0c0f14', // subtle dark
    ];

    // Pixel size
    const pixelSize: number = 1; // Ultra fine grain

    // Draw static ONCE (no animation)
    const drawStatic = (): void => {
      const cols: number = Math.ceil(canvas.width / pixelSize);
      const rows: number = Math.ceil(canvas.height / pixelSize);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const color: string = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    };

    // Set canvas size
    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStatic(); // Redraw on resize
    };
    resizeCanvas();

    // Handle resize
    const handleResize = (): void => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ background: '#0f1419' }}
    />
  );
}

export default StaticGrainBackground;