import { Suspense, useMemo } from "react";
import type { ReactNode } from "react";
import Spline from "@splinetool/react-spline";
import LazyMount from "./LazyMount";

interface SplineSceneProps {
  scene?: string;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
  fallback?: ReactNode;
  onLoad?: (app: unknown) => void;
}

export default function SplineScene({
  scene,
  className = "",
  placeholderClassName = "h-[420px]",
  rootMargin = "300px",
  fallback = null,
  onLoad,
}: SplineSceneProps) {
  const canRenderSpline = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (!scene) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  }, [scene]);

  if (!canRenderSpline) {
    return <>{fallback}</>;
  }

  return (
    <LazyMount placeholderClassName={placeholderClassName} rootMargin={rootMargin} fallback={fallback}>
      <Suspense fallback={fallback}>
        <div className={className}>
          <Spline scene={scene} onLoad={onLoad} />
        </div>
      </Suspense>
    </LazyMount>
  );
}

