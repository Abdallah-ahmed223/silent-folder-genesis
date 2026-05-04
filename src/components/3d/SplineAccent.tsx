import SplineScene from "./SplineScene";

interface SplineAccentProps {
  scene?: string;
  className?: string;
}

export default function SplineAccent({ scene, className = "" }: SplineAccentProps) {
  return (
    <div className={`section-orbital-accent ${className}`}>
      <SplineScene
        scene={scene}
        className="h-full w-full"
        placeholderClassName="h-full w-full"
        rootMargin="240px"
        fallback={<div className="section-orbital-fallback" />}
      />
    </div>
  );
}

