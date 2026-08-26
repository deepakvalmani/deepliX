import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 28,
  className = "",
  as: Component = "div",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      // @ts-ignore
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : `translateY(${y}px)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Component>
  );
};
