import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Procedurally generated golden lotus petals
function Petals({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!mesh.current) return;
    const temp = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      temp.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      temp.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      // Shape it like a petal
      const scale = 0.5 + Math.random() * 0.5;
      temp.scale.set(scale, scale * 0.15, scale * 1.5);
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color="#FACC15" 
        roughness={0.1} 
        metalness={0.9}
        emissive="#B45309"
        emissiveIntensity={0.15} 
      />
    </instancedMesh>
  );
}

// Glowing traditional Diyas floating in space
function FloatingDiyas() {
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float 
          key={i} 
          speed={1 + Math.random()} 
          rotationIntensity={1} 
          floatIntensity={2} 
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          {/* Diya Base */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.2, 0.15, 16]} />
            <meshStandardMaterial color="#B45309" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Flame Light */}
          <pointLight color="#FEF08A" intensity={2} distance={5} position={[0, 0.3, 0]} />
          {/* Flame Mesh */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#FEF08A" />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Controls camera movement based on native window scroll
function CameraRig() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Scroll depth effect: Move camera forward and slightly rotate based on scroll
    // Assuming max scroll is around 3000px, move Z by up to 20 units
    const targetZ = 12 - (scrollY * 0.005);
    const targetY = (scrollY * 0.002);
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Parallax on mouse movement
    const targetX = (state.pointer.x * 2);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.02);
    
    // Always look towards the center to create a sweeping camera effect as it moves
    state.camera.lookAt(0, 0, -5);
  });

  return null;
}

export function DivineBackground3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#FAFAF5]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: false }}>
        <ambientLight intensity={0.7} color="#FDFBF7" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#FACC15" />
        
        <Petals count={150} />
        <FloatingDiyas />
        
        <Sparkles count={400} scale={25} size={2} speed={0.2} opacity={0.5} color="#FACC15" />
        
        <CameraRig />
        
        <EffectComposer disableNormalPass>
          {/* Depth of Field ensures elements blur realistically as they approach/pass camera */}
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={4} height={480} />
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
