import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const SERVICES = [
  { id: 'service-formation', name: 'Formation Professionnelle', color: '#e08a38', icon: '\u{1F393}' },
  { id: 'service-conseil', name: 'Conseil & Certification', color: '#2a7a7a', icon: '\u{1F4CB}' },
  { id: 'service-rse', name: 'Démarche RSE', color: '#4ade80', icon: '\u{1F33F}' },
  { id: 'service-etudes', name: 'Études Environnementales', color: '#3b82f6', icon: '\u{1F30D}' },
  { id: 'service-securite', name: 'Sécurité Incendie', color: '#ef4444', icon: '\u{1F525}' },
];

const ORBIT_RADIUS_X = 5;
const ORBIT_RADIUS_Z = 4;

/* --- Planet --- */
function ServicePlanet({
  service, index, total, onSelect,
}: {
  service: typeof SERVICES[number];
  index: number;
  total: number;
  onSelect: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const baseX = ORBIT_RADIUS_X * Math.cos(angle);
  const baseZ = ORBIT_RADIUS_Z * Math.sin(angle);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5 + index * 1.5) * 0.2;
    }
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  });

  return (
    <group ref={groupRef} position={[baseX, 0, baseZ]}>
      <mesh
        scale={hovered ? 1.4 : 1}
        onClick={(e) => { e.stopPropagation(); onSelect(service.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color={service.color} />
      </mesh>
      <mesh scale={hovered ? 1.5 : 1}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color={service.color} transparent opacity={hovered ? 0.25 : 0.15} />
      </mesh>
      <Html center distanceFactor={10} position={[0, 0.9, 0]} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        <span
          className="font-display font-semibold select-none transition-all duration-300"
          style={{
            color: 'hsl(213, 52%, 24%)',
            opacity: hovered ? 1 : 0.8,
            fontSize: hovered ? '14px' : '12px',
            textShadow: '0 0 8px rgba(255,255,255,0.8)',
          }}
        >
          {service.name}
        </span>
      </Html>
    </group>
  );
}

/* --- Scene --- */
function PlanetaryScene({ onSelect }: { onSelect: (id: string) => void }) {
  const orbitRef = useRef<THREE.Group>(null);

  const lineData = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: '#1a2332', transparent: true, opacity: 0.15 });
    return SERVICES.map((_, i) => {
      const angle = (i / SERVICES.length) * Math.PI * 2;
      const x = ORBIT_RADIUS_X * Math.cos(angle);
      const z = ORBIT_RADIUS_Z * Math.sin(angle);
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z),
      ]);
      return new THREE.Line(geom, material);
    });
  }, []);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <>
      {/* Core — more visible on light bg */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#e08a38" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#e08a38" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>

      {/* Orbital ring — navy on light bg */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.008, 8, 100]} />
        <meshBasicMaterial color="#1a2332" transparent opacity={0.1} />
      </mesh>

      {/* Planets + lines */}
      <group ref={orbitRef} rotation={[0.2, 0, 0.1]}>
        {SERVICES.map((service, i) => (
          <ServicePlanet
            key={service.id}
            service={service}
            index={i}
            total={SERVICES.length}
            onSelect={onSelect}
          />
        ))}
        {lineData.map((line, i) => (
          <primitive key={`line-${i}`} object={line} />
        ))}
      </group>
    </>
  );
}

/* --- Exported component --- */
export default function PlanetaryServices() {
  const isMobile = useIsMobile();

  const handleSelect = (serviceId: string) => {
    const el = document.getElementById(serviceId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Mobile fallback: button grid
  if (isMobile) {
    return (
      <section id="services" className="py-20 px-6 bg-landing-alt">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Nos expertises</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Nos domaines d'expertise</h2>
          <p className="text-muted-foreground">Sélectionnez un service pour en savoir plus</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              className="p-4 rounded-xl border border-border/50 bg-card hover:bg-card/80 transition-all hover:scale-[1.02] text-left"
              style={{ borderLeftColor: service.color, borderLeftWidth: 3 }}
            >
              <span className="text-lg mb-1 block">{service.icon}</span>
              <span className="font-medium text-sm text-foreground">{service.name}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-landing-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3"
        >
          Nos expertises
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4"
        >
          Nos domaines d'expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Cliquez sur une planète pour explorer nos services en détail
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full"
      >
        <div style={{ height: '550px', width: '100%' }}>
          <Canvas
            camera={{ position: [0, 2, 9], fov: 60, near: 0.1, far: 100 }}
            style={{ background: 'transparent' }}
            dpr={Math.min(window.devicePixelRatio, 2)}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onPointerMissed={() => {}}
          >
            <PlanetaryScene onSelect={handleSelect} />
          </Canvas>
        </div>
      </motion.div>
    </section>
  );
}
