"use client"

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP);

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    // Animate in from right
    gsap.fromTo(el, 
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", onComplete: () => {
        gsap.set(el, { clearProps: "transform" });
      }}
    );
    // Animate out to left on unmount
    return () => {
      gsap.to(el, { x: -80, opacity: 0, duration: 0.4, ease: "power2.in" });
    };
  }, { dependencies: [pathname] });

  return (
    <div ref={containerRef} className={`page-transition ${className}`} key={pathname}>
      {children}
    </div>
  );
} 