import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';

/**
 * Interactive Virtual Device
 * This component creates a virtual Android/iOS device that can display
 * actual web content using HTML iframe
 */
export const InteractiveVirtualDevice = () => {
    const [isInteractive, setIsInteractive] = useState(false);
    const deviceRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (deviceRef.current && !isInteractive) {
            const time = state.clock.getElapsedTime();
            deviceRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        }
    });

    return (
        <group ref={deviceRef} position={[0, 0, -15]} scale={0.8}>
            {/* Device Frame */}
            <mesh castShadow>
                <boxGeometry args={[3, 6, 0.3]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Device Screen with Interactive Content */}
            <group position={[0, 0, 0.16]}>
                {/* Screen Background */}
                <mesh>
                    <planeGeometry args={[2.8, 5.7]} />
                    <meshStandardMaterial
                        color="#000000"
                        emissive="#1e40af"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* Interactive HTML Content */}
                <Html
                    transform
                    distanceFactor={1.5}
                    position={[0, 0, 0.01]}
                    style={{
                        width: '280px',
                        height: '570px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        pointerEvents: isInteractive ? 'auto' : 'none'
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        boxSizing: 'border-box',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: 'white'
                    }}>
                        {/* Status Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            marginBottom: '20px'
                        }}>
                            <span>9:41</span>
                            <span>📶 🔋</span>
                        </div>

                        {/* App Content */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            overflowY: 'auto'
                        }}>
                            <h2 style={{ margin: 0, fontSize: '24px' }}>Flutter Portfolio</h2>
                            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                                Interactive Demo App
                            </p>

                            {/* Interactive Cards */}
                            {['Projects', 'Skills', 'Contact'].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '15px',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item}</h3>
                                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                                        Tap to explore
                                    </p>
                                </div>
                            ))}

                            {/* Toggle Interactive Mode Button */}
                            <button
                                onClick={() => setIsInteractive(!isInteractive)}
                                style={{
                                    background: isInteractive ? '#10b981' : '#3b82f6',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginTop: 'auto'
                                }}
                            >
                                {isInteractive ? '🔓 Interactive Mode ON' : '🔒 Click to Enable Interaction'}
                            </button>
                        </div>

                        {/* Navigation Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            padding: '15px 0',
                            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            {['◀', '⬤', '▶'].map((icon, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>
                </Html>
            </group>

            {/* Device Details */}
            <Text
                position={[0, -3.3, 0.16]}
                fontSize={0.15}
                color="#94a3b8"
                anchorX="center"
            >
                {isInteractive ? 'Interactive Mode - Click & Scroll' : 'Virtual Device - Click to Activate'}
            </Text>

            {/* Camera */}
            <mesh position={[0, 2.8, 0.16]}>
                <circleGeometry args={[0.08, 32]} />
                <meshBasicMaterial color="#1a1a1a" />
            </mesh>

            {/* Speaker */}
            <mesh position={[0, 2.6, 0.16]}>
                <boxGeometry args={[0.4, 0.05, 0.01]} />
                <meshBasicMaterial color="#1a1a1a" />
            </mesh>

            {/* Buttons */}
            <mesh position={[-1.51, 1, 0]}>
                <boxGeometry args={[0.02, 0.3, 0.1]} />
                <meshStandardMaterial color="#666" metalness={1} />
            </mesh>
            <mesh position={[1.51, 1, 0]}>
                <boxGeometry args={[0.02, 0.5, 0.1]} />
                <meshStandardMaterial color="#666" metalness={1} />
            </mesh>
        </group>
    );
};

// Usage instructions:
// Add this component to your GlobalCanvas.tsx:
// <InteractiveVirtualDevice />
//
// Features:
// - Click the button to enable interactive mode
// - When interactive, you can click and scroll the content
// - Displays a real Flutter-style app interface
// - Fully customizable HTML/CSS content
// - Can embed iframes, videos, or any web content
