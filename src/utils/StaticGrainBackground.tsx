import { useEffect, useRef } from 'react';

interface StaticGrainBackgroundProps {
  className?: string;
  colors?: string[];
}

const DEFAULT_STATIC_GRAIN_COLORS: string[] = [
  '#0f1419',
  '#12181f',
  '#151c24',
  '#0d1116',
  '#101621',
  '#0c0f14',
];

function StaticGrainBackground({
  className = '',
  colors = DEFAULT_STATIC_GRAIN_COLORS,
}: StaticGrainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelSize: number = 2;


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


    const resizeCanvas = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawStatic();
    };
    resizeCanvas();


    const handleResize = (): void => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: '#0f1419' }}
    />
  );
}

export default StaticGrainBackground;