import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows, Environment, useTexture, PresentationControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const RealisticPhone = (props: any) => {
    return (
        <group {...props} dispose={null}>
            {/* Main Body */}
            <RoundedBox args={[2.8, 5.8, 0.3]} radius={0.15} smoothness={4} material={new THREE.MeshStandardMaterial({ color: "#1c1c1c", roughness: 0.1, metalness: 0.8 })} />

            {/* Side Frame (Stainless Steel look) */}
            <RoundedBox args={[2.85, 5.85, 0.28]} radius={0.15} smoothness={4} material={new THREE.MeshStandardMaterial({ color: "#a1a1aa", roughness: 0.2, metalness: 1 })} />

            {/* Screen (Black Glass with slight emissive for "on" look) */}
            <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[2.6, 5.6]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.05}
                    metalness={0.9}
                    emissive="#1e40af"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Home Screen Content - Real 3D UI */}
            <group position={[0, 0, 0.161]}>
                {/* Wallpaper */}
                <mesh>
                    <planeGeometry args={[2.5, 5.4]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.5} />
                </mesh>

                {/* Status Bar (Fake) */}
                <mesh position={[0, 2.5, 0.01]}>
                    <planeGeometry args={[2.3, 0.2]} />
                    <meshBasicMaterial color="black" opacity={0.2} transparent />
                </mesh>

                {/* App Icons Grid */}
                <group position={[-0.9, 1.8, 0.02]}>
                    {Array.from({ length: 4 * 6 }).map((_, i) => {
                        const x = (i % 4) * 0.6;
                        const y = -Math.floor(i / 4) * 0.7;

                        // Random vivid colors for "Apps"
                        const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
                        const color = colors[i % colors.length];

                        return (
                            <RoundedBox key={i} args={[0.45, 0.45, 0.05]} radius={0.1} smoothness={4} position={[x, y, 0]}>
                                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
                            </RoundedBox>
                        );
                    })}
                </group>

                {/* Dock Area */}
                <mesh position={[0, -2.3, 0.01]}>
                    <planeGeometry args={[2.3, 0.7]} />
                    <meshBasicMaterial color="white" opacity={0.1} transparent />
                    {/* Glassmorphism hack for dock (simple transparency) */}
                </mesh>

                {/* Dock Icons */}
                <group position={[-0.9, -2.3, 0.03]}>
                    <RoundedBox args={[0.45, 0.45, 0.05]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#22c55e" roughness={0.3} />
                    </RoundedBox>
                    <RoundedBox args={[0.45, 0.45, 0.05]} radius={0.1} smoothness={4} position={[0.6, 0, 0]}>
                        <meshStandardMaterial color="#3b82f6" roughness={0.3} />
                    </RoundedBox>
                    <RoundedBox args={[0.45, 0.45, 0.05]} radius={0.1} smoothness={4} position={[1.2, 0, 0]}>
                        <meshStandardMaterial color="#eab308" roughness={0.3} />
                    </RoundedBox>
                    <RoundedBox args={[0.45, 0.45, 0.05]} radius={0.1} smoothness={4} position={[1.8, 0, 0]}>
                        <meshStandardMaterial color="#ef4444" roughness={0.3} />
                    </RoundedBox>
                </group>
            </group>

            {/* Dynamic Island */}
            <mesh position={[0, 2.5, 0.162]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.12, 0.6, 4, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>



            {/* Camera Bump */}
            <RoundedBox args={[1, 1, 0.1]} radius={0.1} smoothness={4} position={[0.7, 2.2, -0.18]} material={new THREE.MeshStandardMaterial({ color: "#1c1c1c", roughness: 0.1, metalness: 0.8 })} />

            {/* Camera Lenses */}
            <group position={[0.7, 2.2, -0.24]}>
                <mesh position={[-0.25, -0.25, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                    <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[0.25, -0.25, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                    <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[-0.25, 0.25, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                    <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
                </mesh>
            </group>

            {/* Buttons */}
            {/* Volume Up */}
            <mesh position={[-1.43, 1.5, 0]}>
                <boxGeometry args={[0.05, 0.4, 0.1]} />
                <meshStandardMaterial color="#a1a1aa" metalness={1} roughness={0.2} />
            </mesh>
            {/* Volume Down */}
            <mesh position={[-1.43, 0.8, 0]}>
                <boxGeometry args={[0.05, 0.4, 0.1]} />
                <meshStandardMaterial color="#a1a1aa" metalness={1} roughness={0.2} />
            </mesh>
            {/* Power */}
            <mesh position={[1.43, 1.2, 0]}>
                <boxGeometry args={[0.05, 0.6, 0.1]} />
                <meshStandardMaterial color="#a1a1aa" metalness={1} roughness={0.2} />
            </mesh>
        </group>
    );
};

export const Mobile3D = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
                <pointLight position={[-5, 5, 5]} intensity={0.5} color="#8b5cf6" />

                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                >
                    <Float
                        speed={2}
                        rotationIntensity={0.5}
                        floatIntensity={1}
                        floatingRange={[-0.1, 0.1]}
                    >
                        <RealisticPhone />
                    </Float>
                </PresentationControls>

                {/* Local Environment for reflections */}
                <Environment preset="city" />
                <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={40} blur={2} far={4.5} />
            </Canvas>
        </div>
    );
};
