"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedLink({ href, children, className = "", onClick }: AnimatedLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
} 