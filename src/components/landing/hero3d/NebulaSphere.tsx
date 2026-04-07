import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NebulaSphere() {
  const mainRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mainRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
      mainRef.current.scale.setScalar(scale);
      mainRef.current.rotation.y += 0.001;
    }
    if (glowRef.current) {
      const glowScale = 1 + Math.sin(clock.elapsedTime * 0.3) * 0.08;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  return (
    <group>
      {/* Core — orange accent (--secondary) */}
      <mesh ref={mainRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#e08a38" transparent opacity={0.35} />
      </mesh>
      {/* Halo orange */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#e08a38" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      {/* Haze teal */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#2a7a7a" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
