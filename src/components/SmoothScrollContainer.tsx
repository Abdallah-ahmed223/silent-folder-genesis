
import { ReactNode } from 'react';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';

interface SmoothScrollContainerProps {
  children: ReactNode;
}

export default function SmoothScrollContainer({ children }: SmoothScrollContainerProps) {
  const { containerRef } = useGSAPScroll();

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div className="flex w-max">
        {children}
      </div>
    </div>
  );
}
