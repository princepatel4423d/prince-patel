import { useRef, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

// 1. Magnetic Button
export default function MagneticButton({
  children = "Magnetic Button",
  className = "",
  strength = 0.4,
  maxOffset = 50,
  ...props
}) {
  const ref = useRef(null);
  const [target, setTarget] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [current, setCurrent] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    let frame;
    const animate = () => {
      setCurrent((prev) => {
        const lerp = (a, b, n) => a + (b - a) * n;
        return {
          x: lerp(prev.x, target.x, 0.1),
          y: lerp(prev.y, target.y, 0.1),
          rotateX: lerp(prev.rotateX, target.rotateX, 0.15),
          rotateY: lerp(prev.rotateY, target.rotateY, 0.15),
        };
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      let moveX = offsetX * strength;
      let moveY = offsetY * strength;

      moveX = Math.max(Math.min(moveX, maxOffset), -maxOffset);
      moveY = Math.max(Math.min(moveY, maxOffset), -maxOffset);

      const rotateX = (-offsetY / rect.height) * 10;
      const rotateY = (offsetX / rect.width) * 10;

      setTarget({ x: moveX, y: moveY, rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTarget({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <button
      ref={ref}
      className={`flex items-center justify-center gap-1 px-6 py-4 rounded-full 
        bg-black text-white hover:bg-neutral-800 hover:text-white 
        dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:hover:text-black
        transition-colors duration-200 cursor-pointer
        ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${current.x}px, ${current.y}px) rotateX(${current.rotateX}deg) rotateY(${current.rotateY}deg)`,
      }}
      {...props}
    >
      {children}
      <span>
        <FaArrowRight size={18} />
      </span>
    </button>
  );
}

// 2. Dark Button
export function DarkButton({ children = "Dark Button", className = "", ...props }) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 bg-black text-white 
        dark:bg-neutral-200 dark:text-black 
        text-sm px-6 py-2.5 rounded-full shadow-md 
        hover:bg-neutral-800 hover:text-white 
        dark:hover:bg-neutral-300 dark:hover:text-black 
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// 3. Light Button
export function LightButton({ children = "Light Button", className = "", ...props }) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 border border-black dark:border-white 
        text-black dark:text-white text-sm px-6 py-2.5 rounded-full shadow-md 
        hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white 
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// 4. Gray Button
export function GrayButton({
  children = "Gray Button",
  as = "button",
  className = "",
  ...props
}) {
  const Component = as;
  return (
    <Component
      className={`
        flex items-center justify-center gap-2 rounded-xl 
        bg-neutral-200 text-neutral-800
        px-4 py-2 hover:bg-neutral-700 hover:text-white 
        dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-400 dark:hover:text-black 
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

// 5. Blue Button
export function BlueButton({
  children = "Blue Button",
  as = "button",
  className = "",
  ...props
}) {
  const Component = as;
  return (
    <Component
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
        bg-blue-600 text-white hover:bg-blue-700 hover:text-white
        dark:bg-blue-600 dark:hover:bg-blue-800 dark:hover:text-white
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}