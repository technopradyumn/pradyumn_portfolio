import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const NetworkBackground = ({ count = 300, color = "#3b82f6" }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const linesGeometry = useRef<THREE.BufferGeometry>(null);
    const mouse = useRef(new THREE.Vector3(1000, 1000, 0)); // Start far away
    const { viewport } = useThree();

    // Global mouse tracking to bypass pointer-events-none
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Convert pixel coords to NDC (-1 to 1)
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Convert NDC to World Space roughly based on viewport
            // We assume z=0 for interaction plane
            mouse.current.set(x * (viewport.width / 2), y * (viewport.height / 2), 0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport]);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 30; // Wider spread
            const y = (Math.random() - 0.5) * 30;
            const z = (Math.random() - 0.5) * 15 - 5;
            temp.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.02),
                originalPos: new THREE.Vector3(x, y, z)
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (!mesh.current || !linesGeometry.current) return;

        // Update particles
        particles.forEach((particle, i) => {
            // Spring Force - Return to original position (Water filling back in)
            const returnForce = new THREE.Vector3().subVectors(particle.originalPos, particle.position);
            particle.velocity.add(returnForce.multiplyScalar(0.01)); // Increased stiffness for faster "refill"

            // Damping - Fluid viscosity
            particle.velocity.multiplyScalar(0.9); // Higher drag for water feel

            // Apply velocity
            particle.position.add(particle.velocity);

            // Infinite Scroll Recycling
            // Calculate world Y position relative to camera wrap
            // We need to know if the particle has moved too far UP relative to the camera view
            // Since the GROUP moves UP, the particles move UP in world space.
            // If particle.y + group.y > top_limit, move to bottom.
            // Actually, locally:
            // A particle at y=0 is at center.
            // If group moves to y=10. Particle at y=0 is at world y=10.
            // Window height ~ 15 units.
            // If local y > -groupY + offset?
            // Simpler: Just wrap local Y based on a large "box" that moves with the view?
            // No, the group moves. So local Y is constant relative to group.
            // But we want particles to stay in view.
            // If the group moves up, we want particles to "fall" down locally to stay in view?
            // OR we just spawn them infinitely?
            // To make it infinite, as we scroll down (group moves UP), particles at the top of the group go off screen.
            // We should take particles from the Top and move them to the Bottom.
            // Top of view in local space = -groupPosition.y + viewport.height/2
            // Bottom of view in local space = -groupPosition.y - viewport.height/2

            // We can't easily access group position here without ref passing.
            // BUT we can use the mouse scroll position directly since we know the logic!
            const scrollFactor = viewport.height / window.innerHeight;
            const scrollY = window.scrollY; // This might cause re-render loop if not careful? No, use window.scrollY is fine in frame.
            const groupY = scrollY * scrollFactor;

            const viewTop = -groupY + 10;
            const viewBottom = -groupY - 20; // Extra buffer at bottom

            // If particle is too far above the view, move it to the bottom
            if (particle.position.y > viewTop + 5) {
                particle.position.y = viewBottom - 5 - Math.random() * 5;
                particle.originalPos.y = particle.position.y; // Update original pos constraint
                // Reset X/Z to random to keep it fresh
                particle.position.x = (Math.random() - 0.5) * 30;
                particle.originalPos.x = particle.position.x;
            }
            // If particle is too far below (scrolling up), move to top
            if (particle.position.y < viewBottom - 10) {
                particle.position.y = viewTop + 5 + Math.random() * 5;
                particle.originalPos.y = particle.position.y;
                particle.position.x = (Math.random() - 0.5) * 30;
                particle.originalPos.x = particle.position.x;
            }

            // Repel Effect
            const dist = particle.position.distanceTo(mouse.current);
            const interactionRange = 4; // Smaller area ("small area")

            if (dist < interactionRange) {
                // Vector pointing FROM mouse TO particle (Repel)
                const dir = new THREE.Vector3().subVectors(particle.position, mouse.current).normalize();

                // Small effect ("effect also small")
                const force = (interactionRange - dist) * 0.02;

                // Apply repel force
                particle.velocity.add(dir.multiplyScalar(force));
            }

            dummy.position.copy(particle.position);
            dummy.scale.setScalar(0.08);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;

        // Connect lines
        const positions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = particles[i].position.distanceTo(particles[j].position);
                if (dist < 4) { // Connection distance
                    positions.push(
                        particles[i].position.x, particles[i].position.y, particles[i].position.z,
                        particles[j].position.x, particles[j].position.y, particles[j].position.z
                    );
                }
            }
        }
        linesGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        linesGeometry.current.computeBoundingSphere();
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} />
            </instancedMesh>
            <lineSegments>
                <bufferGeometry ref={linesGeometry} />
                <lineBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} linewidth={2} />
            </lineSegments>
        </>
    );
};
