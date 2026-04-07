import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const SERVICES = [
  { id: 'service-formation', name: 'Formation', color: '#e08a38' },
  { id: 'service-conseil', name: 'Certification', color: '#2a7a7a' },
  { id: 'service-rse', name: 'RSE', color: '#4ade80' },
  { id: 'service-etudes', name: 'Études Env.', color: '#3b82f6' },
  { id: 'service-securite', name: 'Sécurité', color: '#ef4444' },
];

const ORBIT_RADIUS_X = 5;
const ORBIT_RADIUS_Z = 4;

export default function OrbitPoints() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Group) {
          child.position.y = Math.sin(clock.elapsedTime * 0.5 + i * 1.5) * 0.2;
        }
      });
    }
  });

  const lineGeometries = useMemo(() => {
    return SERVICES.map((_, i) => {
      const angle = (i / SERVICES.length) * Math.PI * 2;
      const x = ORBIT_RADIUS_X * Math.cos(angle);
      const z = ORBIT_RADIUS_Z * Math.sin(angle);
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  const lineMaterial = useMemo(() =>
    new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.1 }),
  []);

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0.1]}>
      {SERVICES.map((service, i) => {
        const angle = (i / SERVICES.length) * Math.PI * 2;
        const x = ORBIT_RADIUS_X * Math.cos(angle);
        const z = ORBIT_RADIUS_Z * Math.sin(angle);

        return (
          <group key={service.id} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[0.45, 24, 24]} />
              <meshBasicMaterial color={service.color} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.7, 24, 24]} />
              <meshBasicMaterial color={service.color} transparent opacity={0.1} />
            </mesh>
            <Html center distanceFactor={10} position={[0, 0.8, 0]} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
              <span className="font-display text-xs text-white/80 select-none" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                {service.name}
              </span>
            </Html>
          </group>
        );
      })}

      {/* Lignes de connexion */}
      {lineGeometries.map((geom, i) => (
        <primitive key={`line-${i}`} object={new THREE.Line(geom, lineMaterial)} />
      ))}

      {/* Anneau orbital */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
