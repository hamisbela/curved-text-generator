import React, { useRef, useEffect } from 'react';

interface TextCanvasProps {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  curvature: number;
  backgroundColor: string;
}

export const TextCanvas: React.FC<TextCanvasProps> = ({
  text,
  fontSize,
  fontFamily,
  color,
  curvature,
  backgroundColor
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Calculate text metrics
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    // Calculate safe drawing area (with padding)
    const padding = fontSize;
    const safeWidth = canvas.width - (padding * 2);
    const safeHeight = canvas.height - (padding * 2);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate optimal radius based on canvas dimensions and text size
    const maxRadius = Math.min(safeWidth / 2, safeHeight / 2) - textHeight;
    const minRadius = Math.max(textWidth / 2, textHeight * 2);
    const baseRadius = Math.min(maxRadius, Math.max(minRadius, textWidth / 2));
    
    // Adjust radius based on curvature while ensuring text stays within bounds
    const radius = baseRadius + (1 - curvature) * (maxRadius - baseRadius);

    // Calculate angle per character for better spacing
    const characters = text.split('');
    const arcLength = Math.min(textWidth * 1.2, safeWidth); // Add some spacing between characters
    const totalAngle = (arcLength / radius) * curvature;
    const startAngle = -totalAngle / 2;
    const angleStep = totalAngle / (characters.length - 1 || 1);

    // Draw curved text
    characters.forEach((char, i) => {
      const angle = startAngle + (i * angleStep);
      
      // Calculate position on the curve
      const x = centerX + Math.sin(angle) * radius;
      const y = centerY - Math.cos(angle) * radius;

      ctx.save();
      ctx.translate(x, y);
      
      // Adjust rotation to keep letters upright
      let rotationAngle = angle;
      
      // Ensure letters always face upward
      if (rotationAngle > Math.PI / 2 || rotationAngle < -Math.PI / 2) {
        rotationAngle += Math.PI;
      }
      
      ctx.rotate(rotationAngle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }, [text, fontSize, fontFamily, color, curvature, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="w-full border border-gray-300 rounded-lg bg-white shadow-md"
    />
  );
};