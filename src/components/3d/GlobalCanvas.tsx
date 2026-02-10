import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { NetworkBackground } from './NetworkBackground';
import { ScrollPath } from './ScrollPath';
import { VoxelModel } from './VoxelModel';
import { RealisticDevices } from './RealisticDevices';
import { FourDimensionalMode } from '@/components/3d/FourDimensionalMode';
// Import the context hook correctly
import { useFourDMode } from '@/contexts/FourDModeContext';

import * as THREE from 'three';

const ScrollGroup = ({ children }: { children: React.ReactNode }) => {
    const group = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useEffect(() => {
        const handleScroll = () => {
            if (!group.current) return;

            // Calculate scale factor: 1px scroll = X units in 3D
            // viewport.height corresponds to window.innerHeight
            const scrollFactor = viewport.height / window.innerHeight;

            const scrollY = window.scrollY;

            // Move group UP to simulate camera moving DOWN
            group.current.position.y = scrollY * scrollFactor;
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [viewport]);

    return <group ref={group}>{children}</group>;
};

export const GlobalCanvas = () => {
    const { is4DMode } = useFourDMode();

    return (
        <div className={`fixed inset-0 ${is4DMode ? 'z-[10] pointer-events-auto' : 'z-[-1] pointer-events-none'}`}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />

                <ScrollGroup>
                    {/* 3D Mode Content */}
                    {!is4DMode && (
                        <group>
                            <NetworkBackground count={300} color="#3b82f6" />

                            {/* Floating Shapes */}
                            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
                                <Torus args={[3, 0.2, 16, 100]} position={[-6, 3, -5]} rotation={[0.5, 0.5, 0]}>
                                    <MeshDistortMaterial color="#1e3a8a" speed={2} distort={0.3} transparent opacity={0.3} roughness={0.1} />
                                </Torus>
                            </Float>

                            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
                                <Icosahedron args={[2]} position={[7, -4, -6]} rotation={[-0.5, 0, 0]}>
                                    <MeshDistortMaterial color="#4c1d95" speed={3} distort={0.4} transparent opacity={0.3} roughness={0.1} />
                                </Icosahedron>
                            </Float>

                            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                            <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.3} color="#3b82f6" />

                            {/* Path is now inside the scroll group so it moves with the world */}
                            <ScrollPath />

                            {/* Voxel Model */}
                            <VoxelModel />

                            {/* Realistic Devices - Phone, Laptop, Emulator */}
                            <RealisticDevices />
                        </group>
                    )}

                    {/* 4D Mode Content */}
                    {is4DMode && (
                        <group>
                            <FourDimensionalMode intensity={1} />
                        </group>
                    )}
                </ScrollGroup>

            </Canvas>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: is4DMode
                        ? 'linear-gradient(to top right, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3), transparent)'
                        : 'linear-gradient(to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), transparent)',
                    transition: 'background 1s ease-in-out'
                }}
            />
        </div>
    );
};

