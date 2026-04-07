import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import NebulaSphere from './NebulaSphere';
import OrbitPoints from './OrbitPoints';
import MouseParallax from './MouseParallax';

interface HeroCanvasProps {
  isMobile: boolean;
}

export default function HeroCanvas({ isMobile }: HeroCanvasProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60, near: 0.1, far: 100 }}
        style={{ background: 'transparent' }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <ParticleField count={isMobile ? 600 : 2000} />
        <NebulaSphere />
        {!isMobile && <OrbitPoints />}
        {!isMobile && <MouseParallax />}
      </Canvas>
    </div>
  );
}
