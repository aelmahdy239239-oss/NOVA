
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

type FingerProps = {
  x: number;
  y: number;
  length: number;
  curl: number;
  color: string;
};

function Finger({ x, y, length, curl, color }: FingerProps) {
  const segment = length / 3;

  return (
    <group position={[x, y, 0]}>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          position={[0, i * segment, 0]}
          rotation={[curl * (i + 1) / 3, 0, 0]}
        >
          <mesh position={[0, segment / 2, 0]}>
            <capsuleGeometry args={[0.105, segment * 0.72, 6, 12]} />
            <meshStandardMaterial
              color={color}
              metalness={0.75}
              roughness={0.28}
            />
          </mesh>

          <mesh position={[0, segment, 0]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial
              color="#67e8f9"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HandModel({ curls }: { curls: number[] }) {
  const metal = '#94a3b8';

  return (
    <group position={[0, -0.5, 0]}>
      {/* Palm */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.35, 1.55, 0.32]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Palm central plate */}
      <mesh position={[0, -0.15, 0.18]}>
        <boxGeometry args={[0.95, 1.15, 0.06]} />
        <meshStandardMaterial
          color="#0e7490"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Wrist */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.43, 0.5, 0.65, 32]} />
        <meshStandardMaterial
          color={metal}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Finger mounts */}
      {[-0.48, -0.16, 0.16, 0.48].map((x) => (
        <mesh key={x} position={[x, 0.7, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.8} />
        </mesh>
      ))}

      {/* Four fingers */}
      <Finger x={-0.48} y={0.72} length={1.05} curl={curls[0]} color={metal} />
      <Finger x={-0.16} y={0.72} length={1.3} curl={curls[1]} color={metal} />
      <Finger x={0.16} y={0.72} length={1.4} curl={curls[2]} color={metal} />
      <Finger x={0.48} y={0.72} length={1.12} curl={curls[3]} color={metal} />

      {/* Thumb */}
      <group position={[-0.68, -0.45, 0]} rotation={[0, 0, -0.75]}>
        <mesh position={[0, 0.25, 0]}>
          <capsuleGeometry args={[0.13, 0.38, 6, 16]} />
          <meshStandardMaterial color={metal} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.8} />
        </mesh>
        <group position={[0, 0.55, 0]} rotation={[curls[4], 0, 0]}>
          <mesh position={[0, 0.22, 0]}>
            <capsuleGeometry args={[0.12, 0.32, 6, 16]} />
            <meshStandardMaterial color={metal} metalness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export const NOVAHand3D: React.FC = () => {
  const [curls, setCurls] = useState([0, 0, 0, 0, 0]);

  const openHand = () => setCurls([0, 0, 0, 0, 0]);
  const closeHand = () => setCurls([1.1, 1.1, 1.1, 1.1, 0.9]);

  const fingerNames = ['Little', 'Ring', 'Middle', 'Index', 'Thumb'];

  const updateFinger = (index: number, value: number) => {
    setCurls(old => old.map((v, i) => i === index ? value : v));
  };

  return (
    <section className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">NOVA 3D Hand Simulator</h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive articulated prosthetic hand concept
        </p>
      </div>

      <div className="h-[420px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
        <Canvas camera={{ position: [0, 0.5, 6], fov: 38 }}>
          <ambientLight intensity={1.3} />
          <directionalLight position={[4, 5, 6]} intensity={2.5} />
          <pointLight position={[-4, 2, 3]} color="#06b6d4" intensity={30} />

          <HandModel curls={curls} />

          <ContactShadows
            position={[0, -2.3, 0]}
            opacity={0.35}
            scale={5}
            blur={2}
          />

          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={9}
          />
        </Canvas>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={openHand}
          className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Open Hand
        </button>

        <button
          onClick={closeHand}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white font-bold text-sm"
        >
          Close Hand
        </button>
      </div>

      <div className="space-y-3">
        {fingerNames.map((name, index) => (
          <div key={name} className="flex items-center gap-3">
            <span className="text-xs text-slate-300 w-16">{name}</span>
            <input
              type="range"
              min="0"
              max="1.2"
              step="0.05"
              value={curls[index]}
              onChange={e => updateFinger(index, Number(e.target.value))}
              className="flex-1 accent-cyan-400"
            />
            <span className="text-xs text-cyan-300 w-10 text-right">
              {Math.round(curls[index] * 100 / 1.2)}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-amber-300 border-t border-slate-800 pt-3">
        Conceptual 3D simulation only. Finger movement is software-generated
        and does not represent a tested physical prosthesis.
      </p>
    </section>
  );
};