import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text } from '@react-three/drei';

export const RealisticDevices = () => {
    const phoneRef = useRef<THREE.Group>(null);
    const laptopRef = useRef<THREE.Group>(null);
    const emulatorRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Gentle floating animation for phone
        if (phoneRef.current) {
            phoneRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        }

        // Gentle rotation for laptop
        if (laptopRef.current) {
            laptopRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
        }

        // Gentle floating for emulator
        if (emulatorRef.current) {
            emulatorRef.current.position.y = 2 + Math.sin(time * 0.4) * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Modern Smartphone */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <group ref={phoneRef} position={[-8, 2, -5]} rotation={[0.1, 0.3, 0]}>
                    {/* Phone Body */}
                    <mesh castShadow>
                        <boxGeometry args={[2, 4, 0.2]} />
                        <meshStandardMaterial
                            color="#1a1a1a"
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>

                    {/* Phone Screen */}
                    <mesh position={[0, 0, 0.11]}>
                        <boxGeometry args={[1.9, 3.8, 0.01]} />
                        <meshStandardMaterial
                            color="#0a0a0a"
                            emissive="#1e40af"
                            emissiveIntensity={0.3}
                        />
                    </mesh>

                    {/* Screen Content Simulation */}
                    <mesh position={[0, 0.5, 0.12]}>
                        <planeGeometry args={[1.7, 0.3]} />
                        <meshBasicMaterial color="#3b82f6" />
                    </mesh>

                    <Text
                        position={[0, 0, 0.13]}
                        fontSize={0.15}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Flutter App
                    </Text>

                    {/* App UI Elements */}
                    {[0, -0.8, -1.6].map((y, i) => (
                        <mesh key={i} position={[0, y, 0.12]}>
                            <planeGeometry args={[1.6, 0.6]} />
                            <meshBasicMaterial color={i === 0 ? "#60a5fa" : "#1e3a8a"} opacity={0.8} transparent />
                        </mesh>
                    ))}

                    {/* Camera Notch */}
                    <mesh position={[0, 1.9, 0.11]}>
                        <boxGeometry args={[0.3, 0.1, 0.02]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                </group>
            </Float>

            {/* MacBook Laptop */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <group ref={laptopRef} position={[8, 0, -8]} rotation={[0, -0.5, 0]}>
                    {/* Laptop Base */}
                    <mesh position={[0, -0.1, 0]} castShadow>
                        <boxGeometry args={[6, 0.2, 4]} />
                        <meshStandardMaterial
                            color="#c0c0c0"
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Keyboard Area */}
                    <mesh position={[0, -0.05, 0.2]} rotation={[-0.1, 0, 0]}>
                        <planeGeometry args={[5.5, 3.5]} />
                        <meshStandardMaterial color="#2a2a2a" />
                    </mesh>

                    {/* Laptop Screen */}
                    <group position={[0, 2, -1.8]} rotation={[-0.3, 0, 0]}>
                        <mesh castShadow>
                            <boxGeometry args={[6, 4, 0.2]} />
                            <meshStandardMaterial
                                color="#1a1a1a"
                                metalness={0.9}
                                roughness={0.1}
                            />
                        </mesh>

                        {/* Screen Display */}
                        <mesh position={[0, 0, 0.11]}>
                            <planeGeometry args={[5.8, 3.8]} />
                            <meshStandardMaterial
                                color="#0f172a"
                                emissive="#1e40af"
                                emissiveIntensity={0.2}
                            />
                        </mesh>

                        {/* VS Code Interface Simulation */}
                        {/* Top Bar */}
                        <mesh position={[0, 1.8, 0.12]}>
                            <planeGeometry args={[5.7, 0.2]} />
                            <meshBasicMaterial color="#1e293b" />
                        </mesh>

                        {/* Sidebar */}
                        <mesh position={[-2.7, 0, 0.12]}>
                            <planeGeometry args={[0.4, 3.4]} />
                            <meshBasicMaterial color="#0f172a" />
                        </mesh>

                        {/* Code Editor Area */}
                        <mesh position={[0.3, 0, 0.12]}>
                            <planeGeometry args={[4.8, 3.4]} />
                            <meshBasicMaterial color="#1e293b" />
                        </mesh>

                        {/* Code Lines Simulation */}
                        {[-0.6, -0.3, 0, 0.3, 0.6].map((y, i) => (
                            <group key={i} position={[-1.5, y, 0.13]}>
                                <mesh position={[0, 0, 0]}>
                                    <planeGeometry args={[0.3, 0.08]} />
                                    <meshBasicMaterial color="#818cf8" />
                                </mesh>
                                <mesh position={[0.5, 0, 0]}>
                                    <planeGeometry args={[2, 0.08]} />
                                    <meshBasicMaterial color="#94a3b8" />
                                </mesh>
                            </group>
                        ))}

                        <Text
                            position={[0, 1.5, 0.13]}
                            fontSize={0.12}
                            color="#60a5fa"
                            anchorX="center"
                        >
                            main.dart - Flutter Project
                        </Text>

                        <Text
                            position={[-1, 0.8, 0.13]}
                            fontSize={0.1}
                            color="#22d3ee"
                            anchorX="left"
                        >
                            class MyApp extends StatelessWidget
                        </Text>

                        <Text
                            position={[-0.8, 0.5, 0.13]}
                            fontSize={0.09}
                            color="#a78bfa"
                            anchorX="left"
                        >
                            Widget build(BuildContext context)
                        </Text>
                    </group>
                </group>
            </Float>

            {/* Android/iOS Emulator */}
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
                <group ref={emulatorRef} position={[0, 2, -12]} rotation={[0, 0, 0]}>
                    {/* Emulator Frame */}
                    <mesh castShadow>
                        <boxGeometry args={[2.5, 5, 0.3]} />
                        <meshStandardMaterial
                            color="#2a2a2a"
                            metalness={0.6}
                            roughness={0.3}
                        />
                    </mesh>

                    {/* Emulator Screen */}
                    <mesh position={[0, 0, 0.16]}>
                        <boxGeometry args={[2.3, 4.7, 0.01]} />
                        <meshStandardMaterial
                            color="#000000"
                            emissive="#3b82f6"
                            emissiveIntensity={0.4}
                        />
                    </mesh>

                    {/* Status Bar */}
                    <mesh position={[0, 2.2, 0.17]}>
                        <planeGeometry args={[2.2, 0.2]} />
                        <meshBasicMaterial color="#1e293b" />
                    </mesh>

                    <Text
                        position={[-0.8, 2.2, 0.18]}
                        fontSize={0.08}
                        color="#ffffff"
                        anchorX="left"
                    >
                        9:41
                    </Text>

                    {/* App Content */}
                    <mesh position={[0, 0.5, 0.17]}>
                        <planeGeometry args={[2.1, 1]} />
                        <meshBasicMaterial color="#3b82f6" />
                    </mesh>

                    <Text
                        position={[0, 1.5, 0.18]}
                        fontSize={0.15}
                        color="#ffffff"
                        anchorX="center"
                    >
                        Live Preview
                    </Text>

                    <Text
                        position={[0, 0.5, 0.18]}
                        fontSize={0.12}
                        color="#ffffff"
                        anchorX="center"
                    >
                        Flutter App Running
                    </Text>

                    {/* App UI Cards */}
                    {[0, -1, -2].map((y, i) => (
                        <mesh key={i} position={[0, y - 0.5, 0.17]}>
                            <planeGeometry args={[2, 0.8]} />
                            <meshBasicMaterial
                                color={i === 0 ? "#60a5fa" : "#1e40af"}
                                opacity={0.9}
                                transparent
                            />
                        </mesh>
                    ))}

                    {/* Navigation Bar */}
                    <mesh position={[0, -2.2, 0.17]}>
                        <planeGeometry args={[2.2, 0.3]} />
                        <meshBasicMaterial color="#0f172a" />
                    </mesh>

                    {/* Navigation Buttons */}
                    {[-0.6, 0, 0.6].map((x, i) => (
                        <mesh key={i} position={[x, -2.2, 0.18]}>
                            <circleGeometry args={[0.08, 32]} />
                            <meshBasicMaterial color="#64748b" />
                        </mesh>
                    ))}

                    {/* Emulator Label */}
                    <Text
                        position={[0, -2.7, 0.18]}
                        fontSize={0.1}
                        color="#94a3b8"
                        anchorX="center"
                    >
                        Pixel 6 Pro - API 33
                    </Text>
                </group>
            </Float>

            {/* Ambient Lighting for devices */}
            <pointLight position={[-8, 5, 0]} intensity={2} color="#3b82f6" distance={10} />
            <pointLight position={[8, 3, -5]} intensity={2} color="#8b5cf6" distance={10} />
            <pointLight position={[0, 5, -10]} intensity={2} color="#06b6d4" distance={10} />
        </group>
    );
};
