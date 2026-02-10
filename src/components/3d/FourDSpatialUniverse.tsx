import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Trail, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// Types
interface Moon {
    id: string;
    name: string;
    orbitRadius: number;
    orbitSpeed: number;
    size: number;
    color: string;
    description: string;
    slug?: string;
    type: 'moon';
    techStack?: string[];
    features?: string[];
    longDescription?: string;
}

interface Planet {
    id: string;
    name: string;
    position: [number, number, number];
    color: string;
    size: number;
    description: string;
    moons: Moon[];
    path?: string;
    type: 'planet';
    techStack?: string[]; // Optional for planets too
}

// Universe Data
const PORTFOLIO_UNIVERSE: Planet[] = [
    {
        id: 'work',
        name: 'Project Planet',
        position: [10, 5, -5],
        color: '#3b82f6',
        size: 2.0,
        description: "My portfolio of work and projects. Explore my latest apps and developments.",
        path: '/work',
        type: 'planet',
        moons: [
            {
                id: 'copyclip',
                name: 'CopyClip',
                orbitRadius: 4,
                orbitSpeed: 0.5,
                size: 0.5,
                color: '#60a5fa',
                description: 'Clipboard Manager App',
                longDescription: "A powerful clipboard manager that reimagines how you handle copy-paste operations. Features a history vault, smart search, and cross-device sync.",
                techStack: ['Flutter', 'Dart', 'SQLite', 'Android Native'],
                features: ['Clipboard History', 'Smart Search', 'Cloud Sync', 'Encryption'],
                slug: 'copyclip',
                type: 'moon'
            },
            {
                id: 'dornac',
                name: 'Dornac',
                orbitRadius: 5.5,
                orbitSpeed: 0.3,
                size: 0.6,
                color: '#93c5fd',
                description: 'Productivity Suite',
                longDescription: "An all-in-one productivity suite combining notes, tasks, and calendar in a unified interface. Designed for professionals who need focus.",
                techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
                features: ['Task Management', 'Markdown Notes', 'Calendar Integration'],
                slug: 'dornac',
                type: 'moon'
            },
            {
                id: 'ecommerce',
                name: 'E-Commerce',
                orbitRadius: 7,
                orbitSpeed: 0.2,
                size: 0.7,
                color: '#bfdbfe',
                description: 'Shopping Platform',
                longDescription: "A scalable e-commerce solution with real-time inventory management and AI-driven recommendations.",
                techStack: ['Next.js', 'Stripe', 'Tailwind CSS', 'Redis'],
                features: ['Real-time Cart', 'AI Recommendations', 'Stripe Payments'],
                slug: 'ecommerce',
                type: 'moon'
            }
        ]
    },
    {
        id: 'services',
        name: 'Services Sphere',
        position: [-10, -5, -8],
        color: '#8b5cf6',
        size: 1.8,
        description: "Professional services including Mobile Dev, Architecture, and DevOps.",
        path: '/services',
        type: 'planet',
        moons: [
            {
                id: 'mobile',
                name: 'Mobile Dev',
                orbitRadius: 4,
                orbitSpeed: 0.6,
                size: 0.4,
                color: '#a78bfa',
                description: 'Flutter & React Native',
                techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
                features: ['Cross-platform Apps', 'Native Modules', 'Performance Optimization'],
                type: 'moon'
            },
            {
                id: 'architecture',
                name: 'Architecture',
                orbitRadius: 5,
                orbitSpeed: 0.4,
                size: 0.5,
                color: '#c4b5fd',
                description: 'App Architecture Design',
                techStack: ['Clean Architecture', 'SOLID', 'Design Patterns'],
                type: 'moon'
            },
            {
                id: 'devops',
                name: 'DevOps',
                orbitRadius: 6,
                orbitSpeed: 0.3,
                size: 0.4,
                color: '#ddd6fe',
                description: 'CI/CD & Deployment',
                techStack: ['GitHub Actions', 'Docker', 'AWS', 'Firebase'],
                type: 'moon'
            }
        ]
    },
    {
        id: 'knowledge',
        name: 'Knowledge Nebula',
        position: [8, -8, -15],
        color: '#ec4899',
        size: 1.6,
        description: "My technical skills, work experience, and educational background.",
        path: '/about',
        type: 'planet',
        moons: [
            {
                id: 'skills',
                name: 'Skills',
                orbitRadius: 3.5,
                orbitSpeed: 0.7,
                size: 0.3,
                color: '#f472b6',
                description: 'Technical Skills',
                techStack: ['JavaScript', 'Python', 'Go', 'Rust'],
                type: 'moon'
            },
            {
                id: 'experience',
                name: 'Experience',
                orbitRadius: 4.5,
                orbitSpeed: 0.5,
                size: 0.4,
                color: '#fbcfe8',
                description: 'Work History',
                type: 'moon'
            },
            {
                id: 'education',
                name: 'Education',
                orbitRadius: 5.5,
                orbitSpeed: 0.4,
                size: 0.4,
                color: '#fce7f3',
                description: 'Academic Background',
                type: 'moon'
            }
        ]
    },
    {
        id: 'insights',
        name: 'Insight Galaxy',
        position: [-8, 8, -12],
        color: '#06b6d4',
        size: 1.5,
        description: "Read my latest blog posts, tutorials, and industry insights.",
        path: '/blog',
        type: 'planet',
        moons: [
            {
                id: 'tutorials',
                name: 'Tutorials',
                orbitRadius: 3,
                orbitSpeed: 0.6,
                size: 0.3,
                color: '#67e8f9',
                description: 'How-to Guides',
                type: 'moon'
            },
            {
                id: 'blog',
                name: 'Insights',
                orbitRadius: 4,
                orbitSpeed: 0.4,
                size: 0.4,
                color: '#a5f3fc',
                description: 'Industry Insights',
                type: 'moon'
            }
        ]
    },
    {
        id: 'contact',
        name: 'Communication Hub',
        position: [0, -15, -5],
        color: '#10b981',
        size: 1.4,
        description: "Get in touch for collaborations or inquiries.",
        path: '/contact',
        type: 'planet',
        moons: [
            {
                id: 'email',
                name: 'Email',
                orbitRadius: 3,
                orbitSpeed: 0.8,
                size: 0.3,
                color: '#34d399',
                description: 'Email Me',
                type: 'moon'
            },
            {
                id: 'linkedin',
                name: 'LinkedIn',
                orbitRadius: 4,
                orbitSpeed: 0.5,
                size: 0.4,
                color: '#6ee7b7',
                description: 'Connect on LinkedIn',
                type: 'moon'
            }
        ]
    }
];

const UniverseInfoPanel = ({
    selectedObject,
    onClose
}: {
    selectedObject: Planet | Moon | null,
    onClose: () => void
}) => {
    const navigate = useNavigate();

    if (!selectedObject) return null;

    // Helper to get detailed props
    const techStack = (selectedObject as any).techStack || [];
    const features = (selectedObject as any).features || [];
    const longDescription = (selectedObject as any).longDescription || selectedObject.description;

    return (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 1000 }}>
            <div className="absolute right-0 top-0 h-screen w-full md:w-[500px] bg-zinc-950/90 backdrop-blur-2xl border-l border-white/10 p-10 text-white transform transition-transform duration-300 pointer-events-auto flex flex-col shadow-2xl overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                </button>

                <div className="mb-4 text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedObject.color }}></span>
                    {selectedObject.type}
                </div>

                <h2 className="text-5xl font-bold mb-6 font-serif tracking-tight leading-tight" style={{ color: selectedObject.color }}>
                    {selectedObject.name}
                </h2>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mb-8"></div>

                <div className="space-y-8 flex-1">
                    <div>
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">About</h3>
                        <p className="text-lg text-zinc-300 leading-relaxed font-light">
                            {longDescription}
                        </p>
                    </div>

                    {techStack.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {features.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {features.map((feature: string) => (
                                    <li key={feature} className="flex items-start gap-2 text-zinc-300 text-sm">
                                        <span className="mt-1 text-emerald-400">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                    {(selectedObject as Planet).path && (
                        <button
                            onClick={() => navigate((selectedObject as Planet).path!)}
                            className="w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:translate-y-[-2px] shadow-lg flex items-center justify-center gap-2 group text-black"
                            style={{ backgroundColor: selectedObject.color }}
                        >
                            <span>Explore Section</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </button>
                    )}
                </div>
            </div>
        </Html>
    );
};

const PlanetMesh = ({
    planet,
    selectedId,
    onSelect
}: {
    planet: Planet,
    selectedId: string | null,
    onSelect: (item: Planet | Moon) => void
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const isSelected = selectedId === planet.id;

    return (
        <group position={new THREE.Vector3(...planet.position)}>
            {/* Planet Mesh */}
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(planet);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[planet.size, 32, 32]} />
                <meshStandardMaterial
                    color={planet.color}
                    emissive={planet.color}
                    emissiveIntensity={hovered || isSelected ? 0.6 : 0.3}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* Planet glow/atmosphere */}
            <mesh scale={[planet.size * 1.4, planet.size * 1.4, planet.size * 1.4]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={planet.color}
                    transparent
                    opacity={hovered || isSelected ? 0.15 : 0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Planet Label - Always Visible, Small */}
            <Html position={[0, planet.size + 1.2, 0]} center distanceFactor={25} style={{ pointerEvents: 'none' }}>
                <div className={`bg-black/60 backdrop-blur-sm border border-white/10 p-2 px-4 rounded-lg text-white min-w-[120px] text-center shadow-lg transition-all duration-300 ${isSelected ? 'border-white/50 bg-black/80 ring-1 ring-white/50 scale-110' : ''}`}>
                    <h3 className="text-lg font-bold" style={{ color: planet.color, textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>{planet.name}</h3>
                </div>
            </Html>

            {/* Orbiting Moons */}
            {planet.moons.map((moon, index) => (
                <MoonMesh
                    key={moon.id}
                    moon={moon}
                    planetColor={planet.color}
                    index={index}
                    total={planet.moons.length}
                    selectedId={selectedId}
                    onSelect={onSelect}
                />
            ))}

            {/* Orbital Rings for Moons (visual guide) */}
            {planet.moons.map((moon) => (
                <mesh key={`ring-${moon.id}`} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[moon.orbitRadius - 0.05, moon.orbitRadius + 0.05, 64]} />
                    <meshBasicMaterial color={planet.color} transparent opacity={0.05} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

const MoonMesh = ({
    moon,
    planetColor,
    index,
    total,
    selectedId,
    onSelect
}: {
    moon: Moon,
    planetColor: string,
    index: number,
    total: number,
    selectedId: string | null,
    onSelect: (item: Planet | Moon) => void
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const isSelected = selectedId === moon.id;

    // Static positioning around planet
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * moon.orbitRadius;
    const z = Math.sin(angle) * moon.orbitRadius;

    return (
        <group position={[x, 0, z]}>
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(moon);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[moon.size, 16, 16]} />
                <meshStandardMaterial
                    color={moon.color}
                    emissive={moon.color}
                    emissiveIntensity={hovered || isSelected ? 0.7 : 0.4}
                />

                {/* Moon Label - Always Visible, Small */}
                <Html position={[0, moon.size + 0.5, 0]} center zIndexRange={[100, 0]}>
                    <div className={`bg-black/70 p-1 px-2 rounded text-xs text-white whitespace-nowrap border border-white/10 pointer-events-none shadow-md transition-all ${isSelected ? 'border-white/50 bg-black/90 ring-1 ring-white/50 scale-110' : ''}`}>
                        <span className="font-bold" style={{ color: moon.color }}>{moon.name}</span>
                    </div>
                </Html>
            </mesh>
        </group>
    );
};

export const FourDSpatialUniverse = () => {
    const { camera } = useThree();
    const [selectedObject, setSelectedObject] = useState<Planet | Moon | null>(null);

    const handleBackgroundClick = () => {
        setSelectedObject(null);
    };

    return (
        <group onClick={handleBackgroundClick}>

            {/* Right Side Info Panel Overlay */}
            <UniverseInfoPanel selectedObject={selectedObject} onClose={() => setSelectedObject(null)} />

            {PORTFOLIO_UNIVERSE.map((planet) => (
                <PlanetMesh
                    key={planet.id}
                    planet={planet}
                    selectedId={selectedObject?.id || null}
                    onSelect={setSelectedObject}
                />
            ))}

            {/* Visual Connections between planets (Constellations) */}
            <Line
                points={PORTFOLIO_UNIVERSE.map(p => new THREE.Vector3(...p.position))}
                color="#4c1d95"
                lineWidth={1}
                transparent
                opacity={0.2}
            />
        </group>
    );
};
