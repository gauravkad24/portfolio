import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface HeroNameHeadingProps {
  name: string;
}

export const HeroNameHeading: React.FC<HeroNameHeadingProps> = ({ name }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation angles (capped at ±12 degrees for an interactive 3D perspective effect)
    const rotateX = -(mouseY / (rect.height / 2)) * 12;
    const rotateY = (mouseX / (rect.width / 2)) * 12;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block cursor-pointer select-none py-1"
      style={{ perspective: '1000px' }}
    >
      <motion.h1
        initial={{ scale: 0.95, opacity: 0, filter: 'blur(8px)' }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{
          scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.0, ease: 'easeOut' },
          filter: { duration: 1.0, ease: 'easeOut' },
          rotateX: { type: 'spring', stiffness: 280, damping: 22 },
          rotateY: { type: 'spring', stiffness: 280, damping: 22 },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
      >
        <span
          className="animate-liquid-gradient inline-block py-1.5 px-3 transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.85)) drop-shadow(0 0 60px rgba(112, 0, 255, 0.6))'
              : 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.45))',
          }}
        >
          {name || 'Gaurav Suhas Kad'}
        </span>
      </motion.h1>
    </div>
  );
};
