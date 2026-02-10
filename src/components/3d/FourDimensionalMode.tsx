import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, OrbitControls } from '@react-three/drei';
import { FourDSpatialUniverse } from '@/components/3d/FourDSpatialUniverse';

// Keep the 4D particle field for atmosphere
const generate4DParticles = (count: number) => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const fourDPositions: number[][] = [];

    for (let i = 0; i < count; i++) {
        fourDPositions.push([
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 4,
        ]);

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    return { positions, colors, fourDPositions };
};

// Project 4D point to 3D
const project4Dto3D = (point4D: number[], w: number = 5): THREE.Vector3 => {
    const distance = w - point4D[3];
    const scale = w / distance;
    return new THREE.Vector3(
        point4D[0] * scale * 0.01,
        point4D[1] * scale * 0.01,
        point4D[2] * scale * 0.01
    );
};

// 4D rotation
const rotate4D = (point: number[], angleXY: number, angleZW: number, angleXW: number): number[] => {
    let [x, y, z, w] = point;

    const cosXY = Math.cos(angleXY);
    const sinXY = Math.sin(angleXY);
    let newX = x * cosXY - y * sinXY;
    let newY = x * sinXY + y * cosXY;

    const cosZW = Math.cos(angleZW);
    const sinZW = Math.sin(angleZW);
    let newZ = z * cosZW - w * sinZW;
    let newW = z * sinZW + w * cosZW;

    const cosXW = Math.cos(angleXW);
    const sinXW = Math.sin(angleXW);
    const tempX = newX * cosXW - newW * sinXW;
    newW = newX * sinXW + newW * cosXW;
    newX = tempX;

    return [newX, newY, newZ, newW];
};

export const FourDimensionalMode = ({ intensity = 1 }: { intensity?: number }) => {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => generate4DParticles(500), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Animate 4D particles for atmosphere
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            particles.fourDPositions.forEach((pos4D, i) => {
                const rotated = rotate4D(pos4D, time * 0.05, time * 0.08, time * 0.04);
                const projected = project4Dto3D(rotated, 5);

                positions[i * 3] = projected.x;
                positions[i * 3 + 1] = projected.y;
                positions[i * 3 + 2] = projected.z;
            });

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Main 4D Spatial Universe */}
            <FourDSpatialUniverse />

            {/* 4D Particle Atmosphere */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.positions.length / 3}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particles.colors.length / 3}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.4}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Dimensional Grid */}
            <gridHelper args={[200, 50, '#8b5cf6', '#4c1d95']} position={[0, -30, 0]} />

            {/* Ambient lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 20, 0]} intensity={1} color="#ffffff" distance={100} />

            {/* Camera Controls - Unrestricted */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={1.0}
                panSpeed={1.0}
                rotateSpeed={0.5}
                maxDistance={500}
                minDistance={1}
            />
        </group>
    );
};
