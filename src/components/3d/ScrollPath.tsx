import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PathShaderMaterial = {
    uniforms: {
        uProgress: { value: 0.1 },
        uColor: { value: new THREE.Color("#60a5fa") }, // Blue-400
        uTime: { value: 0 }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uProgress;
    uniform vec3 uColor;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      // vUv.x is coordinates along the tube length (0 to 1)
      if (vUv.x > uProgress) discard;
      
      // Glow effect
      float intensity = 1.0;
      float glow = sin(vUv.x * 20.0 - uTime * 2.0) * 0.2 + 0.8;
      
      gl_FragColor = vec4(uColor * glow, 1.0);
    }
  `
};

export const ScrollPath = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    // Create a curve that goes down the screen
    // We'll define points relative to viewport height to make it responsive
    const curve = useMemo(() => {
        const startY = 2; // Slightly above center
        const pageHeight = viewport.height;
        const totalScreens = 20; // Sufficiently large number to cover any realistic scroll length

        const points = [];
        points.push(new THREE.Vector3(0, startY, 0)); // Start

        for (let i = 1; i <= totalScreens; i++) {
            const y = startY - pageHeight * i;
            let x = 0;
            let z = 0;

            // Add some gentle curves
            if (i % 2 !== 0) {
                x = -viewport.width / 12;
                z = 2;
            } else {
                x = viewport.width / 12;
                z = -2;
            }

            points.push(new THREE.Vector3(x, y, z));
        }

        return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    }, [viewport]);

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (!materialRef.current) return;

            // Total Vertical Path Length defined above is 20 * viewport.height.
            // So to draw 1 viewport height, progress needs to increase by (1 / 20).
            const totalPathScreens = 20;
            const scrollProgress = window.scrollY / (window.innerHeight * totalPathScreens);

            // Update uniform
            materialRef.current.uniforms.uProgress.value = Math.min(scrollProgress, 1.0); // Cap at 1
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        // Initial call
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh>
            <tubeGeometry args={[curve, 128, 0.15, 8, false]} />
            <shaderMaterial
                ref={materialRef}
                args={[PathShaderMaterial]}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
};
